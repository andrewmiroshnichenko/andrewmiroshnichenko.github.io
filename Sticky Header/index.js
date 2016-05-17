! function(name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function') define(definition);
  else this[name] = definition();
}('sticky', function() {

  return function sticky(el, top) {

    var requiredOriginalStyles = ['position', 'top', 'left', 'z-index'];
    var grayBar = document.querySelectorAll('.bar')[1];
    console.log(grayBar);

    var requiredTop = top || 0;
    var originalRect = calcRect(el);
    var styles = {
      position: 'fixed',
      top: requiredTop + 'px',
      left: originalRect.left + 'px',
      // width: originalRect.width + 'px',
      'z-index': 9999
    }
    var originalStyles = {}
    requiredOriginalStyles.forEach(function(key) {
      originalStyles[key] = el.style[key];
    });

    var onscroll, onresize, ontouchmove;
    if (window.onscroll) {
      onscroll = window.onscroll;
    }
    if (window.onresize) {
      onresize = window.onresize;
    }
    if (window.ontouchmove) {
      ontouchmove = window.ontouchmove;
    }


    window.onresize = function(e) {
        styles.left = ((window.innerWidth - originalRect.width) / 2 + getWindowScroll().left) + 'px';
        console.log(styles.left);
        onresize && onresize(e)
    }
    
    // window.onscroll = function(event) {
    //   if (getWindowScroll().top > originalRect.top - requiredTop) {
    //     for (key in styles) {
    //       el.style[key] = styles[key];
    //       // console.log(requiredTop);
    //     // console.log(styles.left);  
    //     }
    //   } else {
    //     for (key in originalStyles) {
    //       el.style[key] = originalStyles[key];
    //       // console.log(requiredTop);
    //     }
    //   }
    //   onscroll && onscroll(event)
    // }
    window.ontouchmove = function(event) {
      if (getWindowScroll().top > originalRect.top - requiredTop) {
        for (key in styles) {
          el.style[key] = styles[key];
          grayBar.innerHTML = grayBar.getBoundingClientRect().top;
          console.log(grayBar.getBoundingClientRect().top);
        // console.log(styles.left);  
        }
      } else {
        for (key in originalStyles) {
          el.style[key] = originalStyles[key];
          // console.log(requiredTop);
        }
      }
      ontouchmove && ontouchmove(event)
    }
  }


  function calcRect(el) {
    var rect = el.getBoundingClientRect();
    var windowScroll = getWindowScroll();
    return {
      left: (document.documentElement.clientWidth - rect.width) / 2 + windowScroll.left,
      top: rect.top + windowScroll.top,
      width: rect.width,
      height: rect.height
    }
  }

  function getWindowScroll() {
    return {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    }
  }

});
  // console.log(window.devicePixelRatio);