
window.addEventListener('load', () => {

  function getScrollbarWidth() {
      var outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.width = '50px';
      document.body.appendChild(outer);

      var widthNoScroll = outer.offsetWidth;

      // Force scrollbars
      outer.style.overflow = 'scroll';

      // Add innerdiv
      var inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      var widthWithScroll = inner.offsetWidth;

      // Remove divs
      outer.remove();

      return widthNoScroll - widthWithScroll;
  }

  function setScrollbarVar(value) {
      document.body.style.setProperty('--scrollbarWidth', value);
  }

  function addScrollObserver() {

      var config = {
        threshold: 1.0
      }

      var handleIntersect = (entries, observer) => {
          entries.forEach(entry => {
              if (entry.intersectionRatio < 1) {
                  setScrollbarVar(getScrollbarWidth() + 'px');
              } else {
                  setScrollbarVar('0px');
              }
          });
      }

      var bodyScrollObserver = new IntersectionObserver(handleIntersect, config);

      bodyScrollObserver.observe(document.body);
  }

  addScrollObserver();

});
