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
      offset: 20,
      highlightClass: "active",
      forceSingleHighlight: true
    });
  });
})(jQuery);