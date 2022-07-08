

var studiesCards = {
  init: function () {
    var self = this;

    self.studyCardsInner = '.js-symptoms-card';

    if (window.innerWidth > 640) {
      self.bindEvents();
    }

    $(document.body).on('ajax_page_loaded ajax_switch_page_loaded', function () {
      if (window.innerWidth > 640) {
        self.bindEvents();
      }
    });

  },

  bindEvents: function () {
    var self = this;

    if (document.querySelectorAll(self.studyCardsInner)) {
      document.querySelectorAll(self.studyCardsInner).forEach(function (studyCard) {
        var moved = false;

        studyCard.addEventListener('mouseenter', function (e) {
          self.toggleOverlay($(this), e, true);
        });

        studyCard.addEventListener('mouseleave', function (e) {
          self.toggleOverlay($(this), e, false);
        });

        studyCard.addEventListener('touchend', function (e) {
          if (!moved) {
            if ($(this).hasClass('overlay-active')) {
              self.toggleOverlay($(this), e, false);
            } else {
              self.toggleOverlay($(this), e, true);
            }
          }
        });

        studyCard.addEventListener('touchstart', function () {
          moved = false;
        });

        studyCard.addEventListener('touchmove', function () {
          moved = true;
        });
      });
    }

  },

  toggleOverlay: function ($el, e, toggle) {
    var offset = $el.offset();
    var $overlay = $el.find('.js-symptoms-hide');
    var x, y;

    if (e.type === 'touchend') {
      x = Math.floor(e.changedTouches[0].pageX - offset.left);
      y = Math.floor(e.changedTouches[0].pageY - offset.top);
    } else {
      x = Math.floor(e.pageX - offset.left);
      y = Math.floor(e.pageY - offset.top);
    }

    if (toggle) {
      $el.addClass('overlay-active');
      gsap.set($overlay.get(0), {clipPath: 'circle(0% at ' + x + 'px ' + y + 'px)'});
      gsap.to($overlay.get(0), 0.5, {clipPath: 'circle(150% at ' + x + 'px ' + y + 'px)'});
    } else {
      $el.removeClass('overlay-active');
      gsap.to($overlay.get(0), {clipPath: 'circle(0% at ' + x + 'px ' + y + 'px)'})
    }

  }

};


$(document).ready(function () {
  studiesCards.init();
});

(function($){
  $(window).on("load",function(){
    $("a[href*='#']").mPageScroll2id({
      offset: 120,
      highlightClass:"active",
      forceSingleHighlight:true,
    });
  });
})(jQuery);



//video autoplay
$(() => {
  $('.js-play-video').click(function (ev) {
    $(this).addClass('is-playing')
    $('.video__play').fadeOut(100);
    $('.video__frame').fadeIn(100);
    $(".video__frame")[0].src += "?autoplay=1";
  })
})


// mobile menu
$(() => {
  const btnMenu = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-nav');
  const body = document.querySelector('body');
  // let heroHeight = document.querySelector('.hero').clientHeight
  // let headerHeight = document.querySelector('.header').clientHeight

  const toggleMenu = function () {
    menu.classList.add('is-open');
    // menu.style.height = heroHeight + headerHeight + 'px'
    btnMenu.classList.add('is-active');
    body.classList.add('opened-menu');
  };

  btnMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  const closeBtn = document.querySelector('.close');
  const closeMenu = function () {
    menu.classList.remove('is-open');
    body.classList.remove('opened-menu');
    btnMenu.classList.remove('is-active');
  };

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeMenu();
  });
});

// open cards



$(() => {
  const openBtn = document.querySelector('.question__open');
  const cardList = document.querySelector('.question__list');
  const toggleCards = function () {
    cardList.classList.toggle('is-open');
    // menu.style.height = heroHeight + headerHeight + 'px'
    openBtn.classList.toggle('is-active');
  };

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleCards();

  });
})
