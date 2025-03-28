import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateEvents, setAnimateEvents] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  
  useEffect(() => {
    // Trigger animations on component mount with a slight delay
    setAnimateHero(true);
    
    const eventsTimer = setTimeout(() => setAnimateEvents(true), 400);
    const statsTimer = setTimeout(() => setAnimateStats(true), 800);
    
    return () => {
      clearTimeout(eventsTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Hackathon 2023",
      date: "October 15-16, 2023",
      description: "48 hours of coding, innovation, and fun. Build solutions that matter.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "hackathon"
    },
    {
      id: 6,
      title: "Web Development Masterclass",
      date: "September 25, 2023",
      description: "Learn modern web development techniques from expert developers.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "workshop"
    },
    {
      id: 11,
      title: "Competitive Programming Challenge",
      date: "October 22, 2023",
      description: "Test your algorithm skills with challenging programming problems.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "coding-contest"
    },
    {
      id: 15,
      title: "Startup Pitch Night",
      date: "October 30, 2023",
      description: "Present your business idea to investors and industry leaders.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      type: "startup-pitch"
    }
  ];

  const stats = [
    { number: "10K+", label: "Attendees" },
    { number: "50+", label: "Events" },
    { number: "24/7", label: "Support" },
    { number: "100%", label: "Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      content: "Nuvon's event platform made our conference registration seamless. The customizable forms and automated emails saved us countless hours of work."
    },
    {
      name: "Michael Chen",
      role: "Event Coordinator",
      company: "Innovate Labs",
      content: "The QR code check-in feature transformed our entry process. No more long lines or lost tickets. Highly recommended for any event organizer!"
    }
  ];

  return (
    <div className="home-container">
      <section className={`hero-section ${animateHero ? 'animate-fade-in' : ''}`}>
        <div className="hero-content">
          <div className="company-logo">
            <span className="logo-text">Nuvon</span>
            <span className="logo-dot"></span>
          </div>
          
          <h1>Seamless Event Experience</h1>
          <p>Discover, register, and attend events with our all-in-one registration platform. Powered by Nuvon's advanced technology.</p>
          
          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn btn-primary pulse-animation">Register Now</button>
            </Link>
            <Link to="/events">
              <button className="btn btn-outline">Explore Events</button>
            </Link>
          </div>
          
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hero-illustration">
          <div className="illustration-container">
            <div className="rotating-circles"></div>
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Event registration" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="event-types-section">
        <h2>Event Categories</h2>
        <div className="event-types-grid">
          <div className="event-type-card">
            <div className="event-type-icon">🚀</div>
            <h3>Hackathons</h3>
            <p>Build innovative solutions in team competitions</p>
            <Link to="/events?type=hackathon">Explore</Link>
          </div>
          <div className="event-type-card">
            <div className="event-type-icon">💻</div>
            <h3>Workshops</h3>
            <p>Skill-building sessions with industry experts</p>
            <Link to="/events?type=workshop">Explore</Link>
          </div>
          <div className="event-type-card">
            <div className="event-type-icon">🏆</div>
            <h3>Coding Contests</h3>
            <p>Competitive programming challenges</p>
            <Link to="/events?type=coding-contest">Explore</Link>
          </div>
          <div className="event-type-card">
            <div className="event-type-icon">💼</div>
            <h3>Startup Pitches</h3>
            <p>Showcase your business ideas to investors</p>
            <Link to="/events?type=startup-pitch">Explore</Link>
          </div>
          <div className="event-type-card">
            <div className="event-type-icon">🎮</div>
            <h3>Gaming Tournaments</h3>
            <p>Compete in popular gaming competitions</p>
            <Link to="/events?type=gaming">Explore</Link>
          </div>
          <div className="event-type-card">
            <div className="event-type-icon">🎪</div>
            <h3>Tech Expos</h3>
            <p>Exhibitions showcasing latest innovations</p>
            <Link to="/events?type=expo">Explore</Link>
          </div>
        </div>
      </section>

      <section className={`featured-events-section ${animateEvents ? 'animate-slide-up' : ''}`}>
        <h2>Upcoming Events</h2>
        <div className="featured-events">
          {featuredEvents.map((event, index) => (
            <div key={event.id} className="event-card hover-effect" style={{animationDelay: `${index * 100}ms`}}>
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-date">{event.date}</div>
                <div className="event-type-badge">{event.type}</div>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-buttons">
                  <Link to={`/events/${event.id}`}>
                    <button className="btn btn-secondary">Details</button>
                  </Link>
                  <Link to={`/register?event=${event.id}`}>
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="app-features-section">
        <h2>Powerful Features for Event Management</h2>
        <div className="features-container">
          <div className="feature-item">
            <div className="feature-icon">🎟️</div>
            <h3>QR Ticketing</h3>
            <p>Instant ticket generation with secure QR code validation for hassle-free entry</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔔</div>
            <h3>Smart Notifications</h3>
            <p>Get timely reminders about registration deadlines, event schedules, and more</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <h3>Team Management</h3>
            <p>Create, join and manage teams for hackathons and group competitions</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h3>Live Leaderboards</h3>
            <p>Real-time rankings and progress tracking for competitive events</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🗣️</div>
            <h3>Feedback System</h3>
            <p>Rate and review events to help organizers improve future experiences</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Cross-Platform</h3>
            <p>Access your event details from any device with our responsive design</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What People Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-role">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Host Your Next Event?</h2>
          <p>Join thousands of event organizers who trust Nuvon for their registration needs.</p>
          <Link to="/register">
            <button className="btn btn-primary btn-large">Get Started Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
