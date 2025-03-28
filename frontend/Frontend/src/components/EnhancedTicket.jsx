import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';

const EnhancedTicket = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the ticket data from your backend
    setTimeout(() => {
      setTicketData({
        id: id,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        eventName: 'Tech Hackathon 2023',
        eventType: 'hackathon',
        eventDate: 'October 15-16, 2023',
        eventTime: 'Starts at 9:00 AM',
        eventLocation: 'Innovation Hub, Main Campus',
        ticketType: 'Participant',
        ticketStatus: 'valid',
        team: 'Code Wizards',
        additionalInfo: {
          qrValidUntil: 'October 16, 2023, 5:00 PM',
          entryInstructions: 'Please arrive 30 minutes before the event starts for check-in',
          parkingInfo: 'Free parking available in Lot B',
          dietaryPreference: 'Vegetarian',
          emergencyContact: 'Jane Johnson - 555-123-4567'
        },
        upcomingReminders: [
          { date: 'October 14, 2023', time: '6:00 PM', message: 'Don\'t forget to bring your laptop and charger!' },
          { date: 'October 15, 2023', time: '8:00 AM', message: 'Hackathon starts in 1 hour!' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    // Implementation would generate a PDF ticket
    alert('Ticket download functionality would be implemented here');
  };

  const handleAddToWallet = () => {
    alert('Add to Apple Wallet/Google Pay functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Ticket for ${ticketData.eventName}`,
        text: `I'm attending ${ticketData.eventName} on ${ticketData.eventDate}!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };

  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
  };

  if (loading) {
    return <div className="loading-container">Loading your ticket...</div>;
  }

  return (
    <div className="enhanced-ticket-container">
      <div className="ticket-header">
        <div className="ticket-event-type">{ticketData.eventType}</div>
        <h1>{ticketData.eventName}</h1>
      </div>
      
      <div className="ticket-body">
        <div className="ticket-columns">
          <div className="ticket-info-column">
            <div className="ticket-badge">
              <span className={`ticket-status ${ticketData.ticketStatus === 'valid' ? 'ticket-valid' : 'ticket-expired'}`}>
                {ticketData.ticketStatus === 'valid' ? 'Valid' : 'Expired'}
              </span>
            </div>
            
            <div className="ticket-details">
              <div className="ticket-details-row">
                <span className="detail-label">Attendee</span>
                <span className="detail-value">{ticketData.name}</span>
              </div>
              <div className="ticket-details-row">
                <span className="detail-label">Ticket Type</span>
                <span className="detail-value">{ticketData.ticketType}</span>
              </div>
              {ticketData.team && (
                <div className="ticket-details-row">
                  <span className="detail-label">Team</span>
                  <span className="detail-value">{ticketData.team}</span>
                </div>
              )}
              <div className="ticket-details-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{ticketData.eventDate}</span>
              </div>
              <div className="ticket-details-row">
                <span className="detail-label">Time</span>
                <span className="detail-value">{ticketData.eventTime}</span>
              </div>
              <div className="ticket-details-row">
                <span className="detail-label">Location</span>
                <span className="detail-value">{ticketData.eventLocation}</span>
              </div>
              <div className="ticket-details-row">
                <span className="detail-label">Ticket ID</span>
                <span className="detail-value">{ticketData.id}</span>
              </div>
            </div>
            
            <div className="ticket-additional-info">
              <h3>Important Information</h3>
              <p><strong>Entry Instructions:</strong> {ticketData.additionalInfo.entryInstructions}</p>
              <p><strong>Parking:</strong> {ticketData.additionalInfo.parkingInfo}</p>
              {ticketData.additionalInfo.dietaryPreference && (
                <p><strong>Dietary Preference:</strong> {ticketData.additionalInfo.dietaryPreference}</p>
              )}
            </div>
          </div>
          
          <div className="ticket-qr-column">
            <div className="ticket-qr-wrapper">
              <QRCode 
                value={JSON.stringify({
                  id: ticketData.id,
                  name: ticketData.name,
                  email: ticketData.email,
                  event: ticketData.eventName,
                  type: ticketData.ticketType,
                  team: ticketData.team
                })} 
                size={200}
                level="H"
              />
              <p className="qr-instruction">Scan this QR code at the event entrance</p>
              <p className="qr-validity">Valid until: {ticketData.additionalInfo.qrValidUntil}</p>
            </div>
          </div>
        </div>
        
        {ticketData.upcomingReminders && ticketData.upcomingReminders.length > 0 && (
          <div className="ticket-reminders">
            <div className="reminder-header">
              <h3>Upcoming Reminders</h3>
              <label className="reminder-toggle">
                <input 
                  type="checkbox" 
                  checked={remindersEnabled} 
                  onChange={toggleReminders}
                />
                <span className="toggle-label">Notifications {remindersEnabled ? 'On' : 'Off'}</span>
              </label>
            </div>
            
            {remindersEnabled && (
              <div className="reminder-list">
                {ticketData.upcomingReminders.map((reminder, index) => (
                  <div key={index} className="ticket-reminder">
                    <div className="reminder-icon">🔔</div>
                    <div className="reminder-content">
                      <div className="reminder-datetime">
                        {reminder.date} at {reminder.time}
                      </div>
                      <div className="reminder-message">{reminder.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="ticket-actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            Download Ticket
          </button>
          <button className="btn btn-secondary" onClick={handleAddToWallet}>
            Add to Wallet
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            Share Ticket
          </button>
        </div>
        
        <div className="ticket-navigation">
          <Link to="/events" className="nav-link">
            View Event Details
          </Link>
          <Link to="/feedback" className="nav-link">
            Submit Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTicket;
