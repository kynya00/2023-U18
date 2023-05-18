if [ $# -eq 0 ]
  then
    IP="127.0.0.1" 
else
    IP=$1
fi

docker build -t ubuntu .
docker run -d  -i -p $IP:9191:9191 -w /home ubuntu sh ./run.sh 