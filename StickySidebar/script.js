var sidebar = document.querySelector('aside');
var toBottom = false;
var toTop = false;
var scrolled = null;
var position;
var topElementHeight = document.querySelector('.empty').getBoundingClientRect().height;
var firstTimeScroll = true;

function scrollHandler() {
  if (firstTimeScroll) {
    if (sidebar.getBoundingClientRect().bottom <= window.innerHeight) {
      sidebar.className = 'fixed-bottom';
      sidebar.style.top = '';
    }
    firstTimeScroll = false;
    return;
  }
  checkDirection();
  if (window.pageYOffset < topElementHeight) {
    sidebar.className = 'absolute';
    sidebar.style.top = 'initial';
    position = 0;
  } else if (sidebar.getBoundingClientRect().top < 0 && sidebar.getBoundingClientRect().bottom > window.innerHeight) {
    sidebar.className = 'absolute';
    sidebar.style.top = position > 0 ? position + 'px' : 0;
  } else if (sidebar.getBoundingClientRect().top >= 0 && toTop) {
    position = -document.querySelector('.wrapper').getBoundingClientRect().top;
    sidebar.className = 'fixed-top';
    sidebar.style.top = '';
  } else if (sidebar.getBoundingClientRect().bottom <= window.innerHeight && toBottom) {
    position = -document.querySelector('.wrapper').getBoundingClientRect().top + sidebar.getBoundingClientRect().top;
    sidebar.className = 'fixed-bottom';
    sidebar.style.top = '';
  } else if ((sidebar.getBoundingClientRect().top >= 0 && toBottom) || (sidebar.getBoundingClientRect().bottom <= window.innerHeight && toTop)) {
    sidebar.className = 'absolute';
    sidebar.style.top = position + 'px';
  }
}
function checkDirection() {
  if (scrolled < window.pageYOffset) {
    scrolled = window.pageYOffset;
    toBottom = true;
    toTop = false;
  } else if (scrolled > window.pageYOffset) {
    scrolled = window.pageYOffset;
    toBottom = false;
    toTop = true;
  }
}
// checkDirection();
// scrollHandler();

window.onload = function() {
  window.addEventListener('scroll', scrollHandler);
};
