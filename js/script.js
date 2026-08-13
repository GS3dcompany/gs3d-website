// Simple scroll listener

// window.addEventListener('scroll', function () {

//     const header = document.getElementById('header');

//     const scrollPosition = window.scrollY;

//     if (scrollPosition > 50) {

//         header.classList.add('glass-effect');

//     } else {

//         header.classList.remove('glass-effect');

//     }

// });

// Simple scroll listener

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");

  const scrollPosition = window.scrollY;

  // Get both logos

  const mainLogo = document.querySelector(".desk_logo");

  const toggleLogo = document.querySelector(".toggle_logo");

  if (scrollPosition > 50) {
    header.classList.add("glass-effect");

    // Show toggle logo, hide main logo

    if (mainLogo) mainLogo.style.display = "none";

    if (toggleLogo) toggleLogo.style.display = "block";
  } else {
    header.classList.remove("glass-effect");

    // Show main logo, hide toggle logo

    if (mainLogo) mainLogo.style.display = "block";

    if (toggleLogo) toggleLogo.style.display = "none";
  }
});

// counter

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const startCounter = (counter) => {
    const number = parseInt(
      counter.getAttribute("data-count").replace(/,/g, ""),
      10,
    );
    const suffix = counter.getAttribute("data-suffix") || "";
    let count = 0;

    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      count = Math.floor(progress * number);
      counter.textContent = count.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = number.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target); // ✅ stop watching once animated
        }
        // ✅ no else branch — never reset to "0"
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
});

// counter

// hero slider

const $hero = $(".hero_slider_for");

const $navItems = $(".hero_slider_nav .nav-item");

const total = $navItems.length;

let current = 0;

// Helper: show only the current nav item

function renderNav() {
  $navItems
    .removeClass("active")
    .hide()

    .eq(current)
    .addClass("active")
    .show();
}

// Get transform-origin from nav-item position

function setTransformOrigin($slide, $nav) {
  const navRect = $nav[0].getBoundingClientRect();

  const heroRect = $hero[0].getBoundingClientRect();

  const originX =
    ((navRect.left + navRect.width / 2 - heroRect.left) / heroRect.width) * 100;

  const originY =
    ((navRect.top + navRect.height / 2 - heroRect.top) / heroRect.height) * 100;

  $slide.css("transform-origin", `${originX}% ${originY}%`);
}

// Init hero slider

$hero.slick({
  slidesToShow: 1,

  slidesToScroll: 1,

  arrows: false,

  swipe: false, // Disables touch swiping

  draggable: false,

  dots: false,

  fade: true,

  adaptiveHeight: false,

  // speed: 600,

  // autoplay: true,

  pauseOnHover: true,

  cssEase: "ease-in-out",

  responsive: [
    {
      breakpoint: 768,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,

        infinite: true,

        dots: true,

        swipe: true,

        speed: 1000,

        autoplay: true,

        pauseOnHover: true,
      },
    },

    {
      breakpoint: 480,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,

        infinite: true,

        dots: true,

        swipe: true,

        speed: 1000,

        autoplay: true,

        pauseOnHover: true,
      },
    },
  ],
});

// Nav click → animate hero

$(".hero_slider_nav").on("click", ".nav-item", function (e) {
  e.preventDefault();

  const next = (current + 1) % total;

  const $nextSlide = $hero.find(
    '.slick-slide[data-slick-index="' + next + '"]',
  );

  setTransformOrigin($nextSlide, $(this));

  // Add animating class for effect

  $nextSlide.addClass("animating");

  current = next;

  renderNav();

  $hero.slick("slickGoTo", next);
});

// Keep nav in sync after slide

$hero.on("afterChange", function (e, slick, index) {
  current = index;

  renderNav();

  // remove animation class after transition

  $hero.find(".slick-current").removeClass("animating");
});

// First render

renderNav();

// hero slider

// inds slider

$(".inds_slider").slick({
  infinite: true,

  slidesToShow: 5,

  slidesToScroll: 5,

  dots: true,

  arrows: false,

  autoplay: false,

  autoplaySpeed: 3000,

  responsive: [
    {
      breakpoint: 1537,

      settings: {
        slidesToShow: 4,

        slidesToScroll: 4,

        infinite: true,
      },
    },

    {
      breakpoint: 1367,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 3,

        infinite: true,
      },
    },

    {
      breakpoint: 992,

      settings: {
        slidesToShow: 2,

        slidesToScroll: 2,
      },
    },

    {
      breakpoint: 480,

      settings: {
        slidesToShow: 1,

        centerMode: false,

        slidesToScroll: 1,

        dots: false,

        arrows: true,
      },
    },
  ],
});

// partner_sldier

$(".partner_slider").slick({
  infinite: true,

  slidesToShow: 6,

  slidesToScroll: 1,

  autoplay: true,

  autoplaySpeed: 0, // removes the delay

  speed: 4000, // higher = slower scroll

  cssEase: "linear", // smooth continuous motion

  dots: false,

  arrows: false,

  responsive: [
    {
      breakpoint: 992,

      settings: {
        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,
      },
    },

    {
      breakpoint: 476,

      settings: {
        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,
      },
    },
  ],
});

$(".tech_slider").slick({
  infinite: false,

  slidesToShow: 3,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  autoplay: false,

  responsive: [
    {
      breakpoint: 1367,

      settings: {
        slidesToShow: 2,

        slidesToScroll: 1,

        infinite: true,

        autoplay: true,

        autoplaySpeed: 1000,
      },
    },

    {
      breakpoint: 476,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,

        autoplay: true,

        autoplaySpeed: 1000,
      },
    },
  ],
});

$(".testi_slider").slick({
  infinite: true,

  slidesToShow: 3,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 1367,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 1,

        infinite: true,

        dots: true,
      },
    },

    {
      breakpoint: 476,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
  ],
});

$(".core_slider").slick({
  infinite: false,

  slidesToShow: 5,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  responsive: [
    {
      breakpoint: 1367,

      settings: {
        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true,
      },
    },

    {
      breakpoint: 1281,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 476,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
  ],
});

$(".serv_app_slider").slick({
  infinite: true,

  slidesToShow: 5,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  centerMode: false,

  variableWidth: false,

  responsive: [
    {
      breakpoint: 1537,

      settings: {
        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true,
      },
    },

    {
      breakpoint: 1281,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 480,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
  ],
});

$(".serv_app_slider_multi").slick({
  infinite: true,

  slidesToShow: 5,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  centerMode: false,

  variableWidth: false,

  responsive: [
    {
      breakpoint: 1537,

      settings: {
        slidesToShow: 4,

        slidesToScroll: 1,

        infinite: true,

        dots: true,
      },
    },

    {
      breakpoint: 1281,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 480,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
  ],
});

$(".expect_slider").slick({
  infinite: true,

  slidesToShow: 4,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  centerMode: false,

  variableWidth: false,

  responsive: [
    {
      breakpoint: 480,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1440,

      settings: {
        slidesToShow: 3,

        slidesToScroll: 1,
      },
    },
  ],
});

$(document).ready(function () {
  $(".expect_slider1").slick({
    infinite: true,

    slidesToShow: 3,

    slidesToScroll: 1,

    dots: true,

    arrows: false,

    centerMode: false,

    variableWidth: false,

    responsive: [
      {
        breakpoint: 1024,

        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 480,

        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

$(".serv_img_slider").slick({
  infinite: true,

  slidesToShow: 3.7,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  autoplay: true,

  autoplaySpeed: 2000,

  pauseOnHover: true,

  responsive: [
    {
      breakpoint: 728,

      settings: {
        slidesToShow: 1,

        slidesToScroll: 1,
      },
    },
  ],
});

$(".mob_step_slider").slick({
  infinite: true,

  slidesToShow: 1,

  slidesToScroll: 1,

  dots: true,

  arrows: false,

  centerMode: false,

  variableWidth: false,
});

function initResponsiveCore() {
  const $core = $(".core_wrapper");
  if (window.innerWidth < 993) {
    if (!$core.hasClass("slick-initialized")) {
      $core.slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: false,
        variableWidth: false,
        responsive: [
          {
            breakpoint: 476,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
  } else {
    if ($core.hasClass("slick-initialized")) {
      $core.slick("unslick");
    }
  }
}

$(window).on("load resize", initResponsiveCore);

$(document).ready(function () {
  $(".proced_slider_mobile").slick({
    infinite: true,

    slidesToShow: 2,

    slidesToScroll: 1,

    dots: false,

    arrows: false,

    autoplay: true,

    autoplaySpeed: 0,

    speed: 5000,

    cssEase: "linear",

    pauseOnHover: false,

    pauseOnFocus: false,

    centerMode: false,

    variableWidth: false,

    responsive: [
      {
        breakpoint: 476,

        settings: {
          slidesToShow: 1,

          slidesToScroll: 1,
        },
      },
    ],
  });
});



$(window).on("load", function () {
  setTimeout(function () {
    $(".inds_slider").slick("slickPlay");
  }, 4000); // 4 seconds delay
});


document.querySelectorAll('.expect_slide').forEach(function(slide) {
    const content = slide.querySelector('.read-content');
    const button = slide.querySelector('.read-toggle');

    button.addEventListener('click', function() {
        content.classList.toggle('expanded');

        if (content.classList.contains('expanded')) {
            button.textContent = 'Read Less';
        } else {
            button.textContent = 'Read More';
        }
    });

    // Hide button if content is short
    if (content.scrollHeight <= content.clientHeight + 5) {
        button.style.display = 'none';
    }
});
/* GS3D enhancement: auto-reveal 3D models on the active hero slide */
(function () {
  function revealActiveModel() {
    var hero = document.querySelector(".hero_slider_for");
    if (!hero) return;
    var current = hero.querySelector(".slick-current");
    if (!current) return;
    var mv = current.querySelector("model-viewer");
    if (!mv) return;
    try {
      if (mv.loading && typeof mv.loading === "string") { /* noop */ }
      if (typeof mv.dismissPoster === "function") mv.dismissPoster();
      if (typeof mv.play === "function") { try { mv.play(); } catch (e) {} }
    } catch (e) {}
  }

  function setupHeroModels() {
    var hero = document.querySelector(".hero_slider_for");
    if (!hero) return;
    // reveal current on init
    setTimeout(revealActiveModel, 400);

    var $hero = window.jQuery && jQuery(hero);
    if ($hero && $hero.on) {
      $hero.on("afterChange", function (e, slick, index) {
        setTimeout(revealActiveModel, 250);
      });
    }
    // also reveal on first interaction/scroll into view
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) setTimeout(revealActiveModel, 200);
        });
      }, { threshold: 0.1 });
      io.observe(hero);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(setupHeroModels, 300);
  });
})();
