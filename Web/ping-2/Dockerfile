FROM ubuntu:20.04

ARG USER=ctfuser
ARG UID=1000
ARG GID=1000

RUN groupadd -g $GID $USER && \
    useradd -m -u $UID -g $GID -s /bin/bash $USER

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        build-essential \
        python3 \
        python3-pip \
        iputils-ping \
        && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip3 install flask

RUN chown -R $USER:$USER /app

ENV FLASK_APP=app.py

EXPOSE 8881

USER $USER

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=8881"]

