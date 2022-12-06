from video_to_image import videoToimg
from yt_download import download_video, get_video_id
from image2pdf import imageToPdf

#take user input for youtube url
url = input("Enter youtube url: ")

#download video
videoFileLocation = download_video(url)

#ask user for skip frame
skipFrame = input("Enter skip frame: ")

id = get_video_id(url)


#convert video to images
imageDirectory = videoToimg(id, videoFileLocation, skipFrame)

#convert images to pdf
pdfFileLocation = imageToPdf(id, imageDirectory)

print("PDF file location: "+pdfFileLocation)