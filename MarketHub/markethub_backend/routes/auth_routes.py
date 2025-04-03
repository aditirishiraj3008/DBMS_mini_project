from flask import Blueprint, request, jsonify
import mysql.connector

auth_blueprint = Blueprint('auth', __name__)

# ----------------------- DATABASE CONNECTION -----------------------
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="Shanu48",
        password="Shanu@123",
        database="MarketHub"
    )

# ----------------------- USER ID GENERATION FUNCTION -----------------------
def generate_user_id(role):
    conn = get_db_connection()
    cursor = conn.cursor()

    table = "Supplier" if role.lower() == "supplier" else "Customer"
    prefix = "S" if role.lower() == "supplier" else "C"

    cursor.execute(f"SELECT userID FROM {table} ORDER BY userID DESC LIMIT 1")
    last_id = cursor.fetchone()

    new_number = int(last_id[0][1:]) + 1 if last_id else 1
    new_user_id = f"{prefix}{new_number:03}"  # Format: 'S001', 'C002'

    cursor.close()
    conn.close()
    return new_user_id

# ----------------------- SIGNUP ROUTE -----------------------
@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    name, phone, email, password, role = data.get('name'), data.get('phone'), data.get('email'), data.get('password'), data.get('role')

    if not all([name, phone, email, password, role]):
        return jsonify({"error": "All fields are required"}), 400

    user_id = generate_user_id(role)

    # Determine the correct table and name column
    if role.lower() == "supplier":
        table, name_column = "Supplier", "sName"
    else:
        table, name_column = "Customer", "cName"

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # ✅ Step 1: Insert into User table (only userID & password)
        cursor.execute("INSERT INTO User (userID, password) VALUES (%s, %s)", (user_id, password))

        # ✅ Step 2: Insert into Supplier or Customer table
        cursor.execute(f"INSERT INTO {table} (userID, {name_column}, email, phoneNo) VALUES (%s, %s, %s, %s)", 
                       (user_id, name, email, phone))

        conn.commit()
        return jsonify({"message": "Signup successful", "userID": user_id}), 201
    except mysql.connector.Error as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()



# ----------------------- LOGIN ROUTE -----------------------
@auth_blueprint.route('/login', methods=['POST'])
def login():
    print("\n🔹 [Login] Route Accessed")

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        print("❌ [Login] Missing Fields!")
        return jsonify({"error": "Email and password are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Check if the email exists in Supplier
        cursor.execute("SELECT userID FROM Supplier WHERE email = %s", (email,))
        supplier = cursor.fetchone()

        if supplier:
            user_id = supplier[0]
            role = "Supplier"
        else:
            # Ensure the previous result is read before a new query
            cursor.fetchall()  

            # Check if the email exists in Customer
            cursor.execute("SELECT userID FROM Customer WHERE email = %s", (email,))
            customer = cursor.fetchone()
            
            if customer:
                user_id = customer[0]
                role = "Customer"
            else:
                cursor.fetchall()  # Ensure all results are read
                print("❌ [Login] Email not found!")
                return jsonify({"error": "Invalid email or password"}), 401

        # Ensure the previous result is read before a new query
        cursor.fetchall()  

        # Verify password from User table
        cursor.execute("SELECT password FROM User WHERE userID = %s", (user_id,))
        user = cursor.fetchone()

        if user and user[0] == password:
            print(f"✅ [Login] {role} Login Successful!")
            return jsonify({"message": "Login successful", "role": role}), 200
        else:
            print("❌ [Login] Incorrect Password!")
            return jsonify({"error": "Invalid email or password"}), 401

    finally:
        cursor.close()
        conn.close()



# ----------------------- TEST ROUTE -----------------------
@auth_blueprint.route('/test', methods=['POST'])
def test():
    return jsonify({"message": "Test successful!"}), 200
