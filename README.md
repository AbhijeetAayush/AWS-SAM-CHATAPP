
# Chat-App-Abhi: Real-Time WebSocket Chat

![Chat-App-Abhi](https://your-image-url.com/banner.png)

Welcome to **Chat-App-Abhi**, a real-time chat application powered by **AWS WebSocket API** and a modern frontend! 🚀 Whether you're chatting with friends or exploring WebSocket magic, this project delivers seamless messaging with a polished UI.

🔗 **Live Demo:** [Chat-App-Abhi](https://chat-app-abhi.netlify.app) *(Update this with your actual Netlify URL!)*

---

## ✨ Features
✅ **Real-Time Messaging**: Instantly send and receive messages across tabs.  
🎨 **Unique User Colors**: Each user gets a distinct color based on their connectionId.  
🖥️ **Modern UI**: Beautiful speech bubbles, avatars, and a clean responsive design.  
☁️ **Scalable Backend**: Built using AWS API Gateway WebSocket, Lambda, and DynamoDB.  
🚀 **Easy Deployment**: Frontend on Netlify, backend via AWS SAM.

---

## 📂 Project Structure
```
chat-app-abhi/
├── hello-world/       # Backend Lambda functions
│   ├── connect.ts     # Handles WebSocket connections
│   ├── disconnect.ts  # Cleans up disconnected users
│   └── sendMessage.ts # Broadcasts messages
├── test/              # Frontend
│   └── index.html     # Chat UI
├── template.yaml      # AWS SAM configuration
└── README.md          # This file
```

---

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AbhijeetAayush/chat-app-abhi.git
cd chat-app-abhi
```

### 2️⃣ Set Up Backend (AWS)
Install dependencies:
```bash
cd hello-world
npm install
cd ..
```
Build and deploy:
```bash
sam deploy --guided
```
Update WebSocket URL in `test/index.html`:
```javascript
const ws = new WebSocket("wss://<your-id>.execute-api.us-east-1.amazonaws.com/Prod");
```

### 3️⃣ Run Locally
Serve frontend:
```bash
cd test
python3 -m http.server 8000
```
Test it at [localhost:8000](http://localhost:8000).

---

## 🌍 Deployment
### Deploy Frontend to Netlify
```bash
netlify deploy --prod
```
Alternatively, drag the `test` folder to Netlify's deploy area.

### Deploy Backend to AWS
If backend setup was followed, it's already deployed! Check your AWS SAM stack for the WebSocket URL.

---

## 🛠 Troubleshooting
🚨 **Messages Not Showing?**
- Ensure WebSocket URL is correct in `index.html`.
- Check browser console (`Cmd+Option+J` or `Ctrl+Shift+J`).

🔄 **Netlify 404?**
- Use `/index.html` in the URL.

📜 **Backend Issues?**
Check logs:
```bash
aws logs filter-log-events --log-group-name /aws/lambda/chat-app-abhi-SendMessageFunction
```

---

## 🤝 Contributing
Love this project? Here's how to contribute:
1. **Fork the repo**
2. **Create a branch**: `git checkout -b my-feature`
3. **Commit changes**: `git commit -m "Added cool feature"`
4. **Push to GitHub**: `git push origin my-feature`
5. **Open a Pull Request**

🔹 **Ideas for Enhancement**:
- Usernames instead of connectionId.
- Store chat history in DynamoDB.
- Add emojis or file-sharing.

---

## 📜 License
This project is open-source under the **MIT License**. Feel free to use, modify, and share!

### 🏆 Acknowledgments
🚀 Built with ❤️ by [Abhijeet Aayush]  
⚡ Powered by **AWS SAM, Netlify, and WebSocket magic**!

---

🎯 **Ready to Chat?** Deploy it, share the URL, and let's talk in real time! 💬

