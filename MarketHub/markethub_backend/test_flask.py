import requests

BASE_URL = "http://127.0.0.1:5000"

# Signup Request
def test_signup():
    data = {
        "userID": "C001",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phoneNo": "9998887771",
        "password": "pass123",
        "role": "customer"
    }
    response = requests.post(f"{BASE_URL}/signup", json=data)
    print("Signup Response:", response.json())

# Login Request
def test_login():
    data = {
        "email": "johndoe@example.com",
        "password": "pass123",
        "role": "customer"
    }
    response = requests.post(f"{BASE_URL}/login", json=data)
    print("Login Response:", response.json())

# Run Tests
if __name__ == "__main__":
    test_signup()
    test_login()
