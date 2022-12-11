FROM python:3.10

WORKDIR /app

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt .

RUN pip install -r requirements.txt 

COPY ./ /app/

CMD ["gunicorn"  , "--bind", "0.0.0.0:5000", "wsgi:app"]