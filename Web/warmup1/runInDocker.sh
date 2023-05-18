if [ $# -eq 0 ]
  then
    IP="127.0.0.1" 
else
    IP=$1
fi

docker build -t warmup1 .
docker run -d  -i -p $IP:9292:9292 -w /home warmup1 sh ./run.sh 