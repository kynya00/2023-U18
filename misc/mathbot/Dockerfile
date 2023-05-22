FROM python:3.9

WORKDIR /bot
ADD requirements.txt
RUN pip install -r requirements.txt

ADD main.py app ./
CMD ["python", "./main.py"]
