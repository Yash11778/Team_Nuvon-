import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    contentRating: 0,
    organizationRating: 0,
    speakersRating: 0,
    venueRating: 0,
    likedMost: '',
    improvements: '',
    wouldRecommend: '',
    additionalComments: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  // Mock event details (in a real app, fetch from API)
  const eventDetails = {
    id: eventId || '1',
    name: 'Tech Hackathon 2023',
    date: 'October 15-16, 2023'
  };
  
  const handleRatingChange = (field, rating) => {
    setFeedback({
      ...feedback,
      [field]: rating
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // In a real app, you would send this data to your backend
    console.log('Submitting feedback:', feedback);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert('Thank you for your feedback!');
      navigate('/events');
    }, 1500);
  };
  
  const renderStars = (field, label) => {
    return (
      <div className="rating-field">
        <label>{label}</label>
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`rating-star ${star <= feedback[field] ? 'active' : ''}`}
              onClick={() => handleRatingChange(field, star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Event Feedback</h1>
        <p>For: {eventDetails.name} ({eventDetails.date})</p>
      </div>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-section">
          <h2>Ratings</h2>
          {renderStars('overallRating', 'Overall Experience *')}
          {renderStars('contentRating', 'Event Content')}
          {renderStars('organizationRating', 'Event Organization')}
          {renderStars('speakersRating', 'Speakers/Mentors')}
          {renderStars('venueRating', 'Venue & Facilities')}
        </div>
        
        <div className="feedback-section">
          <h2>Your Thoughts</h2>
          
          <div className="form-group">
            <label htmlFor="likedMost">What did you like most about the event?</label>
            <textarea
              id="likedMost"
              name="likedMost"
              className="form-control"
              value={feedback.likedMost}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="improvements">What could be improved for future events?</label>
            <textarea
              id="improvements"
              name="improvements"
              className="form-control"
              value={feedback.improvements}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="wouldRecommend">Would you recommend this event to others?</label>
            <select
              id="wouldRecommend"
              name="wouldRecommend"
              className="form-control"
              value={feedback.wouldRecommend}
              onChange={handleInputChange}
            >
              <option value="">-- Select an option --</option>
              <option value="definitely">Definitely</option>
              <option value="probably">Probably</option>
              <option value="not-sure">Not Sure</option>
              <option value="probably-not">Probably Not</option>
              <option value="definitely-not">Definitely Not</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalComments">Any additional comments?</label>
            <textarea
              id="additionalComments"
              name="additionalComments"
              className="form-control"
              value={feedback.additionalComments}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
        </div>
        
        <div className="form-submit">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || feedback.overallRating === 0}
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
