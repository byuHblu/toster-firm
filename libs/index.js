// TIMER

class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      hours: "",
      minutes: "",
      seconds: "",
    };
    this._start();
  }

  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }
  _calc() {
    const diff = this._deadline - new Date();
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this._out.hours = hours < 10 ? "0" + hours : hours;
    this._out.minutes = minutes < 10 ? "0" + minutes : minutes;
    this._out.seconds = seconds < 10 ? "0" + seconds : seconds;
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elDays1 = document.querySelector(".timer .timer__days");
  const elHours1 = document.querySelector(".timer .timer__hours");
  const elMinutes1 = document.querySelector(".timer .timer__minutes");
  const elSeconds1 = document.querySelector(".timer .timer__seconds");
  const deadline1 = new Date(Date.now() + (291.26 * 60 * 1000 + 999));
  new CountdownTimer(
    deadline1,
    (timer) => {
      elHours1.textContent = timer.hours;
      elMinutes1.textContent = timer.minutes;
      elSeconds1.textContent = timer.seconds;
    },
    () => {
      document.querySelector(".timer .timer__result");
    }
  );
});

// SWIPER

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

// DROP_DOWN LISTS

//function show(value) {
//document.querySelector(".text-box").value = value;
//}

//let dropdown = document.querySelector(".dropdown");
//dropdown.onclick = function () {
//  dropdown.classList.toggle("active");
//};

//------------------

for (const dropdown of document.querySelectorAll(".select__wrapper")) {
  dropdown.addEventListener("click", function () {
    this.querySelector(".select__selects").classList.toggle("open");
  });
}

for (const option of document.querySelectorAll(".select__custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".select__custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".select__selects").querySelector(
        ".select__trigger span"
      ).textContent = this.textContent;
    }
  });
}

window.addEventListener("click", function (e) {
  for (const select of document.querySelectorAll(".select__selects")) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});
