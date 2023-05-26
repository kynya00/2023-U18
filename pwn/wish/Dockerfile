FROM ubuntu:20.04

ENV USER ctfuser 
WORKDIR /home/$USER

RUN useradd $USER
RUN apt-get update 
RUN apt-get install -y xinetd
RUN apt-get install -y build-essential
RUN apt-get install -y gcc-multilib

COPY wish.xinetd /etc/xinetd.d/wish
COPY src/wish.c /home/$USER/
COPY src/Makefile /home/$USER/
COPY flag.txt /home/$USER/
COPY secret.txt /

RUN make -C /home/$USER/

RUN rm wish.c 
RUN chown -R root:$USER /home/$USER
RUN chmod -R 550 /home/$USER
RUN chmod +r /home/$USER/flag.txt
RUN chmod +r /secret.txt

EXPOSE 13332

CMD service xinetd start && sleep 2 && tail -f /var/log/xinetdlog