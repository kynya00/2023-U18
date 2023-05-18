from flask import Flask, render_template, request 
import subprocess 

app = Flask(__name__)

blacklist: list = [' ', ';', '&', '`', '(', ')', '<', '>', '\\', '\n', '\r', '\t']

def filter(inp: str) -> bool:
  for _ in inp: 
    if _ in blacklist: 
      return False 
  return True 


@app.route('/')
def index():
  return render_template('./index.html')

@app.route('/ping', methods=['POST'])
def ping():
  ip_address = request.form['ip_address']

  if (filter(ip_address)):
    cmd = "ping -c 1 %s" % ip_address
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    out, err = process.communicate()
    return render_template('ping.html', ip_address=ip_address, ping_output=out.decode('utf-8'))
  else:
    res = 'Hacking attempt detected!\nU cant use these characters:\n' + str(blacklist)
    
    return render_template('ping.html', ip_address=ip_address, ping_output=res)

if __name__ == '__main__':
  app.run(debug=True)
