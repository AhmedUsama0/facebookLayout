import { scrollStory } from "./story.js";
import { fetchUsers } from "./user.js";
import { handlePostCreation, fetchPosts } from "./post.js";
import { toggleSideBar } from "./sidebartoggler.js";

document.addEventListener("DOMContentLoaded", () => {
  const rightAngle: HTMLElement = document.querySelector("#right");
  const leftAngle: HTMLElement = document.querySelector("#left");
  const sideBarToggler: HTMLElement =
    document.querySelector("#side-bar-toggler");
  const postArea: HTMLInputElement = document.querySelector("#post");

  rightAngle.addEventListener("click", () => scrollStory("right"));
  leftAngle.addEventListener("click", () => scrollStory("left"));
  postArea.addEventListener("keydown", handlePostCreation);
  sideBarToggler.addEventListener("click", toggleSideBar);

  fetchUsers();
  fetchPosts(); 
});
