from pytube import YouTube
import os

def get_video_id(url):
    yt = YouTube(url)
    return yt.video_id

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
