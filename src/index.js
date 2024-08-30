import "./styles/index.scss";

/* about section slider */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const indicators = document.querySelectorAll(".indicator__item");
  const sliderContainer = document.querySelector(".about__slider-container");

  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth;
  let autoSlideInterval;

  function updateSlider() {
    slideWidth = slides[0].offsetWidth;
    sliderWrapper.style.transition = "transform 0.5s ease";
    sliderWrapper.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(showNextSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  prevButton.addEventListener("click", showPrevSlide);
  nextButton.addEventListener("click", showNextSlide);
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", updateSlider);

  updateSlider();
  startAutoSlide();
});

/*folder animation*/
document.addEventListener("DOMContentLoaded", function () {
  const sliderImages = document.querySelectorAll(".slider__content-img");
  const totalSlides = sliderImages.length;
  const visibleSlides = 4;
  const animationDuration = 3000; // длительность мс
  const animationDelay = 0;
  const removalDelay = 150;
  let currentIndex = -1;
  const isMobile = window.innerWidth <= 767;
  const basePosition = isMobile ? 100 : 125;
  const spacing = isMobile ? 18 : 25;

  // Установка начальных позиций слайдов
  sliderImages.forEach((slide, index) => {
    slide.setAttribute("id", `${index + 1}`);
    if (index < visibleSlides) {
      slide.style.left = `${
        basePosition - (visibleSlides - 1 - index) * spacing
      }px`;
    } else {
      slide.style.left = `${basePosition - visibleSlides * spacing}px`;
      slide.style.zIndex = 1;
    }
  });

  function animateNextSlide() {
    if (currentIndex >= 0) {
      const prevIndex = currentIndex;
      sliderImages[prevIndex].style.left = `${
        basePosition - visibleSlides * spacing
      }px`;
      sliderImages[prevIndex].style.zIndex = 1;
      setTimeout(() => {
        sliderImages[prevIndex].classList.remove("animated-slide");
      }, removalDelay);
    }

    currentIndex = (currentIndex + 1) % totalSlides;
    sliderImages[currentIndex].style.left = `${basePosition}px`;
    sliderImages[currentIndex].style.zIndex = 6;
    sliderImages[currentIndex].classList.add("animated-slide");

    for (let i = 1; i <= visibleSlides; i++) {
      const nextVisibleIndex = (currentIndex + i) % totalSlides;
      sliderImages[nextVisibleIndex].style.left = `${
        basePosition - i * spacing
      }px`;
      sliderImages[nextVisibleIndex].style.zIndex = 6 - i;
    }

    setTimeout(() => {
      animateNextSlide();
      if (typeof swiperEl !== "undefined" && swiperEl.swiper) {
        swiperEl.swiper.slideNext();
      }
    }, animationDuration + animationDelay);
  }

  animateNextSlide();
});

/*swiper zoom*/
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".bots__item-image img");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  const largeImageContainer = document.createElement("div");
  largeImageContainer.classList.add("bots__item-image-lg");
  document.body.appendChild(largeImageContainer);

  images.forEach((image) => {
    image.addEventListener("click", () => {
      const parentSlide = image.closest("swiper-slide");
      if (
        parentSlide &&
        parentSlide.classList.contains("swiper-slide-active")
      ) {
        const largeImageSrc =
          image.parentElement.nextElementSibling.dataset.largeImage;
        const largeImage = document.createElement("img");
        largeImage.src = largeImageSrc;
        largeImageContainer.innerHTML = "";
        largeImageContainer.appendChild(largeImage);

        largeImageContainer.classList.add("active");
        overlay.classList.add("active");
      }
    });
  });

  overlay.addEventListener("click", () => {
    largeImageContainer.classList.remove("active");
    overlay.classList.remove("active");
  });
});

//form//
document.addEventListener("DOMContentLoaded", function () {
  const openFormButtons = document.querySelectorAll(".popupForm");
  const formWrapper = document.getElementById("form__wrapper");
  const overlay = document.getElementById("form__overlay");
  const closeFormButton = document.getElementById("closeFormButton");

  openFormButtons.forEach((button) => {
    button.addEventListener("click", function () {
      formWrapper.classList.add("form__overlay--visible");
      document.body.classList.add("no-scroll");
    });
  });

  closeFormButton.addEventListener("click", function () {
    formWrapper.classList.remove("form__overlay--visible");
    document.body.classList.remove("no-scroll");
  });

  formWrapper.addEventListener("click", function (event) {
    if (event.target === formWrapper) {
      formWrapper.classList.remove("form__overlay--visible");
      document.body.classList.remove("no-scroll");
    }
  });
});

/* quiz */
document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".quiz__step");
  let currentStep = 0;
  let phoneTouched = false;
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.toggle("quiz__step--active", index === stepIndex);
    });
    if (stepIndex === 5) {
      setTimeout(() => {
        showStep(6);
        setTimeout(() => {
          currentStep = 6;
          showStep(currentStep);
        }, 2500);
      }, 2500);
    }
  }
  function validateStep(stepIndex) {
    const currentStepElement = steps[stepIndex];
    const radios = currentStepElement.querySelectorAll('input[type="radio"]');
    const checkboxes = currentStepElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    const textarea = currentStepElement.querySelector("textarea");
    const phoneInput = document.getElementById("QuizPhoneMask");
    let isValid = false;
    if (radios.length > 0) {
      isValid = Array.from(radios).some((radio) => radio.checked);
    }
    if (checkboxes.length > 0) {
      isValid = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    }
    if (textarea) {
      isValid = textarea.value.trim() !== "";
    }
    if (stepIndex === steps.length - 1) {
      isValid = phoneInput.value.trim() !== "" && phoneTouched;
    }
    return isValid;
  }
  function showError(stepIndex) {
    const errorElement = document.getElementById(`error-step-${stepIndex + 1}`);
    if (errorElement) {
      errorElement.style.display = "block";
    }
  }
  function hideError(stepIndex) {
    const errorElement = document.getElementById(`error-step-${stepIndex + 1}`);
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }
  function handleNextButton(stepIndex) {
    const nextButton = document.getElementById(`next-step-${stepIndex + 1}`);
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (validateStep(stepIndex)) {
          hideError(stepIndex);
          if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
          } else {
            const phoneInput = document.getElementById("QuizPhoneMask");
            if (phoneInput) {
              if (phoneInput.value.trim() === "" || !phoneTouched) {
                phoneInput.classList.add("error");
                showError(currentStep);
              } else {
                phoneInput.classList.remove("error");
                document.getElementById("quiz-form").submit();
              }
            }
          }
        } else {
          showError(stepIndex);
        }
      });
    }
  }
  function handlePrevButton(stepIndex) {
    const prevButton = document.getElementById(`prev-step-${stepIndex + 1}`);
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }
  }
  function handleInputs(stepIndex) {
    const radios = document.querySelectorAll(
      `.step-${stepIndex + 1} input[type="radio"]`
    );
    const checkboxes = document.querySelectorAll(
      `.step-${stepIndex + 1} input[type="checkbox"]`
    );
    const textarea = document.querySelector(`#step-${stepIndex + 1} textarea`);

    radios.forEach((input) => {
      input.addEventListener("change", function () {
        hideError(stepIndex);
        if (stepIndex === 0 || stepIndex === 2 || stepIndex === 4) {
          // 1-й, 3-й, 5-й шаги
          if (validateStep(stepIndex)) {
            currentStep++;
            showStep(currentStep);
          }
        }
      });
    });
    checkboxes.forEach((input) => {
      input.addEventListener("change", function () {
        hideError(stepIndex);
      });
    });
    if (textarea) {
      textarea.addEventListener("input", function () {
        hideError(stepIndex);
      });
    }
    const phoneInput = document.getElementById("QuizPhoneMask");
    const submitBtn = document.querySelector(".quiz__submit");
    if (phoneInput && submitBtn) {
      phoneInput.addEventListener("focus", function () {
        phoneTouched = true;
        updateSubmitButtonState();
      });
      phoneInput.addEventListener("input", function () {
        hideError(stepIndex);
        updateSubmitButtonState();
      });
      function updateSubmitButtonState() {
        if (phoneInput.value.trim() === "" || !phoneTouched) {
          submitBtn.disabled = false;
        } else {
          submitBtn.disabled = false;
        }
      }
    }
  }
  steps.forEach((step, index) => {
    handleNextButton(index);
    handlePrevButton(index);
    handleInputs(index);
  });
  showStep(currentStep);
});

document.addEventListener("DOMContentLoaded", function () {
  const openQuizBtn = document.getElementById("open-quiz-btn");
  const quizWrapper = document.getElementById("quiz__wrapper");
  const quizOverlay = document.getElementById("quiz-overlay");
  const closeQuizBtn = document.getElementById("close-quiz-btn");
  function openQuiz() {
    quizWrapper.style.display = "block";
    quizOverlay.style.display = "flex";
    document.body.classList.add("no-scroll");
  }
  function closeQuiz() {
    quizWrapper.style.display = "none";
    quizOverlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
  openQuizBtn.addEventListener("click", openQuiz);
  quizOverlay.addEventListener("click", closeQuiz);
  closeQuizBtn.addEventListener("click", closeQuiz);
});

/*quizinputs*/
document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll(
    '.quiz__options input[type="radio"]'
  );
  radioButtons.forEach((button) => {
    button.addEventListener("change", () => {
      document.querySelectorAll(".quiz__options label").forEach((label) => {
        label.classList.remove("selected");
      });
      const selectedLabel = button.closest("label");
      if (selectedLabel) {
        selectedLabel.classList.add("selected");
      }
    });
  });
  document
    .querySelectorAll('.quiz__options input[type="radio"]:checked')
    .forEach((button) => {
      const selectedLabel = button.closest("label");
      if (selectedLabel) {
        selectedLabel.classList.add("selected");
      }
    });
  const checkboxes = document.querySelectorAll(
    '.quiz__checkbox-group input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const label = checkbox.closest("label");
      if (checkbox.checked) {
        label.classList.add("selected");
      } else {
        label.classList.remove("selected");
      }
    });
  });
  document
    .querySelectorAll('.quiz__checkbox-group input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      const label = checkbox.closest("label");
      if (label) {
        label.classList.add("selected");
      }
    });
});

/*mask*/
document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("phone");
  var maskOptions = {
    mask: "+7 (000) 000-00-00",
    lazy: false,
  };
  var mask = new IMask(element, maskOptions);

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("error");
  phoneInput.addEventListener("input", function () {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length === 10) {
      this.classList.add("filled");
      phoneError.classList.remove("show");
      phoneInput.classList.remove("errorInput");
    } else {
      this.classList.remove("filled");
    }
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length !== 10) {
      event.preventDefault();
      phoneError.classList.add("show");
      phoneInput.classList.add("errorInput");
    } else {
      phoneError.classList.remove("show");
      phoneInput.classList.remove("errorInput");
    }
  });
});

/*maskQuiz*/
document.addEventListener("DOMContentLoaded", function () {
  var element = document.getElementById("QuizPhoneMask");
  var maskOptions = {
    mask: "+7 (000) 000-00-00",
    lazy: false,
  };
  var mask = new IMask(element, maskOptions);

  const phoneInput = document.getElementById("QuizPhoneMask");
  const phoneError = document.getElementById("error-quiz");
  const form = document.getElementById("quizForm");

  phoneInput.addEventListener("input", function () {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length === 10) {
      this.classList.add("filled");
      this.classList.remove("errorInput-quiz");
      phoneError.classList.remove("show");
    } else {
      this.classList.remove("filled");
      this.classList.add("errorInput-quiz");
      phoneError.classList.add("show");
    }
  });

  form.addEventListener("submit", function (event) {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length !== 10) {
      event.preventDefault();
      phoneError.classList.add("show");
      phoneInput.classList.add("errorInput-quiz");
    } else {
      phoneError.classList.remove("show");
      phoneInput.classList.remove("errorInput-quiz");
    }
  });

  phoneInput.addEventListener("click", function () {
    const unmaskedValue = mask.unmaskedValue;
    if (unmaskedValue.length !== 10) {
      phoneError.classList.add("show");
      phoneInput.classList.add("errorInput-quiz");
    }
  });
});

/*stories*/
document.addEventListener("DOMContentLoaded", () => {
  function playVideo(video) {
    video.play();
  }
  function pauseVideo(video) {
    video.pause();
  }
  const slides = document.querySelectorAll("swiper-slide");
  function handleSlideChange() {
    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (slide.classList.contains("swiper-slide-active")) {
        if (video) {
          playVideo(video);
        }
      } else {
        if (video) {
          pauseVideo(video);
        }
      }
    });
  }
  const observer = new MutationObserver(handleSlideChange);

  slides.forEach((slide) => {
    observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
  });
  handleSlideChange();
});

/*stories popup*/
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".stories__item");
  const popup = document.getElementById("video-popup");
  const popupOverlay = document.querySelector(".popup__overlay");
  const popupClose = document.querySelector(".popup__close");
  const popupVideo = document.getElementById("popup-video");
  const swiperContainers = document.querySelectorAll(".stories__swiper");
  function openPopup(videoSrc, swiper) {
    popup.style.display = "flex";
    popupVideo.querySelector("source").src = videoSrc;
    popupVideo.load();
    popupVideo.play();
    document.body.classList.add("no-scroll");
    swiper.autoplay.stop();
    swiper.disable();
  }
  function closePopup(swiper) {
    popup.style.display = "none";
    popupVideo.pause();
    popupVideo.currentTime = 0;
    document.body.classList.remove("no-scroll");
    swiper.autoplay.start();
    swiper.enable();
  }
  swiperContainers.forEach((swiperContainerEl) => {
    const swiper = swiperContainerEl.swiper;
    const slides = swiperContainerEl.querySelectorAll(".stories__item");
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        const videoSrc = slide.getAttribute("data-video-src");
        openPopup(videoSrc, swiper);
      });
    });
  });
  popupOverlay.addEventListener("click", () => {
    swiperContainers.forEach((swiperContainerEl) => {
      const swiper = swiperContainerEl.swiper;
      closePopup(swiper);
    });
  });

  popupClose.addEventListener("click", () => {
    swiperContainers.forEach((swiperContainerEl) => {
      const swiper = swiperContainerEl.swiper;
      closePopup(swiper);
    });
  });
});

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

function handleFullscreenChange() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
