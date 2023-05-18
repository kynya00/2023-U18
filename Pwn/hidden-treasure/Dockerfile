FROM ubuntu:20.04

ENV USER ctfuser 
WORKDIR /home/$USER

RUN useradd $USER
RUN apt-get update 
RUN apt-get install -y xinetd
RUN apt-get install -y build-essential
RUN apt-get install -y gcc-multilib

COPY hidden_treasure.xinetd /etc/xinetd.d/hidden_treasure
COPY src/hidden_treasure.c /home/$USER/
COPY src/Makefile /home/$USER/
COPY flag.txt /home/$USER/

RUN make -C /home/$USER/

RUN chown -R root:$USER /home/$USER
RUN chmod -R 550 /home/$USER
RUN chmod +r /home/$USER/flag.txt

EXPOSE 13331

CMD service xinetd start && sleep 2 && tail -f /var/log/xinetdlog
