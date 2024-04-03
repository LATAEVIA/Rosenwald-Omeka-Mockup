const wiperTrack = document.querySelector(".wiper-track");
const wipes = Array.from(wiperTrack.children);
console.log('UL children:', wipes);
const wipePrevBtn = document.querySelector(".wiper-button__right");
const wipeNextBtn = document.querySelector(".wiper-button__left");
const wipeButtons = document.querySelectorAll(".swiper__image-button");
const wipeWidth = wipes[0].getBoundingClientRect().width;

const arrowsBehaviour = (wipePrevBtn, wipeNextBtn, index) => {
  if (index === 0) {
    wipePrevBtn.classList.add("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  } else if (index === wipes.length-1) {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.add("is-hidden");
  } else {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  }

  // Change button color based on active slide
  wipeButtons.forEach((button, i) => {
    if (i === index) {
      button.classList.add("active-swipe-button");
      button.style.backgroundColor = "#d4c5a4"; // Set background color for active button
    } else {
      button.classList.remove("active-swipe-button");
      button.style.backgroundColor = ""; // Reset background color for inactive buttons
    }
  });
};

const wipeSlide = (wiperTrack, activeSlide, nextSlide, targetIndex) => {
  wiperTrack.style.transform =
    "translateX(-" + (wipeWidth + 24) * (targetIndex - 1) + "px)";
  activeSlide.classList.remove("active-swipe");
  activeSlide.style.transform = "scale(1)";
  
  nextSlide.classList.add("active-swipe");
  nextSlide.style.transform = "scale(1.1)";
};

// Function to set initial active slide and apply styles
const setInitialActiveSlide = () => {
  const initialActiveSlide = wiperTrack.querySelector(".active-swipe");
  const initialActiveIndex = wipes.findIndex(slide => slide === initialActiveSlide);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, initialActiveIndex);
};

// Call the function once the page has loaded
window.addEventListener("load", setInitialActiveSlide);

wipeNextBtn.addEventListener("click", (e) => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = activeSlide.nextElementSibling;
  const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
  wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
});

wipePrevBtn.addEventListener("click", (e) => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = activeSlide.previousElementSibling;
  const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
  wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
});
