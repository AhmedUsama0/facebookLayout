const toggleSideBar = () => {
    const faceBookLeftSideBar = document.querySelector("#facebook-left-sidebar");
    const width = getComputedStyle(faceBookLeftSideBar).getPropertyValue("width");
    if (window.innerWidth <= 992) {
        if (width === "0px") {
            faceBookLeftSideBar.classList.add("show__left__sidebar");
            return;
        }
        faceBookLeftSideBar.classList.remove("show__left__sidebar");
    }
};
export { toggleSideBar };
