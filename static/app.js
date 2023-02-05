const videoDataContainer = document.querySelector("#videoDataContainer");

const youtubeThumbnail = document.querySelector("#youtubeThumbnail");
const youtubeTitle = document.querySelector("#youtubeTitle");
const youtubeDuration = document.querySelector("#youtubeDuration");

const hiddenUrl = document.querySelector("#hiddenUrl");

const handelSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    hiddenUrl.value = value.url;
    getVideoData(value.url);
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



const handelSubmit2 = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    getVideoData(value.url);
}

