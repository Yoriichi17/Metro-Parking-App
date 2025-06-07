![Screenshot 2024-09-23 094949](https://github.com/user-attachments/assets/725bd3e7-dd91-45fa-80a8-00012b29eb5b)
![Screenshot 2024-09-23 095111](https://github.com/user-attachments/assets/b5bb18cc-eebf-475c-8477-c56f21769514)
![Screenshot 2024-09-23 095151](https://github.com/user-attachments/assets/2ac98ad0-1032-4b1c-8de7-d6f16b8607f7)


Developed a multi-page React Native application using Expo CLI for managing vehicle registration, parking, and payments at metro stations. Key features include:
- User authentication with secure sign-up and login forms.
- Vehicle registration and parking fee calculation using MongoDB to store vehicle and parking details.
- Payment gateway integration with Razorpay for cash and QR code-based payments.
- SMS notifications using Twilio for confirmation of vehicle registration and payment.
- Dynamic search functionality for retrieving vehicle details by license plate number and calculating parking fees.
- Organized backend using Node.js and Express with clean, modular architecture.

Skills/Technologies Used:

Frontend: React Native (Expo CLI)
Backend: Node.js, Express
Database: MongoDB
Payment Integration: Razorpay
SMS Service: Twilio
Version Control: Git

🚇 Metro App - Instruction Manual

📁 Project Overview:
The Metro App manages metro parking operations. It allows vehicle registration, tracks pickup and dropoff times, calculates cost, sends SMS alerts via Twilio, and allows online payments through Razorpay.

🔧 Setup Instructions:

1. Clone the Repository:
git clone <your-repo-url>
cd metro-app

2. Backend Setup (FastAPI + MySQL + Twilio + Razorpay):
cd backend
python -m venv env
source env/bin/activate  # On Windows use: env\Scripts\activate
pip install -r requirements.txt

Create a `.env` file in the backend folder:
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_number
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
DB_URL=mysql://root:root@localhost/project

Start FastAPI server:
uvicorn main:app --reload

Ensure MySQL is running and the 'project' database exists:
CREATE DATABASE project;

3. Frontend Setup (React Native + Expo):
cd frontend
npm install
npx expo start

Use Expo Go app to scan the QR code and run the app on your mobile.

🧠 Functional Overview:

1. Vehicle Registration:
Endpoint: POST /register-vehicle
Body:
{
  "vehicleNumber": "KA01AB1234",
  "phoneNumber": "+91XXXXXXXXXX"
}
Action: Stores the vehicle and sends confirmation SMS via Twilio.

2. Add Parking Record:
Endpoint: POST /add-parking
Body:
{
  "vehicleNumber": "KA01AB1234",
  "pickupTime": "2024-06-07T09:00:00",
  "dropoffTime": "2024-06-07T11:30:00",
  "cost": 50
}

3. Send Payment Link:
Endpoint: POST /send-payment
Body:
{
  "vehicleNumber": "KA01AB1234"
}
Action: Creates Razorpay payment link and sends via SMS.

4. Confirm Payment:
Handled in PayScreen. Optionally poll Razorpay or use webhooks to confirm status.

🗃️ Database Schema:

Vehicle Table:
- id: INT
- vehicleNumber: VARCHAR
- phoneNumber: VARCHAR

Parking Table:
- id: INT
- vehicleNumber: VARCHAR
- pickupTime: DATETIME
- dropoffTime: DATETIME
- cost: FLOAT

🧪 API Testing:
- Use Postman or Thunder Client.
- Base URL: http://127.0.0.1:8000
- Test all endpoints with required JSON bodies.
- Ensure MySQL and FastAPI server are running.

🚨 Troubleshooting:

Problem                        | Solution
----------------------------- | ---------------------------------------------
SMS not sending                | Check Twilio credentials and verified numbers
Payment link not sending       | Check Razorpay credentials, sandbox/live mode
Database connection error      | Verify MySQL service and DB_URL in `.env`
Expo app not loading           | Ensure same WiFi network, or try emulator
.env changes not working       | Restart server after updating .env

✅ You're all set!
