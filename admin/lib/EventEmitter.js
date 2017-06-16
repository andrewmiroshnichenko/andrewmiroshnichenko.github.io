/**
 * The class for managing custom events
 * @property {listenrs} - a map with attached callback for events,
 *                        where key is event type, valueis array of callback functions
 */
function EventEmitter() {
  this._listeners = {};  
}

EventEmitter.prototype._indexOfListener = function(type, listener) {
  if (!this._listeners[type]) return -1;
  
  var i = this._listeners[type].length;
  while (i--) {
    if (this._listeners[type][i] === listener) return i;
  }

  return -1;
} 

EventEmitter.prototype.addEventListener = function(type, listener) {
  if (!this._listeners[type]) this._listeners[type] = [];

  if (!~this._indexOfListener(type, listener)) {
    this._listeners[type].push(listener);
  }
}

EventEmitter.prototype.removeEventListener = function(type, listener) {
  var i = this._indexOfListener(type, listener);
  if (!!~i) {
    this._listeners[type].splice(i, 1); 
  }
}

EventEmitter.prototype.emit = function(type) {
  if (!this._listeners[type]) return;

  for (var i = 0; i < this._listeners[type].length; i++) {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 1);
    this._listeners[type][i].apply(this, args);
  }
}
