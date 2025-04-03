from flask import Blueprint, jsonify
import mysql.connector

product_blueprint = Blueprint('product', __name__)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="Aditi",
        password="Aditi@0830",
        database="MarketHub"
    )

@product_blueprint.route('/products', methods=['GET'])
def get_products():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all products from the database
        cursor.execute("SELECT pName, description, price, unit, categoryName FROM Product")
        products = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(products), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
