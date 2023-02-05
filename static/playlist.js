// let videoData = [{ "title": "video1", "thumbnail": "https://via.placeholder.com/400x250", "duration_sec": "15:39" },
// { "title": "video2", "thumbnail": "https://via.placeholder.com/400x250", "duration_sec": "10:00" },
// { "title": "video3", "thumbnail": "https://via.placeholder.com/400x250", "duration_sec": "5:30" }];

// let allVideoContainer = document.getElementById("allVideoContainer");

// for (let i = 0; i < videoData.length; i++) {
//   let videoDataContainer = document.createElement("div");
//   videoDataContainer.className = "hidden grid-cols-5 gap-2 items-center";

//   let thumbnailContainer = document.createElement("div");
//   thumbnailContainer.className = "col-span-full md:col-span-2 overflow-hidden";
//   let thumbnail = document.createElement("img");
//   thumbnail.src = videoData[i].thumbnail;
//   thumbnail.className = "md:h-32 w-full object-cover";
//   thumbnail.alt = "thumbnail";
//   thumbnailContainer.appendChild(thumbnail);

//   let videoDetailsContainer = document.createElement("div");
//   videoDetailsContainer.className = "col-span-full md:col-span-3 flex flex-col justify-between h-full";

//   let videoTitle = document.createElement("h1");
//   videoTitle.className = "truncate text-lg font-medium";
//   videoTitle.innerHTML = videoData[i].title;

//   let videoDuration = document.createElement("h2");
//   videoDuration.className = "truncate text-md font-medium text-gray-600";
//   videoDuration.innerHTML = videoData[i].duration_sec;

//   videoDetailsContainer.appendChild(videoTitle);
//   videoDetailsContainer.appendChild(videoDuration);

//   videoDataContainer.appendChild(thumbnailContainer);
//   videoDataContainer.appendChild(videoDetailsContainer);

//   allVideoContainer.appendChild(videoDataContainer);
// }

const hiddenUrl = document.querySelector("#hiddenUrl");


const handelSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const value = Object.fromEntries(data.entries());
  getPlaylistData(value.url);
}

const getPlaylistData = async (url) => {
  let loadingAnimation = document.getElementById("loadingAnimation");
  loadingAnimation.classList.remove("hidden");
  const response = await fetch("/api/getPlaylist?url=" + url);
  const videoData = await response.json();
  console.log(videoData);

  let allVideoContainer = document.getElementById("allVideoContainer");

  loadingAnimation.classList.add("hidden");

  for (let i = 0; i < videoData.length; i++) {
    // let videoDataContainer = document.createElement("div");
    // videoDataContainer.className = "grid-cols-5 gap-2 items-center";

    // let thumbnailContainer = document.createElement("div");
    // thumbnailContainer.className = "col-span-full md:col-span-2 overflow-hidden";
    // let thumbnail = document.createElement("img");
    // thumbnail.src = videoData[i].thumbnail;
    // thumbnail.className = "md:h-32 w-full object-cover";
    // thumbnail.alt = "thumbnail";
    // thumbnailContainer.appendChild(thumbnail);

    // let videoDetailsContainer = document.createElement("div");
    // videoDetailsContainer.className = "col-span-full md:col-span-3 flex flex-col justify-between h-full";

    // let videoTitle = document.createElement("h1");
    // videoTitle.className = "truncate text-lg font-medium";
    // videoTitle.innerHTML = videoData[i].title;

    // let videoDuration = document.createElement("h2");
    // videoDuration.className = "truncate text-md font-medium text-gray-600";
    // videoDuration.innerHTML = videoData[i].duration_sec;

    // videoDetailsContainer.appendChild(videoTitle);
    // videoDetailsContainer.appendChild(videoDuration);

    // videoDataContainer.appendChild(thumbnailContainer);
    // videoDataContainer.appendChild(videoDetailsContainer);

    const video = `
    <div
      class="grid grid-cols-5 gap-2 items-center border-b-2 border-gray-200 py-2"
      id="${i}"
    >
      <div class="col-span-2 overflow-hidden">
        <img
          src="${videoData[i].thumbnail}"
          class="md:h-32 w-full object-cover"
          alt="thumbnail"
          id="youtubeThumbnail"
        />
      </div>

      <div
        class="col-span-3 flex flex-col justify-between h-full"
      >
        <div>
          <h1 class="truncate text-lg font-medium" id="youtubeTitle">
            ${videoData[i].title}
          </h1>
          <h2
            class="truncate text-md font-medium text-gray-600"
            id="youtubeDuration"
          >
            ${videoData[i].duration_sec}
          </h2>
        </div>
        <div class="flex flex-col w-full">
          <p>
            <span class="text-gray-600 text-sm"
            >Please Select Skip Seconds</span
            >
          </p>
          <form
            class="flex flex-row justify-between gap-3 w-full"
            action="/api/getPdf" target="_blank"
          >
            <input type="hidden" name="url" value="${videoData[i].url}" />
            <div class="relative w-full">
              <select
                name="skip"
                class="flex flex-row justify-around appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-full"
              >
                <option value="10">10sec</option>
                <option value="15">15sec</option>
                <option value="20">20sec</option>
                <option value="30">30sec</option>
                <option value="35">45sec</option>
                <option value="60">1min</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
            <button
              class="w-full h-full bg-slate-800 text-white p-2 bg-green-600"
            >
              Download&nbsp;PDF
            </button>
          </form>
        </div>
      </div>
    </div>
    `
    allVideoContainer.innerHTML += video;

  }

}



const getVideoData = async (url) => {
  const response = await fetch("/api/getData?url=" + url);
  const data = await response.json();
  console.log(data);

  //remove hidden class from videoDataContainer
  videoDataContainer.classList.remove("hidden");
  //add grid to class to videoDataContainer
  videoDataContainer.classList.add("grid");

  //change youtubeThumbnail src
  youtubeThumbnail.src = data.thumbnail;
  //change youtubeTitle textContent
  youtubeTitle.textContent = data.title;


  //convert seconds to minutes and seconds
  const minutes = Math.floor(data.duration_sec / 60);
  const seconds = data.duration_sec - minutes * 60;
  //format seconds to 2 digits
  seconds = seconds.toString().padStart(2, "0");

  //change youtubeDuration textContent
  youtubeDuration.textContent = `${minutes}:${seconds}`;

}