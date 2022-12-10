# Importing all necessary libraries
import cv2
import os


def videoToimg(id, videoFileLocation, skipFrame):

    # Read the video from specified path
    vid = cv2.VideoCapture(videoFileLocation)

    try:
        # creating a folder named data
        if not os.path.exists('images/'+id):
            os.makedirs('images/'+id)

    # if not created then raise error
    except OSError:
        print('Error: Creating directory of data')

    # frame
    currentframe = 0

    # seconds to skip
    skip = int(skipFrame)

    while (True):

        # reading from frame
        success, frame = vid.read()

        if success:
            # continue creating images until video remains
            # writing the extracted images
            # if currentframe%(30*60) == 0 :
            name = './images/'+id+'/'+str(currentframe)+'.jpg'
            cv2.imwrite(name, frame)

            # explain above line
            # increasing counter so that it will
            # show how many frames are created
            currentframe += 30*int(skip)
            vid.set(1, currentframe)
        else:
            break

    # Release all space and windows once done
    vid.release()
    cv2.destroyAllWindows()

    return "./images/"+id+"/"
