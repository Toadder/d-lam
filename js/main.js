function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

function _removeClass(array, removedClass) {
  for (let el of array) el.classList.remove(removedClass);
}

function _addClass(array, addedClass) {
  for (let el of array) el.classList.add(addedClass);
}

function ymap() {
  let sectionMap = document.querySelector(".map");

  function ymapInit() {
    if (typeof ymaps === "undefined") return;
    let ymap = document.getElementById("ymap");

    ymaps.ready(function () {
      let map = new ymaps.Map("ymap", {
        center: [0, 0],
        zoom: 14,
        controls: ["zoomControl"],
        behaviors: ["drag"],
      });

      // Placemark
      let placemark = new ymaps.Placemark(
        [0, 0],
        {
          // Hint
          hintContent: "name",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "img/mark.png",
          iconImageSize: [20, 20],
          iconImageOffset: [0, 0],
        }
      );

      // function onResizeMap() {
      //   if (window.innerWidth < "576") {
      //     //Set New center
      //     map.setCenter([55.959609278970966, 37.79835593251573]);
      //   } else if (window.innerWidth < "942") {
      //     map.setCenter([55.96124586527455, 37.80713317203691]);
      //   } else {
      //     map.setCenter([55.960956991296946, 37.81837699222734]);
      //   }
      // }
      // onResizeMap();

      map.geoObjects.add(placemark);

      window.onresize = function () {
        onResizeMap();
      };
    });
  }

  window.addEventListener("scroll", checkYmapInit);
  checkYmapInit();

  function checkYmapInit() {
    let sectionMapTop = sectionMap.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let sectionMapOffsetTop = sectionMapTop + scrollTop;

    if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYmapInit);
    }
  }

  function ymapLoad() {
    let script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = ymapInit;
  }
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function formAddError(el) {
  el.classList.add("_error");
  el.parentElement.classList.add("_error");
}

function formRemoveError(el) {
  el.classList.remove("_error");
  el.parentElement.classList.remove("_error");
}

function emailTest(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input.value);
}

$(document).ready(function () {
  
  // Form
  (function () {
    const forms = document.querySelectorAll("form");
    for (var i = 0; i < forms.length; i++) {
      form = forms[i];

      form.addEventListener("submit", formSend);
    }

    async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      if (error === 0) {
        // ОТПРАВКА ФОРМЫ
      }
    }

    function formValidate(form) {
      let error = 0;
      let formReq = form.querySelectorAll("._req");

      for (var i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains("_email")) {
          if (!emailTest(input)) {
            formAddError(input);
            error++;
          }
        } else if (input.value == "") {
          formAddError(input);
          error++;
        }
      }
      return error;
    }
  })();

  // Header on scroll
  (function () {
    if ($(window).scrollTop() > $(".header").outerHeight()) {
      $(".header").addClass("_on-scroll");
    }
    
    $(window).scroll(function (e) {
      if($(window).scrollTop() > $('.header').outerHeight()) {
        $('.header').addClass('_on-scroll');
      } else {
        $(".header").removeClass("_on-scroll");
      }
    });
  })();

  // Sliders
  (function () {
    // Public Slider
    const publicSlider = new Swiper(".slider-public", {
      autoHeight: true,
      speed: 800,
      slidesPerView: 3.3,
      spaceBetween: 45,
      loop: true,
      simulateTouch: false,

      // Navigation
      navigation: {
        nextEl: ".public__next",
        prevEl: ".public__prev",
      },

      // Pagination
      pagination: {
        el: ".public__progress",
        type: "progressbar",
      },

      breakpoints: {
        // when window width is >= 640px
        320: {
          slidesPerView: 1.2,
          spaceBetween: 27,
        },
        450: {
          slidesPerView: 1.2,
          spaceBetween: 27,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 35,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 42,
        },
        1650: {
          slidesPerView: 3.3,
          spaceBetween: 45,
        },
      },

      // Events
      on: {
        init: function (slider) {
          let totalSlide = document.querySelector(".public__total");
          let totalCount = slider.slides.length - slider.loopedSlides * 2;
          totalSlide.innerHTML =
            totalCount < 10 ? "0" + totalCount : totalCount;
        },
      },
    });

    // Tech Slider
    const techSlider = new Swiper(".slider-tech", {
      autoHeight: true,
      speed: 800,
      loop: true,
      simulateTouch: false,
		  allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
    $(".slider-tech__btn").on('click', () => techSlider.slideNext());
    $(".slider-tech__play").on("click", () => {
      document
        .querySelectorAll(".slider-tech__video video")
        .forEach((video) => {
          video.play();
          $(".slider-tech__play").addClass("_hide");
        });
    });

    // Info slider
    const infoSlider = new Swiper(".slider-info", {
      autoHeight: true,
      speed: 800,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },

      // Navigation
      navigation: {
        nextEl: ".info__next",
        prevEl: ".info__prev",
      },

      // Pagination
      pagination: {
        el: ".info__progress",
        type: "progressbar",
      },

      // Events
      on: {
        init: function (slider) {
          let totalSlide = document.querySelector(".info__total");
          let totalCount = slider.slides.length - slider.loopedSlides * 2;
          totalSlide.innerHTML =
            totalCount < 10 ? "0" + totalCount : totalCount;
        },
      },
    });

    const stageSlider = new Swiper(".slider-stage", {
      autoHeight: true,
      speed: 800,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },

      // Pagination
      pagination: {
        el: ".slider-stage__progress",
        type: "progressbar",
      },

      // Events
      on: {
        init: function (slider) {
          let slides = document.querySelectorAll('.slider-stage__slide');
          slides.forEach(slide => {
            let index = +slide.getAttribute("data-swiper-slide-index") + 1;
            slide.querySelector('.slider-stage__number span').innerHTML = index < 10 ? '0' + index : index;
          });

          let totalCount = slider.slides.length - slider.loopedSlides * 2;
          $('.slider-stage__total').html(totalCount < 10 ? "0" + totalCount : totalCount);
        },
      },
    });
    $(".slider-stage__btn").on("click", () => stageSlider.slideNext());
      
  })();

  // Anchor scroll
  (function() {
    let anchorLinks = document.querySelectorAll("a._anchor-scroll");
    if (anchorLinks.length) {
      $("a._anchor-scroll").on("click", function (e) {
        e.preventDefault();
        let anchor = $(this).attr("href");
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(anchor).offset().top - $(".header").outerHeight(),
            },
            1000
          );
      });
    }
  })();
  
});





