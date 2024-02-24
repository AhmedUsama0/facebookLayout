import { getSingleUser } from "./user.js";

const postArea: HTMLInputElement = document.querySelector("#post");

const isPostValid = (): boolean => postArea.value.trim() !== "";

const preparePost = (): string => {
  const postContent: string = postArea.value;
  const post: string = `
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

const addPost = (post: string): void => {
  const postsContainer: HTMLElement =
    document.querySelector("#posts-container");
  postsContainer.insertAdjacentHTML("beforebegin", post);
};
const handlePostCreation = (event: KeyboardEvent): void => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (!isPostValid()) return;
    addPost(preparePost());
    clearPostArea();
  }
};

const clearPostArea = (): string => (postArea.value = "");

const fetchPosts = (): void => {
  if (getCachedPosts()) {
    showPosts();
    return;
  }
  fetch("https://api.slingacademy.com/v1/sample-data/blog-posts")
    .then((response: Response) => response.json())
    .then(async ({ blogs: posts }) => {
      const preparedPosts: Array<string> = await preparePosts(posts);
      cachePosts(preparedPosts);
      showPosts();
    });
};
const preparePosts = (
  posts: Array<{ content_text: string; user_id: number }>
): Promise<Array<string>> => {
  return Promise.all(
    posts.map(async ({ content_text, user_id }) => {
      const user: any = await getSingleUser(user_id);
      return `<div class="post">
        <header class="post__header grid">
          <div class="user__info">
            <img
              src=${user.profile_picture}
              alt="user image"
            />
            <span class="user__name">${
              user.first_name + " " + user.last_name
            }</span>
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
    })
  );
};

const cachePosts = (posts: Array<string>): void => {
  localStorage.setItem("posts", JSON.stringify(posts));
};
const getCachedPosts = (): Array<string> => {
  return JSON.parse(localStorage.getItem("posts"));
};
const showPosts = (preparedPosts: Array<string> = getCachedPosts()): void => {
  preparedPosts.forEach((post: string) => {
    document
      .querySelector("#posts-container")
      .insertAdjacentHTML("beforeend", post);
  });
};

export { handlePostCreation, fetchPosts }; 
