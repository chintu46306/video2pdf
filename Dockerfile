FROM python:3.10

WORKDIR /app

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt .

RUN pip install -r requirements.txt 

COPY ./ /app/

ENV PORT=5000

EXPOSE $PORT

CMD ["gunicorn"  , "--bind", "0.0.0.0:$PORT", "wsgi:app"]