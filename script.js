const discussCardContainer = document.getElementById("discuss-card-container");
const markasreadContainer = document.getElementById("markasread-container");
const markAsReadNumber = document.getElementById("markAsReadNumber");
const latestCardContainer = document.getElementById("latest-card-container");
const errorMessage = document.getElementById("error-message");

const searchInput = document.getElementById("searchinput");
const searchBtn = document.getElementById("search-btn");

let markAsReadCount = 0;

const getAllPostData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const responseJson = await response.json();

  const responseData = responseJson.posts;
  discussCardContainer.innerHTML = "";
  showAllPost(responseData);
};

function showLoading() {
  discussCardContainer.innerHTML = `<div class='w-full flex gap-0'><img class="w-full" src="./images/Pulse-0.9s-204px.gif" alt="" /> <img class="w-full hidden lg:flex" src="./images/Pulse-0.9s-204px.gif" alt="" /></div>
    
  `;
  setTimeout(() => {
    discussCardContainer.innerHTML = "";
    getAllPostData();
  }, 2000);
}

showLoading();

function showAllPost(data) {
  data.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "flex flex-col lg:flex-row bg-[#797DFC1A] border border-[#797DFC] rounded-xl p-6 gap-4";

    cardDiv.innerHTML = `  <div class="relative max-sm:flex max-sm:justify-center">
      <div class="h-20 w-20 rounded-lg overflow-hidden"><img src="${
        card.image
      }" alt="" /></div>
      <span
        class="block absolute -top-1 right-1/3 lg:-top-1 lg:-right-1 w-4 h-4 rounded-full ${
          card.isActive ? "bg-green-600" : "bg-red-600"
        }"
      ></span>
    </div>
    <div class="space-y-2 w-full">
      <div class="flex justify-between text-[#12132DCC]">
        <p># ${card.category}</p>
        <p>Author : ${card.author.name}</p>
      </div>
      <div>
        <h3 class="font-bold text-xl text-[#12132D]">
         ${card.title}
        </h3>
      </div>
      <div>
        <p
          class="text-[#12132D99] border-b border-[#12132D40] border-dashed pb-3"
        >
          ${card.description}
        </p>
      </div>
      <div class="flex justify-between">
        <div class="flex gap-3 text-[#12132D99]">
          <p class="flex gap-2 items-center">
            <img src="./images/icons/Group 13.png" alt="" /> ${
              card.comment_count
            }
          </p>
          <p class="flex gap-2 items-center">
            <img src="./images/icons/Group 16.png" alt="" /> ${card.view_count}
          </p>
          <p class="flex gap-2 items-center">
            <img src="./images/icons/Group 18.png" alt="" />${
              card.posted_time
            } Min
          </p>
        </div>
        <div>
          <button onclick="handleCardClick('${card.view_count}','${escape(
      card.title
    )}')">
            <img src="./images/icons/Group 40106.png" alt="" />
          </button>
        </div>
      </div>
    </div>`;

    discussCardContainer.appendChild(cardDiv);
  });
}

const handleCardClick = (views, title) => {
  markAsReadCount++;

  markAsReadNumber.innerText = `(${markAsReadCount})`;
  const div = document.createElement("div");
  div.className = "bg-white p-2 flex justify-between items-center rounded-xl";
  div.innerHTML = ` <div><h1 class="text-[#12132D] font-semibold max-w-44 lg:max-w-56">
  ${unescape(title)}
</h1></div>
<div><p class="flex items-center flex-1">
<img src="./images/icons/Group 16.png" alt="" /> ${views}
</p></div>`;

  markasreadContainer.appendChild(div);
};

const getAllLatestPost = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();

  showLatestPost(data);
};
getAllLatestPost();

function showLatestPost(data) {
  //   console.log(data);
  data.forEach((postCard) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card bg-base-100 shadow-xl";

    cardDiv.innerHTML = ` <figure class="px-10 pt-10">
    <img
      src="${postCard.cover_image}"
      alt=""
      class="rounded-xl"
    />
  </figure>
  <div class="card-body">
    <p class="flex gap-2 text-[#12132D99]">
      <img src="./images/Frame (1).png" alt="" /> ${
        postCard.author.posted_date || "No publish date"
      }
    </p>
    <h2 class="card-title text-[#12132D] text-lg font-extrabold">
   ${postCard.title}
    </h2>
    <p class="text-[#12132D99]">
 ${postCard.description}
    </p>
    <div class="flex gap-2">
      <div class='w-12 h-12 rounded-full overflow-hidden'><img src="${
        postCard.profile_image
      }" alt="" /></div>
      <div>
        <h3 class="text-[#12132D] font-bold">${postCard.author.name}</h3>
        <p class="text-[#12132D99] text-sm">${
          postCard.author.designation || "Unknown"
        }</p>
      </div>
    </div>
  </div>`;

    latestCardContainer.appendChild(cardDiv);
  });
}

searchBtn.addEventListener("click", async () => {
  const searchInputValue = searchInput.value;
  if (searchInputValue !== "") {
    errorMessage.innerText = "";
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInputValue}`
    );
    const responseJson = await response.json();
    const data = responseJson.posts;

    //show loading
    discussCardContainer.innerHTML = `<div class='w-full flex gap-0'><img class="w-full" src="./images/Pulse-0.9s-204px.gif" alt="" /> <img class="w-full hidden lg:flex" src="./images/Pulse-0.9s-204px.gif" alt="" /></div>
    `;
    setTimeout(() => {
      discussCardContainer.innerHTML = "";
      if (data.length === 0) {
        discussCardContainer.innerHTML = `<div class="lg:w-96"><h1 class='text-3xl font-black text-[#7B7DFCFF] w-full mr-5'>Oops! Not Found...</h1></div>`;
        return;
      }
      showAllPost(data);
    }, 2000);
  } else {
    errorMessage.innerText = "Input Field Cannot Be Empty !";
  }
});
