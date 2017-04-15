var sidebar = document.querySelector('aside');
var toBottom = false;
var toTop = false;
var scrolled = null;
var position;
var topElementHeight = document.querySelector('.empty').getBoundingClientRect().height;
var firstTimeScroll = true;

function scrollHandler() {
  /*Check for initial scroll(can appear if we scroll page to some point and then reload it)*/
  if (firstTimeScroll) {
    /*Here we make sidebar sticky to bottom if page is loaded with initial scroll*/
    if (sidebar.getBoundingClientRect().bottom <= window.innerHeight) {
      sidebar.className = 'fixed-bottom';
      sidebar.style.top = '';
    }
    firstTimeScroll = false;
    return;
  }
  checkDirection();
  /*Case when viewport top is above the highest sidebar position*/
  if (window.pageYOffset < topElementHeight) {
    sidebar.className = 'absolute';
    sidebar.style.top = 'initial';
    position = 0;
  /*Case when sidebar's top cross top edge of the viewport*/
  } else if (sidebar.getBoundingClientRect().top < 0 && sidebar.getBoundingClientRect().bottom > window.innerHeight) {
    sidebar.className = 'absolute';
    sidebar.style.top = position > 0 ? position + 'px' : 0;
  /*Case when top of the viewport reached top edge of sidebar and user continuing to scroll to top*/
  } else if (sidebar.getBoundingClientRect().top >= 0 && toTop) {
    position = -document.querySelector('.wrapper').getBoundingClientRect().top;
    sidebar.className = 'fixed-top';
    sidebar.style.top = '';
  /*Case when bottom of the viewport reached bottom edge of sidebar and user continuing to scroll to bottom*/
  } else if (sidebar.getBoundingClientRect().bottom <= window.innerHeight && toBottom) {
    position = -document.querySelector('.wrapper').getBoundingClientRect().top + sidebar.getBoundingClientRect().top;
    sidebar.className = 'fixed-bottom';
    sidebar.style.top = '';
  /*Case when user scrolls page with the sidebar (sidebar is not sticky glued to top or bottom edges of viewport)*/
  } else if ((sidebar.getBoundingClientRect().top >= 0 && toBottom) || (sidebar.getBoundingClientRect().bottom <= window.innerHeight && toTop)) {
    sidebar.className = 'absolute';
    sidebar.style.top = position + 'px';
  }
}
/*Helper for checking scrolling direction*/
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
