// XXX fix errors in float point
function CropElement(container, param, observer, inner) {

  this._container = container;
  this._param = param;

  this._observerTarget = observer;

  // this._container.innerHTML = '\
  //   <div class="center" data-placeholder="Click or drag file here"/></div>\
  //   <div class="left"/></div>\
  //   <div class="top"/></div>\
  //   <div class="right"/></div>\
  //   <div class="bottom"/></div>\
  //   <input id="input" type="file" accept="image/*">\
  // ';

  this._center = inner;
  // this._center = container.querySelector('.center');
  // this._left = container.querySelector('.left');
  // this._top = container.querySelector('.top');
  // this._right = container.querySelector('.right');
  // this._bottom = container.querySelector('.bottom');

  // TODO comment
  this._canvas = undefined;
  this._canvasScale = undefined;
  this._canvasShiftX = 0; // in measurement of original canvas size
  this._canvasShiftY = 0;
  this._x1 = undefined;
  this._y1 = undefined;

  this._layout();

  // Window resize listener
  //window.addEventListener('resize', this._layout.bind(this));
  // window.addEventListener('resize',
  //   function() {
  //     if (!this._canvas) return;
  //     // XXX copypaste
  //     var scaleX = this._center.clientWidth / this._canvas.width;
  //     var scaleY = this._center.clientHeight / this._canvas.height;
  //     this._canvasScale = Math.max(scaleX, scaleY);
  //     console.log(this._canvasScale);

  //     this._canvas.style.width = this._canvas.width * this._canvasScale + 'px';

  //     // XXX scale and move probably not working in the same time
  //     this._canvas.style.left = this._canvasShiftX * this._canvasScale;
  //     this._canvas.style.top = this._canvasShiftY * this._canvasScale;

  //     this._layout();
  //   }.bind(this)
  // );

  this._onMouseMove = onMouseMove.bind(this);

  function onMouseDown(evt) {
    if (evt.touches) evt = evt.touches[0];
    this._x1 = evt.clientX;
    this._y1 = evt.clientY;
    this._container.addEventListener('click', this._onLoadDialogClick);
    this._container.addEventListener('mousemove', this._onMouseMove);
    this._container.addEventListener('touchmove', this._onMouseMove);
  }

  // XXX: without this code preventdefault for scrolling while drag-n-drop doesn't work properly
  document.addEventListener('touchmove',function() {});

  function onMouseMove(evt) {
    var _evt = evt;
    if (evt.touches) evt = evt.touches[0];
    if (this._canvas && this._x1) {
      // prevent default behavior. on touch devices (safari) move scroll page
      _evt.preventDefault();
      _evt.stopPropagation();
      this._container.removeEventListener('click', this._onLoadDialogClick);
      var left = this._canvasShiftX * this._canvasScale + evt.clientX - this._x1;
      var top = this._canvasShiftY * this._canvasScale + evt.clientY - this._y1;
      if (left > 0) left = 0;
      if (top > 0) top = 0;
      if ((left + this._canvas.width * this._canvasScale) < this._center.clientWidth) {
        left = this._center.clientWidth - this._canvas.width * this._canvasScale;
      }
      if ((top + this._canvas.height * this._canvasScale) < this._center.clientHeight) {
        top = this._center.clientHeight - this._canvas.height * this._canvasScale;
      }
      this._canvas.style.left = left + 'px';
      this._canvas.style.top = top + 'px';
    }
  }

  function onMouseUp() {
    this._container.removeEventListener('mousemove', this._onMouseMove);
    this._container.removeEventListener('touchmove', this._onMouseMove);
    if (!(this._canvas && this._x1)) return;
    this._canvasShiftX = this._canvas.offsetLeft / this._canvasScale;
    this._canvasShiftY = this._canvas.offsetTop / this._canvasScale;
    this._x1 = undefined;
    this._y1 = undefined;
  }
  
  this._container.addEventListener('mousedown', onMouseDown.bind(this));
  this._container.addEventListener('touchstart', onMouseDown.bind(this));
  window.addEventListener('mouseup', onMouseUp.bind(this));
  window.addEventListener('touchend', onMouseUp.bind(this));

  // Add observer to react on DOM changes
  if (navigator.appName === 'Microsoft Internet Explorer') {
  //  IE bugfix - MutationObserver isn't defined in IE10
    if (this._observerTarget) {
      this._observerTarget.addEventListener('DOMAttrModified', function(event) {
        if (~event.newValue.indexOf('display')) {
          this._layout();
        }
      }.bind(this));
    }
  } else {
    // Observer for normal browsers
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // TODO Can we omit body observing?
        if (mutation.target === this._observerTarget) {
          this._layout();
        }
      }.bind(this));
    }.bind(this));
    var observerConfig = {attributes: true, childList: true, characterData: true, subtree: true};
    if (this._observerTarget) {
      observer.observe(this._observerTarget, observerConfig);
    }
  }

  this.get = function() {
    if (!this._canvas) return '';
    var c = document.createElement('canvas');
    c.width = this._param.width; // result size
    c.height = this._param.width / this._param.ratio; // result size
    var ctx = c.getContext('2d');
    //ctx.drawImage(this._canvas, this._canvasShiftX, this._canvasShiftY, 200, 200, 0, 0, 200, 200);
    //console.log(this._canvasShiftX);
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(this._canvas,
        -this._canvasShiftX, -this._canvasShiftY, this._center.clientWidth / this._canvasScale, this._center.clientHeight / this._canvasScale,
        0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg');
  };

  this.set = function(canvas) {
    this._canvas = canvas;
    this._layout();

    var scaleX = this._center.clientWidth / this._canvas.width;
    var scaleY = this._center.clientHeight / this._canvas.height;

    this._canvasScale = Math.max(scaleX, scaleY);

    // centering loaded canvas
    this._canvasShiftX = -(this._canvas.width - this._center.clientWidth / this._canvasScale) / 2;
    this._canvasShiftY = -(this._canvas.height - this._center.clientHeight / this._canvasScale) / 2;
    this._canvas.style.left = this._canvasShiftX * this._canvasScale + 'px';
    this._canvas.style.top = this._canvasShiftY * this._canvasScale + 'px';

    this._canvas.style.width = this._canvas.width * this._canvasScale + 'px';

    this._center.innerHTML = "";
    this._center.appendChild(this._canvas);
  }

  this.save = function(modelInstance) {
    var image = this.get();
    modelInstance.set(image);
  }
}

/**
 *
 *  +----------------------+
 *  |         top          |
 *  +---+--------------+---+
 *  |   |              |   |
 *  | l |     rect     | r |
 *  |   |              |   |
 *  +---+--------------+---+
 *  |        bottom        |
 *  +----------------------+
 *
 **/

CropElement.prototype._layout = function() {
  //console.log('width: ' + window.getComputedStyle(this._container).width);
  //console.log('width: ' + this._container.clientWidth);

  // var width = this._container.clientWidth;

  // var rect = {};
  // rect.left = this._param.left * width;
  // rect.top = this._param.top * width;
  // rect.right = width * (1 - this._param.right);
  // rect.bottom = rect.top + (rect.right - rect.left) / this._param.ratio;

  // TODO simplify
  // var height = width * (1 - this._param.left - this._param.right) / this._param.ratio + width * this._param.top + width * this._param.bottom;

  // this._container.style.height = height + 'px';

  // this._center.style.top = rect.top + 'px';
  // this._center.style.left = rect.left + 'px';
  // this._center.style.width = rect.right - rect.left + 'px';
  // this._center.style.height = rect.bottom - rect.top + 'px';

  // this._left.style.top = rect.top + 'px';
  // this._left.style.width = rect.left + 'px';
  // this._left.style.height = rect.bottom - rect.top + 'px';

  // this._top.style.width = width + 'px';
  // this._top.style.height = this._param.top * width + 'px';

  // this._right.style.top = rect.top + 'px';
  // this._right.style.left = rect.right + 'px';
  // this._right.style.width = rect.left + 'px';
  // this._right.style.height = rect.bottom - rect.top + 'px';

  // this._bottom.style.top = rect.bottom + 'px';
  // this._bottom.style.width = width + 'px';
  // this._bottom.style.height = this._param.bottom * width + 'px';
}

