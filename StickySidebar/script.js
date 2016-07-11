var sidebar = document.querySelector('aside');
var toBottom = false;
var toTop = false;
var scrolled = null;
var position;
var topElementHeight = document.querySelector('.empty').getBoundingClientRect().height;

function checkBottom() {
  if ((window.pageYOffset >= sidebar.getBoundingClientRect().bottom + window.pageYOffset - document.documentElement.clientHeight) && toBottom) {
    sidebar.classList.remove('absolute');
    sidebar.classList.add('fixed-bottom');
    position = window.pageYOffset + document.documentElement.clientHeight - sidebar.getBoundingClientRect().height - topElementHeight + 'px';
    sidebar.style.top = 'initial';
  // } else if ( toBottom) {
  //   sidebar.classList.remove('fixed-top');
  //   sidebar.classList.add('absolute');
  //   sidebar.style.top = position;
  }
}
// console.log(topElementHeight);
// console.log(window.pageYOffset);

function checkTop() {
    // console.log(window.pageYOffset);
    console.log(sidebar.getBoundingClientRect().top);
    console.log(toTop);
// console.log(sidebar.getBoundingClientRect().height);
  if ((sidebar.getBoundingClientRect().top >= 0) && toTop && (window.pageYOffset > topElementHeight)) {
    sidebar.classList.remove('absolute');
    sidebar.classList.add('fixed-top');
    sidebar.style.top = 0;
    position = window.pageYOffset + document.documentElement.clientHeight - sidebar.getBoundingClientRect().height - topElementHeight + 'px';
  } else if ((window.pageYOffset < topElementHeight) && toTop) {
    sidebar.classList.remove('fixed-top');
    sidebar.classList.add('absolute');
    sidebar.style.top = 0;
    console.log(position);
  } else if ((sidebar.getBoundingClientRect().bottom + window.pageYOffset > window.pageYOffset) && toTop) {
    sidebar.classList.remove('fixed-bottom');
    sidebar.classList.add('absolute');
    sidebar.style.top = position;
    console.log(position);
  } 
}

function checkDirection() {
  if (scrolled < window.pageYOffset) {
    scrolled = window.pageYOffset;
    toBottom = true;
    toTop = false;
    // console.log(toBottom, toTop);
  } else if (scrolled > window.pageYOffset) {
    scrolled = window.pageYOffset;
    toBottom = false;
    toTop = true;
    // console.log(toBottom, toTop);
  }
}

window.addEventListener('scroll', checkDirection);
window.addEventListener('scroll', checkBottom);
window.addEventListener('scroll', checkTop);