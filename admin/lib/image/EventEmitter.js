/**
 * The class for managing custom events
 * @property {listenrs} - a map with attached callback for events,
 *                        where key is event type, valueis array of callback functions
 */
function EventEmitter() {
  this._listeners = [];  
}

var shouldBlockEvents = false;

EventEmitter.prototype.addEventListener = function(type, listener, owner) {
  if (arguments.length !== 2 && arguments.length !== 3)
    throw new RangeError('two parameters should be passed to the function');
  if (typeof type !== 'string') throw new TypeError('type should be String');
  if (typeof listener !== 'function') throw new TypeError('listener should be Function');
  if (owner === undefined) owner = null;

  var owner_index = -1;
  for (var i = 0; i < this._listeners.length; ++i) {
    if (this._listeners[i].owner == owner) {
      owner_index = i;
      break;
    }
  }

  if (owner_index == -1) {
    this._listeners.push({owner: owner, listeners: {}});
    owner_index = this._listeners.length - 1;
  }

  if (!this._listeners[owner_index].listeners[type])
    this._listeners[owner_index].listeners[type] = [];

  this._listeners[owner_index].listeners[type].push(listener);
}

EventEmitter.prototype.removeEventListener = function(type, listener, owner) {
  if (arguments.length !== 2 && arguments.length !== 3)
    throw new RangeError('two parameters should be passed to the function');
  if (typeof type !== 'string') throw new TypeError('type should be String');
  if (typeof listener !== 'function') throw new TypeError('listener should be Function');
  if (owner === undefined) owner = null;

  var owner_index = -1;
  for (var i = 0; i < this._listeners.length; ++i) {
    if (this._listeners[i].owner == owner) {
      for (var j = 0; this._listeners[i].listeners[type] && j < this._listeners[i].listeners[type].length; ++j) {
        if (this._listeners[i].listeners[type][j] == listener) {
          this._listeners[i].listeners[type].splice(j, 1);
          --j;
        }
      }
      break;
    }
  }
}

EventEmitter.prototype.removeAllEventListeners = function(owner) {
  if (owner === undefined)
    this._listeners = [];
  else {
    for (var i = 0; i < this._listeners.length; ++i) {
      if (this._listeners[i].owner == owner) {
        this._listeners[i].listeners = {};
        break;
      }
    }
  }
}

EventEmitter.prototype.emit = function(type) {
  if (typeof type !== 'string') throw new TypeError('type should be String');

  if (shouldBlockEvents) return;

  for (var i = 0; i < this._listeners.length; ++i) {
    var listeners = this._listeners[i].listeners[type];
    if (!listeners) continue;
    for (var j = 0; j < listeners.length; j++) {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 1);
      listeners[j].apply(this, args);
    }
  }
}

EventEmitter.prototype.blockEvents = function () {
  shouldBlockEvents = true;
}

EventEmitter.prototype.unblockEvents = function () {
  shouldBlockEvents = false;
}

/* istanbul ignore if  */
if (typeof exports !== 'undefined') {
  module.exports = EventEmitter;
}
