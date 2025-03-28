import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock API call - in real app, fetch from backend
    setTimeout(() => {
      setEvent({
        id: id,
        title: 'Tech Hackathon 2023',
        type: 'hackathon',
        date: 'October 15-16, 2023',
        time: 'Starts at 9:00 AM',
        endDate: 'October 16, 2023',
        endTime: '5:00 PM',
        location: 'Innovation Hub, Main Campus',
        description: "Join us for an exciting 48-hour hackathon where you'll work in teams to build innovative solutions to real-world problems. Network with industry professionals, learn new skills, and compete for amazing prizes!",
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        organizer: 'Tech Innovation Club',
        capacity: 100,
        registered: 45,
        registrationDeadline: 'October 10, 2023',
        prizes: ['First Prize: $2000', 'Second Prize: $1000', 'Third Prize: $500', 'Best UI/UX: $300'],
        sponsors: ['TechCorp', 'Innovation Labs', 'DevStudio'],
        requirements: ['Laptop with development environment', 'Student ID', 'Basic programming knowledge'],
        schedule: [
          { day: 'Day 1', items: [
            { time: '9:00 AM', title: 'Registration & Breakfast' },
            { time: '10:00 AM', title: 'Opening Ceremony' },
            { time: '11:00 AM', title: 'Team Formation' },
            { time: '12:00 PM', title: 'Lunch' },
            { time: '1:00 PM', title: 'Hacking Begins' },
            { time: '7:00 PM', title: 'Dinner' }
          ]},
          { day: 'Day 2', items: [
            { time: '8:00 AM', title: 'Breakfast' },
            { time: '12:00 PM', title: 'Lunch' },
            { time: '1:00 PM', title: 'Last-Minute Preparations' },
            { time: '3:00 PM', title: 'Presentations Begin' },
            { time: '5:00 PM', title: 'Judging & Awards Ceremony' }
          ]}
        ],
        faq: [
          { question: 'Do I need to have a team to register?', answer: 'No, you can register individually and form teams during the event or join an existing team.' },
          { question: 'What if I\'m a beginner?', answer: 'This hackathon is open to all skill levels. We will have mentors available to help you throughout the event.' },
          { question: 'Can I start working on my project before the event?', answer: 'No, all projects must be started and developed during the hackathon to ensure fair competition.' }
        ],
        mentors: [
          { name: 'Dr. Sarah Miller', role: 'AI Research Scientist', company: 'TechCorp' },
          { name: 'John Davis', role: 'Senior Software Engineer', company: 'Innovation Labs' },
          { name: 'Alex Lee', role: 'Product Manager', company: 'DevStudio' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading event details...</div>;
  }

  return (
    <div className="event-details-container">
      <div className="event-banner" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="event-banner-overlay">
          <span className="event-type-badge">{event.type}</span>
          <h1>{event.title}</h1>
          <div className="event-meta">
            <span><i className="far fa-calendar"></i> {event.date}</span>
            <span><i className="far fa-clock"></i> {event.time}</span>
            <span><i className="far fa-map"></i> {event.location}</span>
          </div>
        </div>
      </div>

      <div className="event-registration-card">
        <div className="registration-stat">
          <span className="stat-number">{event.registered}/{event.capacity}</span>
          <span className="stat-label">Spots Filled</span>
        </div>
        <div className="registration-deadline">
          <span className="deadline-label">Registration Closes:</span>
          <span className="deadline-date">{event.registrationDeadline}</span>
        </div>
        <Link to={`/register?event=${event.id}`}>
          <button className="btn btn-primary btn-block">Register Now</button>
        </Link>
        <button className="btn btn-secondary btn-block">Add to Calendar</button>
      </div>

      <div className="event-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button 
          className={`tab-button ${activeTab === 'mentors' ? 'active' : ''}`}
          onClick={() => setActiveTab('mentors')}
        >
          Mentors
        </button>
        <button 
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      <div className="event-content">
        {activeTab === 'overview' && (
          <div className="tab-content">
            <section className="event-description">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </section>

            <section className="event-prizes">
              <h2>Prizes</h2>
              <ul className="prize-list">
                {event.prizes.map((prize, index) => (
                  <li key={index} className="prize-item">{prize}</li>
                ))}
              </ul>
            </section>

            <section className="event-requirements">
              <h2>What to Bring</h2>
              <ul>
                {event.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>

            <section className="event-sponsors">
              <h2>Sponsors</h2>
              <div className="sponsors-list">
                {event.sponsors.map((sponsor, index) => (
                  <div key={index} className="sponsor-item">{sponsor}</div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="tab-content">
            <h2>Event Schedule</h2>
            <div className="schedule-timeline">
              {event.schedule.map((day, dayIndex) => (
                <div key={dayIndex} className="schedule-day">
                  <h3>{day.day}</h3>
                  <div className="timeline">
                    {day.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="timeline-item">
                        <div className="timeline-time">{item.time}</div>
                        <div className="timeline-content">
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="tab-content">
            <h2>Meet Our Mentors</h2>
            <div className="mentors-grid">
              {event.mentors.map((mentor, index) => (
                <div key={index} className="mentor-card">
                  <div className="mentor-avatar">
                    {mentor.name.charAt(0)}
                  </div>
                  <h3>{mentor.name}</h3>
                  <p>{mentor.role}</p>
                  <p className="mentor-company">{mentor.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="tab-content">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {event.faq.map((item, index) => (
                <div key={index} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
