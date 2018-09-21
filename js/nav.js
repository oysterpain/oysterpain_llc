(function (window, document) {
  var menu = document.getElementById('menu'),
      WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

  function toggleHorizontal() {
      [].forEach.call(
          document.getElementById('menu').querySelectorAll('.custom-can-transform'),
          function(el){
              el.classList.toggle('pure-menu-horizontal');
          }
      );
  };

  function toggleMenu() {
      // set timeout so that the panel has a chance to roll up
      // before the menu switches states
      if (menu.classList.contains('open')) {
          setTimeout(toggleHorizontal, 500);
      }
      else {
          toggleHorizontal();
      }
      menu.classList.toggle('open');
      document.getElementById('toggle').classList.toggle('x');
  };

  function closeMenu() {
      if (menu.classList.contains('open')) {
          toggleMenu();
      }
  }

  document.getElementById('toggle').addEventListener('click', function (e) {
      toggleMenu();
      e.preventDefault();
  });

  window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

  window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    console.log("scrolling");
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    console.log('offset = ' + offset);
    console.log('height = ' + height);
    if(navbar.classList.contains('viewport-bottom')){
      navbar.classList.remove('viewport-bottom');
    }

    if (offset === Math.ceil((height*1.1))) {
      console.log('At the bottom');
      navbar.classList.add('viewport-bottom');
    }
    // navbar.removeClass("viewport-bottom");
  });

})(this, this.document);
