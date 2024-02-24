const scrollStory = (direction) => {
    const storyBox = document.querySelector(".story__box");
    const slider = document.querySelector("#slider");
    let scrollAmount = storyBox.clientWidth * 4;
    if (window.innerWidth <= 500) {
        scrollAmount = storyBox.clientWidth * 2;
    }
    if (direction === "right") {
        slider.scrollLeft += scrollAmount;
    }
    else if (direction === "left") {
        slider.scrollLeft -= scrollAmount;
    }
};
export { scrollStory };
