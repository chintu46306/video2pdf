from flask import Flask, render_template, request, jsonify, url_for, send_from_directory

import os

from video_to_image import videoToimg
from yt_download import download_video, get_video_id, get_video_data
from image2pdf import imageToPdf

app = Flask(__name__, template_folder='templates')


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/api/getData', methods=['GET', 'POST'])
def getData():
    if request.method == 'POST':
        url = request.form['url']
        #get from url prams
        videoData = get_video_data(url)
        return jsonify(videoData)
    elif request.method == 'GET':
        url = request.args.get('url')
        #get from url prams
        videoData = get_video_data(url)
        return jsonify(videoData)

@app.route('/api/getPdf', methods=['GET', 'POST'])
def download():
    if request.method == 'POST':
        url = request.form['url']
        skipFrame = request.form['skip']
        videoFileLocation = download_video(url)
        id = get_video_id(url)
        imageDirectory = videoToimg(id, videoFileLocation, skipFrame)
        pdfFileLocation = imageToPdf(id, imageDirectory)
        return jsonify({"pdfFileLocation": pdfFileLocation})
    elif request.method == 'GET':
        url = request.args.get('url')
        skipFrame = request.args.get('skip')
        videoFileLocation = download_video(url)
        id = get_video_id(url)
        imageDirectory = videoToimg(id, videoFileLocation, skipFrame)
        pdfFileLocation = imageToPdf(id, imageDirectory)
        #return jsonify({"pdfFileLocation": url_for('static', filename=pdfFileLocation)})
        return send_from_directory(directory='static', path=pdfFileLocation)

if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000),host='0.0.0.0')