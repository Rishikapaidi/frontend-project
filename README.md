🛠️ Service Platform Frontend
This is the frontend for a service platform application built with React, Vite, and Tailwind CSS. It supports user roles like customers and service providers, enabling registration, job management, profile editing, and job transaction tracking. It integrates with a Django backend.

📁 Components Overview
🔐 AuthForm.tsx
Handles user authentication (login & sign-up).

Built with Formik & Yup

Supports both customer and serviceProvider roles

Toggles form state between login and register

Dispatches login data to Redux

Communicates with authService.ts

🧑‍🔧 ServiceProviderForm.tsx
Form for service providers to create/manage job listings.

Title, description, price, category

Location + availability input

Schedule builder (day, start time, end time)

Contact email & phone

Service radius (miles/km)

Form validation and UI feedback on submission

💼 TransactionsPage.tsx
Displays job transactions for the logged-in user.

Tabs: pending, accepted, cancelled

Cancels pending jobs via API

Shows provider info (for accepted jobs)

Loads from /api/jobs using axios

👤 UserProfile.tsx
User profile display & edit page.

Shows profile picture, name, email, phone

Edit mode with controlled inputs

File upload for profile photo (preview)

Loads from /api/user/profile

Saves via PUT request

🧠 UserContext.tsx
Global context to manage user role across the app.

Provides userRole state (customer, provider, or null)

Used for conditional rendering or behavior

Simple and light context wrapper

⚙️ Tools & Libraries
Tool	Purpose
React	UI Framework
Vite	Fast build & dev server
Tailwind CSS	Utility-first styling framework
Formik	Form state management
Yup	Form validation schema
Axios	HTTP client for API calls
Redux Toolkit	Global state management
react-redux	Redux integration for React
@reduxjs/toolkit	Modern Redux with slices
TypeScript	(if enabled) for typed components

📦 Required Packages
Install all necessary dependencies with:

bash
Copy
Edit
npm install react react-dom axios formik yup
npm install @reduxjs/toolkit react-redux
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
🚀 Getting Started
1. Install dependencies
bash
Copy
Edit
npm install
2. Run development server
bash
Copy
Edit
npm run dev
3. Tailwind Setup Checklist
Ensure the following configurations are in place:

tailwind.config.js:

js
Copy
Edit
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
postcss.config.js:

js
Copy
Edit
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
src/styles/globals.css:

css
Copy
Edit
@tailwind base;
@tailwind components;
@tailwind utilities;
In main.jsx:

jsx
Copy
Edit
import './styles/globals.css';
📂 Project Structure
bash
Copy
Edit
src/
├── components/
│   ├── AuthForm.tsx
│   ├── ServiceProviderForm.tsx
│   ├── TransactionsPage.tsx
│   ├── UserProfile.tsx
│   └── UserContext.tsx
├── services/
│   └── authService.ts
├── slices/
│   └── authSlice.ts
📝 License
MIT

