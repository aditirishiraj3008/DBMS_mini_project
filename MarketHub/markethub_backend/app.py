from flask import Flask, render_template
from flask_cors import CORS
from routes.auth_routes import auth_blueprint
from routes.product_routes import product_blueprint

app = Flask(__name__)

app.secret_key = "Shanu@04082005"

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(product_blueprint, url_prefix='/')

# Serve product page
@app.route('/products')
def products():
    return render_template("products.html")

if __name__ == '__main__':
    app.run(debug=True)
