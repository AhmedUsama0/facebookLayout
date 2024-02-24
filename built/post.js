var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSingleUser } from "./user.js";
const postArea = document.querySelector("#post");
const isPostValid = () => postArea.value.trim() !== "";
const preparePost = () => {
    const postContent = postArea.value;
    const post = `
    <div class="post">
        <header class="post__header grid">
        <div class="user__info">
            <img src="https://cdn.vox-cdn.com/thumbor/6cH0rxEsnwY2ndipRS7IWepUw90=/0x0:3840x2160/1200x800/filters:focal(1613x773:2227x1387)/cdn.vox-cdn.com/uploads/chorus_image/image/66788456/LastofUsPart2.0.jpg" alt="user image">
            <span class="user__name">ahmed osama</span>
        </div>
        <div class="post__edit">
            <i class="fa-solid fa-ellipsis"></i>
            <i class="fa-solid fa-xmark"></i>
        </div>
        </header>
        <div class="post__content" id="post-content">${postContent}</div>
        <div class="post__interactions grid">
            <div class="interaction">
            <i class="fa-solid fa-thumbs-up"></i>
            <span>like</span>
            </div>
            <div class="interaction">
            <i class="fa-solid fa-comment"></i>
            <span>comment</span>
            </div>
            <div class="interaction">
            <i class="fa-solid fa-share"></i>
            <span>share</span>
            </div>
        </div>
  </div>
    `;
    return post;
};
const addPost = (post) => {
    const postsContainer = document.querySelector("#posts-container");
    postsContainer.insertAdjacentHTML("beforebegin", post);
};
const handlePostCreation = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!isPostValid())
            return;
        addPost(preparePost());
        clearPostArea();
    }
};
const clearPostArea = () => (postArea.value = "");
const fetchPosts = () => {
    if (getCachedPosts()) {
        showPosts();
        return;
    }
    fetch("https://api.slingacademy.com/v1/sample-data/blog-posts")
        .then((response) => response.json())
        .then(({ blogs: posts }) => __awaiter(void 0, void 0, void 0, function* () {
        const preparedPosts = yield preparePosts(posts);
        cachePosts(preparedPosts);
        showPosts();
    }));
};
const preparePosts = (posts) => {
    return Promise.all(posts.map(({ content_text, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield getSingleUser(user_id);
        return `<div class="post">
        <header class="post__header grid">
          <div class="user__info">
            <img
              src=${user.profile_picture}
              alt="user image"
            />
            <span class="user__name">${user.first_name + " " + user.last_name}</span>
          </div>
          <div class="post__edit">
            <i class="fa-solid fa-ellipsis"></i>
            <i class="fa-solid fa-xmark"></i>
          </div>
        </header>
        <p class="post__content" id="post-content">${content_text}</p>
        <div class="post__interactions grid">
          <div class="interaction">
            <i class="fa-solid fa-thumbs-up"></i>
            <span>like</span>
          </div>
          <div class="interaction">
            <i class="fa-solid fa-comment"></i>
            <span>comment</span>
          </div>
          <div class="interaction">
            <i class="fa-solid fa-share"></i>
            <span>share</span>
          </div>
        </div>
      </div>`;
    })));
};
const cachePosts = (posts) => {
    localStorage.setItem("posts", JSON.stringify(posts));
};
const getCachedPosts = () => {
    return JSON.parse(localStorage.getItem("posts"));
};
const showPosts = (preparedPosts = getCachedPosts()) => {
    preparedPosts.forEach((post) => {
        document
            .querySelector("#posts-container")
            .insertAdjacentHTML("beforeend", post);
    });
};
export { handlePostCreation, fetchPosts };
