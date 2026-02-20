
🌱 CropShield

CropShield is an AI-powered web application designed to help farmers and agricultural enthusiasts make smarter decisions using Artificial Intelligence.

It allows users to:

🌿 Detect crop leaf diseases using AI image analysis

💰 Predict crop prices using AI

📊 View a clean and modern dashboard interface

This project is built using modern web technologies including Next.js, TypeScript, Tailwind CSS, Firebase, and Google Gemini AI (Genkit).

🚀 Features

🌾 AI-based Leaf Disease Detection

📈 Crop Price Prediction

🎨 Modern and Responsive UI

⚡ Built with Next.js 15 (App Router)

🤖 Integrated with Google Gemini AI

🔥 Firebase integration ready

🛠️ Tech Stack

Frontend: Next.js (App Router), TypeScript

Styling: Tailwind CSS

AI Integration: Google Gemini API via Genkit

Backend Services: Firebase

Package Manager: npm

📦 How To Clone and Run This Project (Beginner Friendly Guide)

Follow these steps carefully.

✅ Step 1: Install Required Software

Make sure you have the following installed:

Node.js (LTS version) → https://nodejs.org

Git → https://git-scm.com

VS Code → https://code.visualstudio.com

You can verify installation by running:

node -v
npm -v
git --version
✅ Step 2: Clone the Repository

Open Terminal (or PowerShell) and run:

git clone https://github.com/GaneshShihire/CropShield.git

Go inside the project folder:

cd CropShield

Open the project in VS Code:

code .
✅ Step 3: Install Dependencies

Inside the project folder (where package.json exists), run:

npm install

This will install all required packages.

✅ Step 4: Setup Environment Variables (Important)

This project uses Google Gemini AI.
You must create an API key before running the project.

🔹 Step 4.1: Get Gemini API Key

Go to: https://aistudio.google.com/app/apikey

Click Create API Key

Copy the generated key

🔹 Step 4.2: Create .env.local File

Inside the root project folder (same place as package.json), create a file named:

.env.local

Add the following inside the file:

GEMINI_API_KEY=your_actual_api_key_here
GOOGLE_API_KEY=your_actual_api_key_here

Replace your_actual_api_key_here with your real API key.

⚠️ Important:

Do NOT share your API key publicly

Do NOT push .env.local to GitHub

✅ Step 5: Run the Development Server

Start the development server:

npm run dev

After successful startup, open your browser and go to:

http://localhost:9002

Your CropShield app should now be running 🎉

🧠 Common Errors & Solutions
❌ Error: "Please pass in the API key or set GEMINI_API_KEY"

Solution:

Make sure .env.local is inside the project root

Restart the server after adding the API key

Ensure there is no extra package-lock.json in parent folders

❌ npm error: Cannot find package.json

Solution:

Make sure you are inside the correct folder

Run dir (Windows) or ls (Mac/Linux)

Confirm that package.json exists in that folder

❌ Port already in use

Run:

npm run dev -- -p 3001

Then open:

http://localhost:3001
📁 Project Structure
CropShield/
 ├── src/
 │    ├── ai/
 │    ├── app/
 │    ├── components/
 │    └── lib/
 ├── package.json
 ├── next.config.ts
 ├── tailwind.config.ts
 ├── tsconfig.json
 └── .env.local (created by you)
🔐 Security Notes

Never commit .env.local to GitHub

Never share your Gemini API key

Always regenerate your API key if exposed

👨‍💻 Author

Ganesh Shihire
B.Tech Computer Science Engineering
AI & Full Stack Developer

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
