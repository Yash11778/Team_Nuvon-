import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm Nuvon Assistant. How can I help you with event registration?", 
      sender: 'bot' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = "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"; // Replace with your actual API key
  
  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to chat
    const userMessage = { id: messages.length + 1, text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    try {
      // In a real implementation, replace this with your actual API call
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: "gpt-3.5-turbo",
      //     messages: [
      //       { role: "system", content: "You are an event registration assistant for Nuvon events. You help users with information about events, registration process, and troubleshooting. Keep responses friendly and concise." },
      //       { role: "user", content: inputText }
      //     ]
      //   })
      // });
      
      // const data = await response.json();
      // const botReply = data.choices[0].message.content;
      
      // For demo purposes, simulate API response with canned responses
      let botReply = getBotResponse(inputText);
      
      // Add bot reply
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: botReply, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        sender: 'bot' 
      }]);
      setIsTyping(false);
    }
  };
  
  // Simple function to generate canned responses for demo purposes
  const getBotResponse = (input) => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('register') || inputLower.includes('sign up')) {
      return "To register for an event, go to the Events page, select your desired event, and click on the 'Register' button. You'll need to create an account if you don't already have one.";
    } else if (inputLower.includes('ticket') || inputLower.includes('qr code')) {
      return "After registration, you'll receive a confirmation email with your ticket. You can also view your ticket in the 'My Tickets' section of your account. Each ticket includes a unique QR code for check-in.";
    } else if (inputLower.includes('cancel') || inputLower.includes('refund')) {
      return "To cancel your registration, please go to 'My Registrations' in your account and select the event you wish to cancel. Refund policies vary by event, so check the event details for specific information.";
    } else if (inputLower.includes('hello') || inputLower.includes('hi')) {
      return "Hello! How can I assist you with Nuvon's event registration today?";
    } else if (inputLower.includes('hackathon')) {
      return "Our hackathons typically run for 24-48 hours. You can register individually or as a team. Make sure to check the specific hackathon requirements for team size and submission guidelines.";
    } else if (inputLower.includes('workshop')) {
      return "Workshops are hands-on learning experiences led by industry experts. Most workshops provide materials in advance, and you'll generally need to bring your own laptop.";
    } else if (inputLower.includes('payment') || inputLower.includes('cost')) {
      return "Payment methods include credit/debit cards and PayPal. Some events offer early bird discounts or student rates. Check the specific event for pricing details.";
    } else {
      return "I'm not sure I understand. Could you rephrase your question? I can help with registration, tickets, event details, or technical support.";
    }
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? (
          <i className="fas fa-times"></i>
        ) : (
          <>
            <i className="fas fa-comment-dots"></i>
            <span className="chat-tooltip">Need help?</span>
          </>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <i className="fas fa-robot"></i>
              <h3>Nuvon Assistant</h3>
            </div>
            <button 
              className="chatbot-close" 
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`chat-message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="bot-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="bot-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
          
          <div className="chatbot-footer">
            <p>Powered by Nuvon AI</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
