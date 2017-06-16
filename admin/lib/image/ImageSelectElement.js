function ImageSelectElement(params) {
  EventEmitter.call(this);

  // create input for calling file dialog
  this._container = params.container;
  this._input = document.createElement('input');
  this._input.type = 'file';
  this._input.setAttribute('accept', 'image/*');
  this._input.style.display = 'none';
  this._container.appendChild(this._input);
  this._editable = params.editable;
  this.cropElement = params.cropElement;
  // this.loadingPopup = params.loadingPopup;

  // this.popup = document.createElement('div');
  // this.popup.classList.add('image-loading-popup');

  // this.popupImage = document.createElement('div');
  // this.popupImage.classList.add('image-loading-popup__image');

  // this.popupImage.onclick = function () {
  //   this.popup.style.display = 'none';
  // }.bind(this);

  // this.popupText = document.createElement('p');
  // this.popupText.classList.add('image-loading-popup__text');
  // this.popupText.textContent = 'Loading your image...';

  // this.popup.appendChild(this.popupImage);
  // this.popup.appendChild(this.popupText);
  // document.body.appendChild(this.popup);

  if (params.supportedTypes instanceof Array) {
    this._supportedTypes = params.supportedTypes;
  } else {
    this._supportedTypes = ['*']; // any that can be read to canvas
  }

  // atach listner for openening file dialog by click on container
  this._container.addEventListener('click', function() {
    // this.popup.style.display = 'block';

    if (this._editable) {
      this._input.click();
      this._input.value = null;
    }
  }.bind(this));

  this._input.addEventListener('change', this.readImage.bind(this));

  // allow drop file to the container
  this._container.addEventListener('drop', this.readImage.bind(this));

  Object.defineProperty(this, 'editable', {
    set: function(value) {
      this._editable = value;
    },
    get: function() {
      return this._editable;
    }
  });

  // prevent default behaviour like open image in browser by url file://path/to/file/on/system
  this._container.addEventListener('dragover', function(evt) {
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
  // this.popup.style.display = 'block';
  if (this._editable) {
    var file = (evt.target.files || evt.dataTransfer.files)[0];

    // check that image select element support this file type
    var isSupport = false;
    for (var i = 0; i < this._supportedTypes.length; i++) {
      if (file && this._supportedTypes[i] === file.type || this._supportedTypes[i] === '*') {
        isSupport = true;        
        break;
      }
    }
    if (!isSupport) {
      this.emit(ImageSelectElement.ERROR, file.type + ' is not supported type');
      alert(file.type + ' is not supported type');
      return;
    }

    var options = {
      canvas: true,
      /**
       * https://discussions.apple.com/thread/4975106?tstart=0
       * under section "Know iOS Resource Limits":
       * The maximum size for a canvas element is 3 megapixels for devices with less than 256 MB RAM and 5 megapixels for devices with greater or equal than 256 MB RAM 
       */
      maxWidth: 1024,
      maxHeight: 1024
    };

    loadImage.parseMetaData(file, function(data) {
      // some mobile phone, f.e iphone write orientation information to meta data
      // and need rotate canvas if this data is set
      if (data.exif) options.orientation = data.exif.get('Orientation');
      loadImage(file, function (canvas) {
        // XXX: research if possible catch error, because this code run only for image files
        if (canvas.type === 'error') {
          this.emit(ImageSelectElement.ERROR, 'Error loading image');
          alert('Error loading image. Code ' + canvas.target.error.code);
        } else {
          var newCanvas = document.createElement('canvas');
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.height;
          var ctx = newCanvas.getContext("2d");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvas, 0, 0);
          // this.popup.style.display = 'none';
          this.emit(ImageSelectElement.SUCCESS, newCanvas);
          if (this.cropElement) {
            this.cropElement.set(canvas);
          }
        }
      }.bind(this), options);
    }.bind(this));
  }

};

ImageSelectElement.ERROR = ImageSelectElement.prototype.ERROR = 'error';
ImageSelectElement.SUCCESS = ImageSelectElement.prototype.SUCCESS = 'success';
