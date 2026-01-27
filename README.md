# 🍳 FridgeChef AI

**Cook with what you have.**
FridgeChef AI helps you reduce food waste by analyzing photos of your fridge and suggesting delicious recipes based on the ingredients you already have.

![FridgeChef AI](frontend/public/logo.svg)

## ✨ Features

- **📸 AI-Powered Analysis**: Upload a photo or use your camera to scan your fridge ingredients.
- **🥘 Smart Recipe Suggestions**: Get custom recipes tailored to your available ingredients.
- **⏱️ Dynamic Details**: See cooking times and difficulty levels for every suggestion.
- **📝 Shopping Lists**: Get suggestions for missing items to complete your meals.
- **🌗 Dark Mode**: Beautiful and responsive UI with light/dark theme support.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, HeroUI
- **Backend**: Go (Golang)
- **AI**: Google Gemini 2.0 Flash
- **Monorepo**: Turbo, pnpm

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **pnpm** (v9+)
- **Go** (v1.21+)
- **Gemini API Key** (Create a `.env` file in `backend/` with `GEMINI_API_KEY=your_key`)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/fridge-chef.git
    cd fridge-chef
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```bash
    # backend/.env
    GEMINI_API_KEY=your_google_gemini_api_key
    PORT=8080
    ```

### 🏃‍♂️ Running the App

Start both the frontend and backend with a single command:

```bash
pnpm dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

## 📸 Screenshots

*(Add screenshots of your app here)*

## 📄 License

MIT
