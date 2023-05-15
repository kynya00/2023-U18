FROM python:3 

RUN apt-get update && apt-get install -y socat
WORKDIR /app

COPY server.py /app/server.py

EXPOSE 1337 

CMD socat TCP-LISTEN:1337,fork,reuseaddr EXEC:"python3 server.py"

