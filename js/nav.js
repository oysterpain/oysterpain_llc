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
    
    if(navbar.classList.contains('viewport-bottom')){
      navbar.classList.remove('viewport-bottom');
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('At the bottom');
      navbar.classList.add('viewport-bottom');
    }
    // navbar.removeClass("viewport-bottom");
  });

})(this, this.document);
