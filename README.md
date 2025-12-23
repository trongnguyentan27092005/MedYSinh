# MedYSinh - Medical Health Chatbot 🏥

MedYSinh is an intelligent medical health chatbot designed to provide general health information, symptom guidance, and wellness tips. The chatbot uses natural language processing to understand user queries and provide helpful responses.

## ⚠️ Disclaimer

This chatbot provides **general health information only** and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. In case of emergency, call 911 or visit your nearest emergency room.

## Features

- 💬 **Interactive Chat Interface** - User-friendly web interface for natural conversations
- 🤖 **Intelligent Response System** - Natural language processing for understanding health queries
- 🏥 **Medical Knowledge Base** - Information about common symptoms and remedies
- 💊 **Symptom Guidance** - Advice for common conditions like headaches, fever, cough, cold, and sore throat
- 🛡️ **Prevention Tips** - Guidelines for flu prevention, healthy eating, and general wellness
- 🚨 **Emergency Detection** - Recognizes emergency keywords and provides critical guidance
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/trongnguyentan27092005/MedYSinh.git
cd MedYSinh
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Starting a Conversation

The chatbot will greet you with a welcome message. You can:

1. **Type your question** in the input field and press Enter or click the send button
2. **Use quick questions** by clicking the pre-defined buttons below the chat

### Example Questions

- "Hello" - Greet the chatbot
- "I have a headache" - Get advice for headache relief
- "I have a fever" - Learn about fever management
- "How can I prevent flu?" - Get flu prevention tips
- "Give me healthy eating tips" - Receive nutrition guidance

### What the Chatbot Can Help With

✅ Common symptoms (headache, fever, cough, cold, sore throat)
✅ Home remedies and self-care tips
✅ Prevention and wellness guidance
✅ Healthy lifestyle recommendations
✅ Emergency situation recognition

❌ It cannot provide diagnoses
❌ It cannot prescribe medications
❌ It cannot replace professional medical care

## Technical Details

### Project Structure

```
MedYSinh/
├── server.js           # Backend Express server with chatbot logic
├── package.json        # Node.js dependencies and scripts
├── public/             # Frontend files
│   ├── index.html      # Main HTML page
│   ├── styles.css      # CSS styling
│   └── app.js          # Frontend JavaScript
└── README.md           # This file
```

### API Endpoints

#### POST /api/chat
Send a message to the chatbot and receive a response.

**Request:**
```json
{
  "message": "I have a headache"
}
```

**Response:**
```json
{
  "userMessage": "I have a headache",
  "botResponse": "For headaches, try:\n- Rest in a quiet, dark room\n- Apply a cold compress\n- Stay hydrated\n- Take over-the-counter pain relievers if needed\n\nIf headaches persist or worsen, please consult a healthcare professional.",
  "timestamp": "2025-12-23T10:00:00.000Z"
}
```

#### GET /api/health
Check server health status.

**Response:**
```json
{
  "status": "ok",
  "message": "MedYSinh chatbot is running"
}
```

### Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** RESTful JSON API
- **Natural Language Processing:** Pattern matching and intent recognition

## Development

### Running in Development Mode

```bash
npm run dev
```

### Extending the Knowledge Base

To add more medical information, edit the `medicalKnowledge` object in `server.js`:

```javascript
const medicalKnowledge = {
  symptoms: {
    // Add new symptom
    "your-symptom": "Your advice here..."
  },
  prevention: {
    // Add new prevention topic
    "your-topic": "Your prevention tips here..."
  }
};
```

Then update the `recognizeIntent` function to detect the new patterns.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For questions or issues, please open an issue on GitHub.

---

**Remember:** This is a general information tool. Always consult healthcare professionals for medical advice.
