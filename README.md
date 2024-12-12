# 🤖 Chat.ai: Intelligent Conversational AI Chatbot 🚀

## 📋 Project Overview

Chat.ai is a cutting-edge conversational AI chatbot powered by advanced language models, designed to provide intelligent and responsive interactions. This full-stack application leverages React for the frontend and Express for the backend, creating a seamless user experience.

## ✨ Features

- 💬 Real-time conversational interface
- 🌈 Elegant, responsive UI with gradient backgrounds
- 📨 Instant message sending and receiving
- 🔄 Loading indicators for smooth user experience
- 🛡️ Error handling and user feedback
- 🤖 AI-powered responses using OpenAI's language models

## 🛠️ Tech Stack

### Frontend
- React
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Express.js
- OpenAI API
- Body-Parser
- CORS
- dotenv

## 📦 Prerequisites

- Node.js (v16+ recommended)
- npm or Yarn
- OpenAI API Key

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatbot-ai.git
cd chatbot-ai
```

### 2. Setup Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend `.env`
```env
OPENAI_API_KEY=your_openai_api_key
MODEL=gpt-3.5-turbo
BASE_URL=https://api.openai.com/v1
BACKEND_PORT_NO=4000
```

#### Frontend `.env`
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

## 🔒 Configuration Options

- Adjust `maxTokens` in backend to control response length
- Modify `temperature` and `top_p` for different AI response behaviors
- Customize UI in `ChatInterface.jsx`

## 🔍 Key Components

### Frontend (`ChatInterface.jsx`)
- State management for messages
- User input handling
- API communication
- Responsive UI design

### Backend (`index.js`)
- Express server setup
- OpenAI API integration
- Error handling
- Environment configuration

## 🛡️ Error Handling

- Graceful error messages
- Console logging for debugging
- User-friendly error notifications

## 📝 Potential Improvements

- [ ] Add user authentication
- [ ] Implement message history persistence
- [ ] Support multiple AI model selections
- [ ] Add voice input/output
- [ ] Create conversation themes/personalities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - Shubham shinde
Email - shubham.shindecs25@gmail.com
Project Link: https://chat-ai-za82.vercel.app/

## 🙏 Acknowledgements

- OpenAI
- React
- Express
- Tailwind CSS

