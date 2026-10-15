# 🎓 Student Portfolio Builder

A web-based application that helps students create and manage professional portfolios to showcase their skills, projects, education, and achievements in one place.

## 📌 About the Project

The **Student Portfolio Builder** is designed to help students build an attractive online portfolio that highlights their academic background, technical skills, and personal projects. It provides a structured way to present information that can be shared with recruiters, employers, and others.

## ✨ Features

- 🔐 **User Authentication** – Secure login and registration pages.
- 📊 **Dashboard** – Manage portfolio information through a dashboard.
- 🧑‍💻 **Portfolio Creation** – Build a personalized student portfolio.
- 🎨 **Portfolio Templates** – Choose from multiple portfolio templates.
- 📄 **PDF Generation** – Generate PDF versions of portfolios.
- 📱 **Responsive Design** – User-friendly interface for different screen sizes.

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript, EJS
- **Styling:** Tailwind CSS
- **Package Management:** npm
- **PDF Generation:** HTML-to-PDF functionality

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Drashti060/student-portfolio
```

### 2. Navigate to the Project Folder

```bash
cd Student-Portfolio-Builder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the environment variables required by the application.

Example:

```env
PORT=3000
```

Add any additional variables required by your project. Do not upload your `.env` file to GitHub.

### 5. Start the Application

Use the start command defined in your `package.json`. For example:

```bash
npm start
```

If your project does not have a start script, you can run:

```bash
node server.js
```

### 6. Open in Your Browser

Visit:

```text
http://localhost:3000
```

Use the port configured by your application if it differs from `3000`.

## 📁 Project Structure

```text
Student-Portfolio-Builder/
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── views/
│   ├── auth/
│   ├── dashboard/
│   ├── partials/
│   └── templates/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 🎯 Project Objective

The main objective of this project is to simplify portfolio creation for students by providing a convenient platform to organize and present their academic and professional accomplishments.

## 🚀 Future Enhancements

- More customizable portfolio templates
- Additional profile and project sections
- Portfolio sharing through public links
- Improved mobile experience
- Additional export and download options

GitHub: Drashti060
---

*Student Portfolio Builder — Showcase your skills, projects, and achievements in one place.*

