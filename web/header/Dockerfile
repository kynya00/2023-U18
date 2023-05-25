FROM python:3.7-alpine
WORKDIR app
COPY . .
COPY requirements.txt requirements.txt 
RUN pip install -r requirements.txt
CMD ["python","server.py"]
EXPOSE 5000
