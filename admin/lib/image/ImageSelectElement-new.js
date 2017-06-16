function ImageSelectElement(container, params) {
  EventEmitter.call(this);

  // create input for calling file dialog
  this._input = document.createElement('input');
  this._input.type = 'file';
  this._input.setAttribute('accept', 'image/*');
  this._input.style.display = 'none';
  container.appendChild(this._input);
  this._editable = params.editable;

  // atach listner for openening file dialog by click on container
  container.addEventListener('click', function() {
    this._input.click();
  }.bind(this));

  this._input.addEventListener('change', this.readImage.bind(this));

  // allow drop file to the container
  container.addEventListener('drop', this.readImage.bind(this));

  container.onclick = function() {
    if (!this._editable) {
     return false;
    }
  }.bind(this);

  container.ontouchstart = function() {
    if (!this._editable) {
     return false;
    }
  }.bind(this);

  Object.defineProperty(this, 'editable', {
    set: function(value) {
      this._editable = value;
    },
    get: function() {
      return this._editable;
    }
  });

  // prevent default behaviour like open image in browser by url file://path/to/file/on/system
  container.addEventListener('dragover', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  });
}

ImageSelectElement.prototype = Object.create(EventEmitter.prototype);
ImageSelectElement.prototype.constructor = ImageSelectElement;

ImageSelectElement.prototype.readImage = function(evt) {
  // prevent default behaviour like open image in browser by url file://path/to/file/on/system
  evt.preventDefault();
  evt.stopPropagation();
  if (this._editable) {
    var file = (evt.target.files || evt.dataTransfer.files)[0];

    var options = {
      canvas: true
    };

    loadImage.parseMetaData(file, function(data) {
      if (!data.imageHead) {
        this.emit(ImageSelectElement.ERROR, 'not image file');
        return;
      }

      // some mobile phone, f.e iphone write orientation information to meta data
      // and need rotate canvas if this data is set
      if (data.exif) options.orientation = data.exif.get('Orientation');
      loadImage(file, function (canvas) {
        // XXX: research if possible catch error, because this code run only for image files
        if (canvas.type === 'error') {
          this.emit(ImageSelectElement.ERROR, 'can not read canvas from uploaded image');
        } else {
          this.emit(ImageSelectElement.SUCCESS, canvas);
        }
      }.bind(this), options);

    }.bind(this));
  }
}

ImageSelectElement.ERROR = ImageSelectElement.prototype.ERROR = 'error';
ImageSelectElement.SUCCESS = ImageSelectElement.prototype.SUCCESS = 'success';
