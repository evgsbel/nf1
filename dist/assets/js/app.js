"use strict";

var studiesCards = {
  init: function init() {
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
  bindEvents: function bindEvents() {
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
  toggleOverlay: function toggleOverlay($el, e, toggle) {
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
      gsap.set($overlay.get(0), {
        clipPath: 'circle(0% at ' + x + 'px ' + y + 'px)'
      });
      gsap.to($overlay.get(0), 0.5, {
        clipPath: 'circle(150% at ' + x + 'px ' + y + 'px)'
      });
    } else {
      $el.removeClass('overlay-active');
      gsap.to($overlay.get(0), {
        clipPath: 'circle(0% at ' + x + 'px ' + y + 'px)'
      });
    }
  }
};
$(document).ready(function () {
  studiesCards.init();
});

(function ($) {
  $(window).on("load", function () {
    $("a[href*='#']").mPageScroll2id({
      offset: 120,
      highlightClass: "active",
      forceSingleHighlight: true,
      onStart: function onStart() {
        var openBtn = document.querySelector('.question__open');
        var cardList = document.querySelector('.question__list');
        cardList.style.maxHeight = 0;
        openBtn.classList.remove('is-active');
        cardList.classList.remove('is-active');
      }
    });
  });
})(jQuery); //video autoplay


$(function () {
  $('.js-play-video').click(function (ev) {
    $(this).addClass('is-playing');
    $('.video__play').fadeOut(100);
    $('.video__frame').fadeIn(100);
    $(".video__frame")[0].src += "?autoplay=1";
  });
}); // mobile menu

$(function () {
  var btnMenu = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-nav');
  var body = document.querySelector('body'); // let heroHeight = document.querySelector('.hero').clientHeight
  // let headerHeight = document.querySelector('.header').clientHeight

  var toggleMenu = function toggleMenu() {
    menu.classList.add('is-open'); // menu.style.height = heroHeight + headerHeight + 'px'

    btnMenu.classList.add('is-active');
    body.classList.add('opened-menu');
  };

  btnMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });
  var closeBtn = document.querySelector('.close');

  var closeMenu = function closeMenu() {
    menu.classList.remove('is-open');
    body.classList.remove('opened-menu');
    btnMenu.classList.remove('is-active');
  };

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeMenu();
  });
}); // open cards

$(function () {
  var openBtn = document.querySelector('.question__open');
  var cardList = document.querySelector('.question__list');
  openBtn.addEventListener('click', function () {
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