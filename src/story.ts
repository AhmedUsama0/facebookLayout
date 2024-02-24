const scrollStory = (direction: string) => {
  const storyBox: HTMLElement = document.querySelector(".story__box");
  const slider: HTMLElement = document.querySelector("#slider");
  let scrollAmount: number = storyBox.clientWidth * 4;

  if (window.innerWidth <= 500) {
    scrollAmount = storyBox.clientWidth * 2;
  }

  if (direction === "right") {
    slider.scrollLeft += scrollAmount;
  } else if (direction === "left") {
    slider.scrollLeft -= scrollAmount;
  }
};

export { scrollStory };
