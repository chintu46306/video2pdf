import img2pdf
import os

def imageToPdf(id, imageFolder):
    folder = "pdf/"
    if not os.path.exists(folder):
        os.makedirs(folder)

    files = []

    for file in os.listdir(imageFolder):
        if file.endswith(".jpg"):
            files.append(int(file.replace(".jpg","")))
    files.sort()
    
    imgs = []
    for fname in files:
        path = os.path.join(imageFolder, str(fname)+".jpg")
        if os.path.isdir(path):
            continue
        imgs.append(path)
        
    with open(folder+id+".pdf","wb") as f:
        f.write(img2pdf.convert(imgs))
        
    return "pdf/"+id+".pdf"