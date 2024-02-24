import { scrollStory } from "./story.js";
import { fetchUsers } from "./user.js";
import { handlePostCreation, fetchPosts } from "./post.js";
import { toggleSideBar } from "./sidebartoggler.js";
document.addEventListener("DOMContentLoaded", () => {
    const rightAngle = document.querySelector("#right");
    const leftAngle = document.querySelector("#left");
    const sideBarToggler = document.querySelector("#side-bar-toggler");
    const postArea = document.querySelector("#post");
    rightAngle.addEventListener("click", () => scrollStory("right"));
    leftAngle.addEventListener("click", () => scrollStory("left"));
    postArea.addEventListener("keydown", handlePostCreation);
    sideBarToggler.addEventListener("click", toggleSideBar);
    fetchUsers();
    fetchPosts();
});
