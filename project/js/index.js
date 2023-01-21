// swiper block hero
let swiper = new Swiper(".hero__swiper", {
  loop: true,
  autoplay: {
    delay: 5000,
  },
});

// swiper block gallery
let gallerySwiper = new Swiper('.gallery__swiper',{
  autoplay: false,
  slidesPerView: 3,
  slidesPerGroup:3,
  loop: true,
  spaceBetween: 50,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: ".gallery__swiper-pagination",
    type: "fraction",
  },
    // Responsive breakpoints
    breakpoints: {

      200: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20
      },

      500: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    }
});

// swiper block case
let caseSwiper = new Swiper('.case__swiper',{
  slidesPerView: 3,
  slidesPerGroup: 1,
  loop: true,
  spaceBetween: 50,
  navigation: {
    nextEl: '.case__swiper-button-next',
  },
  pagination: {
    el: ".case__swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {

    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 40
    },

    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    1000: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 25
    }
  }
});

// swiper block projects
let projectsSwiper = new Swiper('.projects__swiper',{
  slidesPerView: 3,
  slidesPerGroup: 3,
  loop: true,
  spaceBetween: 50,
  navigation: {
    nextEl: '.projects__swiper-button-next',
    prevEl: '.projects__swiper-button-prev',
  },
  breakpoints: {

    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20
    },

    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50
    },

    1200: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  }
});

/*tabs*/
let tabsBtn = document.querySelectorAll('.ac-panel-items-btn');
let tabsItem = document.querySelectorAll('.catalog__block-lef-card');

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(btn){ btn.classList.remove('ac-panel-items-btn-active')});
    e.currentTarget.classList.add('ac-panel-items-btn-active');

    tabsItem.forEach(function(element){ element.classList.remove('catalog__block-lef-card-active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__block-lef-card-active');
  });
});


/*burger-menu*/
const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu", "#menu1").cloneNode(1);
const body = document.body;

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку

const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}


// search-box
document.querySelector(".form-btn__open").addEventListener("click", function() {
  document.querySelector(".form").classList.add("form__active");
  this.classList.add("active");
})
document.querySelector(".form-close").addEventListener("click", function() {
   let form = document.querySelector(".form");
  form.classList.remove("form__active");
    form.querySelector("input").value = "";
    document.querySelector(".form-btn__open").classList.remove("active")
});

document.addEventListener("click", function(e) {
  let target = e.target;
  let form = document.querySelector(".form");
  if (!target.closest(".form-btn")) {
  form.classList.remove("form__active");
    form.querySelector("input").value = "";
    document.querySelector(".form-btn__open").classList.remove("active")
  }
})
