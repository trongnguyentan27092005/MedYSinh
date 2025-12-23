const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Medical knowledge base
const medicalKnowledge = {
  greetings: [
    "Hello! I'm MedYSinh, your medical health assistant. How can I help you today?",
    "Hi there! I'm here to help with your health questions. What would you like to know?",
    "Welcome to MedYSinh! How may I assist you with your health concerns?"
  ],
  symptoms: {
    headache: "For headaches, try:\n- Rest in a quiet, dark room\n- Apply a cold compress\n- Stay hydrated\n- Take over-the-counter pain relievers if needed\n\nIf headaches persist or worsen, please consult a healthcare professional.",
    fever: "For fever:\n- Rest and stay hydrated\n- Take fever-reducing medication (acetaminophen or ibuprofen)\n- Wear light clothing\n- Use a lukewarm compress\n\nSeek medical attention if fever exceeds 103°F (39.4°C) or lasts more than 3 days.",
    cough: "For cough relief:\n- Stay hydrated with warm liquids\n- Use honey (for ages 1+) to soothe throat\n- Use a humidifier\n- Avoid irritants like smoke\n\nConsult a doctor if cough persists beyond 3 weeks or is accompanied by blood.",
    "sore throat": "For sore throat:\n- Gargle with warm salt water\n- Drink warm liquids (tea with honey)\n- Use throat lozenges\n- Rest your voice\n\nSee a doctor if symptoms last more than a week or include difficulty breathing.",
    cold: "For common cold:\n- Get plenty of rest\n- Drink lots of fluids\n- Use saline nasal drops\n- Take OTC medications for symptom relief\n\nMost colds resolve in 7-10 days. See a doctor if symptoms worsen."
  },
  prevention: {
    general: "General health tips:\n- Wash hands frequently\n- Eat a balanced diet with fruits and vegetables\n- Exercise regularly (30 minutes daily)\n- Get 7-9 hours of sleep\n- Stay hydrated\n- Manage stress\n- Schedule regular check-ups",
    flu: "Flu prevention:\n- Get annual flu vaccine\n- Practice good hand hygiene\n- Avoid close contact with sick people\n- Cover coughs and sneezes\n- Stay home when sick",
    diet: "Healthy eating guidelines:\n- Include variety of fruits and vegetables\n- Choose whole grains\n- Include lean proteins\n- Limit processed foods and added sugars\n- Watch portion sizes\n- Stay hydrated with water"
  },
  emergency: "⚠️ IMPORTANT: For medical emergencies including:\n- Chest pain or pressure\n- Difficulty breathing\n- Severe bleeding\n- Loss of consciousness\n- Severe allergic reactions\n- Stroke symptoms (facial drooping, arm weakness, speech difficulty)\n\nPlease call emergency services (911) immediately or go to the nearest emergency room!"
};

// Intent recognition function
function recognizeIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greeting detection
  if (/(hello|hi|hey|greetings|good morning|good afternoon|good evening)/i.test(lowerMessage)) {
    return { type: 'greeting' };
  }
  
  // Emergency detection
  if (/(emergency|urgent|critical|chest pain|can't breathe|severe bleeding|unconscious)/i.test(lowerMessage)) {
    return { type: 'emergency' };
  }
  
  // Symptom detection
  if (/(headache|head ache|migraine)/i.test(lowerMessage)) {
    return { type: 'symptom', condition: 'headache' };
  }
  if (/(fever|temperature|hot)/i.test(lowerMessage)) {
    return { type: 'symptom', condition: 'fever' };
  }
  if (/(cough|coughing)/i.test(lowerMessage)) {
    return { type: 'symptom', condition: 'cough' };
  }
  if (/(sore throat|throat pain|throat hurt)/i.test(lowerMessage)) {
    return { type: 'symptom', condition: 'sore throat' };
  }
  if (/(cold|runny nose|stuffy nose)/i.test(lowerMessage)) {
    return { type: 'symptom', condition: 'cold' };
  }
  
  // Prevention and wellness
  if (/(prevent|prevention|avoid|stay healthy|wellness|tips)/i.test(lowerMessage)) {
    if (/(flu|influenza)/i.test(lowerMessage)) {
      return { type: 'prevention', topic: 'flu' };
    }
    if (/(diet|eating|food|nutrition)/i.test(lowerMessage)) {
      return { type: 'prevention', topic: 'diet' };
    }
    return { type: 'prevention', topic: 'general' };
  }
  
  return { type: 'unknown' };
}

// Generate response based on intent
function generateResponse(intent) {
  switch (intent.type) {
    case 'greeting':
      return medicalKnowledge.greetings[Math.floor(Math.random() * medicalKnowledge.greetings.length)];
    
    case 'emergency':
      return medicalKnowledge.emergency;
    
    case 'symptom':
      if (medicalKnowledge.symptoms[intent.condition]) {
        return medicalKnowledge.symptoms[intent.condition];
      }
      return "I understand you're experiencing symptoms. Please describe your symptoms in more detail, or consult with a healthcare professional for proper diagnosis.";
    
    case 'prevention':
      if (medicalKnowledge.prevention[intent.topic]) {
        return medicalKnowledge.prevention[intent.topic];
      }
      return medicalKnowledge.prevention.general;
    
    case 'unknown':
    default:
      return "I'm here to help with general health information. You can ask me about:\n- Common symptoms (headache, fever, cough, cold, sore throat)\n- Prevention and wellness tips\n- Healthy eating guidelines\n\n⚠️ Note: I provide general information only. For specific medical advice, please consult a healthcare professional.";
  }
}

// API endpoints
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  try {
    const intent = recognizeIntent(message);
    const response = generateResponse(intent);
    
    res.json({
      userMessage: message,
      botResponse: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MedYSinh chatbot is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`MedYSinh chatbot server is running on http://localhost:${PORT}`);
  console.log(`Open your browser and navigate to http://localhost:${PORT}`);
});
