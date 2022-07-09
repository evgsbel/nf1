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

(function ($) {
  $(window).on("load", function () {
    $("a[rel='m_PageScroll2id']").mPageScroll2id({
      offset: 120,
      highlightClass: "active",
      forceSingleHighlight: true,
      onStart: function () {
        const openBtn = document.querySelector('.question__open');
        const cardList = document.querySelector('.question__list');
        cardList.style.maxHeight = 0;
        openBtn.classList.remove('is-active');
        cardList.classList.remove('is-active');
      }
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

  openBtn.addEventListener('click', () => {
    if (cardList.classList.contains('is-active')) {
      cardList.classList.remove('is-active');
      openBtn.classList.remove('is-active');
      cardList.style.maxHeight = 0;
    } else {
      openBtn.classList.add('is-active');
      cardList.classList.add('is-active');
      cardList.style.maxHeight = cardList.scrollHeight + 20 + 'px';
    }
  });
});

// ANIMATION


//Scroll to main sections
$(() => {
  document.querySelectorAll(".header__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      gsap.to(window, {
        duration: 2,
        scrollTo: {y: "#" + btn.getAttribute('rel'), offsetY: 70},
        ease: Expo.easeOut
      });
    });
  });
});


//Text animations

$(() => {
  [...document.querySelectorAll('.work_item')].forEach(function(item) {


  let staggers = item.querySelectorAll('.stagger_body');

  let tl02 = gsap.timeline({
    paused: true,
  });
  tl02.staggerFromTo(staggers, 1.0, {
    y: '200%',
    opacity: 0,
  }, {
    y: '0%',
    opacity: 1,
    ease: Power1.easeOut
  }, .5);
  ScrollTrigger.create({
    trigger: item,
    start: "center bottom",
    onEnter: () => tl02.play()
  });

  ScrollTrigger.create({
    trigger: item,
    start: "top bottom",
    onLeaveBack: () => tl02.pause(0)
  });
})
})


$(() => {
  let tl03 = gsap.timeline({
    paused: true,
  });
  tl03.staggerFromTo('.right-btns', 1.0, {
    x: '-50',
    opacity: 0,
    autoAlpha: 0,
  }, {
    x: '0%',
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, 4);
  ScrollTrigger.create({
    trigger: '.description',
    start: "center bottom",
    onEnter: () => tl03.play()
  });

  ScrollTrigger.create({
    trigger: '.description',
    start: "top bottom",
    onLeaveBack: () => tl03.pause(0)
  });

  let tl05 = gsap.timeline({
    paused: true,
  });
  tl05.staggerFromTo('.what__tlg', 1.0, {
    x: '-50',
    opacity: 0,
    autoAlpha: 0,
  }, {
    x: '0%',
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, 4);
  ScrollTrigger.create({
    trigger: '.what__contacts',
    start: "center bottom",
    onEnter: () => tl05.play()
  });

  ScrollTrigger.create({
    trigger: '.what__contacts',
    start: "top bottom",
    onLeaveBack: () => tl05.pause(0)
  });

  let tl04 = gsap.timeline({
    paused: true,
  });
  tl04.staggerFromTo('.what__nf', 1.0, {
    x: '-100%',
    opacity: 0,
    autoAlpha: 0,
  }, {
    x: '0%',
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, 4);
  ScrollTrigger.create({
    trigger: '.what__contacts',
    start: "center bottom",
    onEnter: () => tl04.play()
  });

  ScrollTrigger.create({
    trigger: '.what__contacts',
    start: "top bottom",
    onLeaveBack: () => tl04.pause(0)
  });

  let tl06 = gsap.timeline({
    paused: true,
  });
  tl06.staggerFromTo('.how__item', 1.0, {
    y: '-50',
    opacity: 0,
    autoAlpha: 0,
  }, {
    y: 0,
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, .8);
  ScrollTrigger.create({
    trigger: '.how',
    start: "center bottom",
    onEnter: () => tl06.play()
  });

  ScrollTrigger.create({
    trigger: '.how',
    start: "top bottom",
    onLeaveBack: () => tl06.pause(0)
  });

  let tl07 = gsap.timeline({
    paused: true,
  });
  tl07.staggerFromTo('.symptoms__item', 1.0, {
    y: '-50',
    opacity: 0,
    autoAlpha: 0,
  }, {
    y: 0,
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, .3);
  ScrollTrigger.create({
    trigger: '.time',
    start: "center bottom",
    onEnter: () => tl07.play()
  });

  ScrollTrigger.create({
    trigger: '.time',
    start: "top bottom",
    onLeaveBack: () => tl07.pause(0)
  });

})

$(() => {


let tl08 = gsap.timeline({
  paused: true,
});
tl08.staggerFromTo('.time__item', 1.0, {
  x: '-50',
  opacity: 0,
  autoAlpha: 0,
}, {
  x: 0,
  opacity: 1,
  autoAlpha: 1,
  ease: Power1.easeOut
}, .3);
  tl08.staggerFromTo('.time__descr_top', 1.0, {
    y: -50,
    opacity: 0,
    autoAlpha: 0,
  }, {
    y: 0,
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, .3);
  tl08.staggerFromTo('.time__descr_bottom', 1.0, {
    y: '50',
    opacity: 0,
    autoAlpha: 0,
  }, {
    y: 0,
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, .3);
  tl08.staggerFromTo('.time__descr p', 1.0, {
    x: '10',
    opacity: 0,
    autoAlpha: 0,
  }, {
    x: 0,
    opacity: 1,
    autoAlpha: 1,
    ease: Power1.easeOut
  }, .3);
ScrollTrigger.create({
  trigger: '.time',
  start: "center bottom",
  onEnter: () => tl08.play()
});

ScrollTrigger.create({
  trigger: '.time',
  start: "top bottom",
  onLeaveBack: () => tl08.pause(0)
});

})
