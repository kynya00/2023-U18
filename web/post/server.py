from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='template')

# Serve the index.html file for GET requests
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# Handle POST requests and return flag
@app.route('/', methods=['POST'])
def post_data():
    
    data = {'flag': "HZU18{I_hope_This_letter_finds_you_in_good_health_and_high_$pirits}"}

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')