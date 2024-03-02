const discussCardContainer = document.getElementById("discuss-card-container");
const markasreadContainer = document.getElementById("markasread-container");
const markAsReadNumber = document.getElementById("markAsReadNumber");
const latestCardContainer = document.getElementById("latest-card-container");

let markAsReadCount = 0;

const getAllPostData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const responseJson = await response.json();

  const responseData = responseJson.posts;

  showAllPost(responseData);
};

getAllPostData();

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
        class="block absolute right-1/3 lg:-top-1 lg:-right-1 w-4 h-4 rounded-full ${
          card.isActive ? "bg-green-600" : "bg-red-600"
        }"
      ></span>
    </div>
    <div class="flex flex-col gap-2">
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
          <button onclick="handleCardClick('${card.view_count}','${
      card.title
    }')">
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
  div.className = "bg-white p-2 flex justify-between gap-8 rounded-xl";
  div.innerHTML = ` <h1 class="text-[#12132D] font-semibold max-w-44 lg:max-w-48">
  ${title}
</h1>
<p class="flex items-center flex-1">
  <img src="./images/icons/Group 16.png" alt="" /> ${views}
</p>`;

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
      src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
      alt="Shoes"
      class="rounded-xl"
    />
  </figure>
  <div class="card-body">
    <p class="flex gap-2 text-[#12132D99]">
      <img src="./images/Frame (1).png" alt="" /> 29 January 2024
    </p>
    <h2 class="card-title text-[#12132D] text-lg font-extrabold">
      What will a mars habitat force that impact in our daily life!!!
    </h2>
    <p class="text-[#12132D99]">
      Yes, you can run unit tests and view the results directly within
      the app.
    </p>
    <div class="flex gap-2">
      <div><img src="./images/Ellipse 1.png" alt="" /></div>
      <div>
        <h3 class="text-[#12132D] font-bold">Cameron Williamson</h3>
        <p class="text-[#12132D99] text-sm">Unknown</p>
      </div>
    </div>
  </div>`;
  });
}
