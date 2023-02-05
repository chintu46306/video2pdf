from pytube import YouTube, Playlist
import os

def get_video_id(url):
    yt = YouTube(url)
    return yt.video_id

def get_video_data(url):
    yt = YouTube(url)
    return {"title" : yt.title, "thumbnail": yt.thumbnail_url, "duration_sec" : yt.length}

def get_playlist_data(url):
    playlist = Playlist(url)
    playlistData = []
    for video in playlist.videos:
        playlistData.append({"title" : video.title, "thumbnail": video.thumbnail_url, "duration_sec" : video.length, "url": video.watch_url})
    return playlistData

def download_video(url):
    yt = YouTube(url)

    # get video id
    id = yt.video_id

    #save video to folder
    folder = "videos/"

    if not os.path.exists(folder):
            os.makedirs(folder)

    # download video at highest resolution
    yt.streams.get_lowest_resolution().download(folder,filename=id+".mp4")

    return folder+id+".mp4"
