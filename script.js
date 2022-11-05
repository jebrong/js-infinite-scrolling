const postsContainer = document.querySelector("#posts-container");

const filter = document.querySelector("#filter");

const loader = document.querySelector("#loader");

let numOfPosts = 5;
let page = 1;

const getApi = async () => {
  apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${numOfPosts}&_page=${page}#`;

  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
};

const showPosts = async () => {
  const posts = await getApi();

  posts.forEach((e) => {
    const { title, id, body } = e;

    const post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `<div class="number">${e.id}</div>
    <div class="post-info">
      <h2 class="post-title">${e.title}</h2>
      <p class="post-body">
      ${e.body}
      </p>
    </div>
    `;
    postsContainer.appendChild(post);
  });
};

const showLoading = () => {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

window.addEventListener("scroll", (e) => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", () => {
  let allPosts = document.querySelectorAll(".post");
  let typedWord = filter.value.toLowerCase();

  allPosts.forEach((e) => {
    let allText = e.innerText.toLowerCase();
    if (allText.includes(typedWord)) {
      e.style.display = "flex";
    } else {
      e.style.display = "none";
    }
  });
});

showPosts();
