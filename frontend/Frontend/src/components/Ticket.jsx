import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const Ticket = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the ticket data from your backend
    setTimeout(() => {
      setTicketData({
        id: id,
        name: 'Test User',
        email: 'test@example.com',
        eventName: 'Tech Conference 2023',
        eventDate: 'October 15, 2023',
        eventLocation: 'Tech Center, Main Hall',
        ticketType: 'Standard Entry'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    // In a real app, you would generate a PDF ticket for download
    alert('Ticket download functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Event Ticket',
        text: `Check out my ticket for ${ticketData.eventName}!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };

  if (loading) {
    return <div>Loading your ticket...</div>;
  }

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>Event Ticket</h1>
      </div>
      
      <div className="ticket-body">
        <h2>{ticketData.eventName}</h2>
        <p><strong>Attendee:</strong> {ticketData.name}</p>
        <p><strong>Date:</strong> {ticketData.eventDate}</p>
        <p><strong>Location:</strong> {ticketData.eventLocation}</p>
        <p><strong>Ticket ID:</strong> {ticketData.id}</p>
        <p><strong>Ticket Type:</strong> {ticketData.ticketType}</p>
        
        <div className="ticket-qr">
          <QRCode 
            value={JSON.stringify({
              id: ticketData.id,
              name: ticketData.name,
              email: ticketData.email,
              event: ticketData.eventName
            })} 
            size={180}
          />
          <p>Scan this QR code at the event entrance</p>
        </div>
        
        <div className="ticket-actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            Download Ticket
          </button>
          <button className="btn" onClick={handleShare}>
            Share Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
