from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import json
import os

app = Flask(__name__)
CORS(app)

def parse_maigret_output(output):
    try:
        return json.loads(output)
    except json.JSONDecodeError:
        # Fallback for when JSON parsing fails
        results = {}
        for line in output.split('\n'):
            if '[+]' in line:
                parts = line.split('[+]')[1].strip().split(':')
                if len(parts) >= 2:
                    site = parts[0].strip()
                    url = ':'.join(parts[1:]).strip()
                    results[site] = {'url': url}
        return results

@app.route('/search', methods=['GET'])
def search_username():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    try:
        result = subprocess.run(
            ['maigret', username, '--json', 'simple', '--timeout', '5', '--no-color', '--no-progressbar'],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            raise Exception(result.stderr.strip() or "Maigret failed")

        data = parse_maigret_output(result.stdout)

        if not data:
            raise Exception("No valid results found in Maigret output")

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Only needed when running locally
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

@app.route('/')
def home():
    return jsonify({'message': 'API is running! Use /search?username=...'})
