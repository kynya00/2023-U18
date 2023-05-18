from flask import Flask, render_template, request 
import subprocess 
import re 

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('./index.html')

@app.route('/ping', methods=['POST'])
def ping():
  ip_address = request.form['ip_address']
  cmd = "ping -c 1 %s" % ip_address
  process = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
  out, err = process.communicate()
  return render_template('ping.html', ip_address=ip_address, ping_output=out.decode('utf-8'))

if __name__ == '__main__':
  app.run(debug=True)
