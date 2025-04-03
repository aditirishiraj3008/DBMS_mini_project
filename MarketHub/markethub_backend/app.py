from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_blueprint

# Initialize Flask App
app = Flask(__name__)

app.secret_key = "Shanu@04082005"

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')

# Test Route
@app.route('/')
def home():
    return {"message": "Server is running!"}, 200
if __name__ == '__main__':
    app.run(debug=True)
