import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventSchedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'hackathon', name: 'Hackathons' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'coding-contest', name: 'Coding Contests' },
    { id: 'startup-pitch', name: 'Startup Pitches' },
    { id: 'gaming', name: 'Gaming Tournaments' },
    { id: 'business', name: 'Business Events' }
  ];

  useEffect(() => {
    // In a real app, you would fetch events from your backend
    setTimeout(() => {
      const allEvents = [
        // Hackathons
        {
          id: 1,
          title: 'Tech Innovation Hackathon',
          date: 'October 15-16, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Tech Center, Main Hall',
          description: 'Build innovative solutions for real-world problems in a 48-hour sprint.',
          category: 'hackathon',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: [
            { time: '9:00 AM', title: 'Registration & Breakfast' },
            { time: '10:00 AM', title: 'Opening Ceremony' },
            { time: '11:00 AM', title: 'Team Formation' },
            { time: '12:00 PM', title: 'Lunch' },
            { time: '1:00 PM', title: 'Hacking Begins' }
          ]
        },
        {
          id: 2,
          title: 'HealthTech Hackathon',
          date: 'November 5-6, 2023',
          time: 'Starts at 9:00 AM',
          location: 'Innovation Hub',
          description: 'Creating technology solutions for healthcare challenges.',
          category: 'hackathon',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 3,
          title: 'ClimateAction Hackathon',
          date: 'December 10-11, 2023',
          time: '10:00 AM - 6:00 PM',
          location: 'Green Energy Center',
          description: 'Develop solutions for climate change and sustainability challenges.',
          category: 'hackathon',
          image: 'https://images.unsplash.com/photo-1623259838743-9f1e884fba59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 4,
          title: 'EdTech Solutions Hackathon',
          date: 'January 20-21, 2024',
          time: '9:00 AM - 6:00 PM',
          location: 'Learning Center, Building A',
          description: 'Create the future of education with innovative technology solutions.',
          category: 'hackathon',
          image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 5,
          title: 'Fintech Innovation Challenge',
          date: 'February 15-16, 2024',
          time: '10:00 AM - 5:00 PM',
          location: 'Finance Building, Conference Hall',
          description: 'Revolutionize financial services with cutting-edge technology solutions.',
          category: 'hackathon',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },

        // Workshops
        {
          id: 6,
          title: 'Web Development Masterclass',
          date: 'September 25, 2023',
          time: '10:00 AM - 3:00 PM',
          location: 'Learning Center, Room 201',
          description: 'Learn modern web development techniques from expert developers.',
          category: 'workshop',
          image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 7,
          title: 'AI & Machine Learning Workshop',
          date: 'October 5, 2023',
          time: '9:00 AM - 4:00 PM',
          location: 'Tech Hub, Floor 3',
          description: 'Hands-on session on implementing AI models and machine learning algorithms.',
          category: 'workshop',
          image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 8,
          title: 'Mobile App Development Workshop',
          date: 'November 15, 2023',
          time: '10:00 AM - 5:00 PM',
          location: 'Innovation Labs, Room 105',
          description: 'Create cross-platform mobile applications with React Native.',
          category: 'workshop',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 9,
          title: 'UX/UI Design Workshop',
          date: 'December 5, 2023',
          time: '9:00 AM - 3:00 PM',
          location: 'Design Studio, 2nd Floor',
          description: 'Learn design thinking and create user-centered digital experiences.',
          category: 'workshop',
          image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 10,
          title: 'Blockchain Development Workshop',
          date: 'January 10, 2024',
          time: '10:00 AM - 4:00 PM',
          location: 'Tech Center, Room 302',
          description: 'Build decentralized applications on blockchain platforms.',
          category: 'workshop',
          image: 'https://images.unsplash.com/photo-1639815188546-c43c240ff4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },

        // Coding Contests
        {
          id: 11,
          title: 'Competitive Programming Challenge',
          date: 'October 22, 2023',
          time: '1:00 PM - 5:00 PM',
          location: 'Computer Science Building, Lab 204',
          description: 'Test your algorithm skills with challenging programming problems.',
          category: 'coding-contest',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 12,
          title: 'Code Sprint Challenge',
          date: 'November 18, 2023',
          time: '10:00 AM - 2:00 PM',
          location: 'Virtual Event',
          description: 'Rapid coding contest focused on speed and accuracy.',
          category: 'coding-contest',
          image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 13,
          title: 'Full-Stack Development Contest',
          date: 'December 16, 2023',
          time: '9:00 AM - 6:00 PM',
          location: 'Developer Hub, Main Hall',
          description: 'Build a full-stack application in a day to solve a real business problem.',
          category: 'coding-contest',
          image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 14,
          title: 'Data Science Competition',
          date: 'January 20, 2024',
          time: '10:00 AM - 4:00 PM',
          location: 'Analytics Center, Room 105',
          description: 'Analyze complex datasets to extract meaningful insights and predictions.',
          category: 'coding-contest',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },

        // Startup Pitches
        {
          id: 15,
          title: 'Startup Pitch Night',
          date: 'October 30, 2023',
          time: '6:00 PM - 9:00 PM',
          location: 'Business Center Auditorium',
          description: 'Present your business idea to investors and industry leaders.',
          category: 'startup-pitch',
          image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 16,
          title: 'Venture Capital Showcase',
          date: 'November 25, 2023',
          time: '5:00 PM - 8:00 PM',
          location: 'Finance Building, Conference Room',
          description: 'Early-stage startups present to a panel of venture capitalists.',
          category: 'startup-pitch',
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 17,
          title: 'Social Impact Startup Forum',
          date: 'December 12, 2023',
          time: '3:00 PM - 7:00 PM',
          location: 'Community Center',
          description: 'Pitch your startup ideas that address social and environmental challenges.',
          category: 'startup-pitch',
          image: 'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 18,
          title: 'Tech Startup Demo Day',
          date: 'January 15, 2024',
          time: '2:00 PM - 6:00 PM',
          location: 'Innovation Hub',
          description: 'Technology startups demonstrate their products to potential investors and partners.',
          category: 'startup-pitch',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },

        // Gaming Tournaments
        {
          id: 19,
          title: 'Esports Championship',
          date: 'November 11-12, 2023',
          time: '10:00 AM - 8:00 PM',
          location: 'Gaming Arena, Building E',
          description: 'Competitive gaming tournament featuring popular esports titles.',
          category: 'gaming',
          image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 20,
          title: 'Mobile Gaming Tournament',
          date: 'December 3, 2023',
          time: '12:00 PM - 6:00 PM',
          location: 'Student Center, Main Hall',
          description: 'Competitive tournament for popular mobile games with cash prizes.',
          category: 'gaming',
          image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 21,
          title: 'Game Development Showcase',
          date: 'January 7, 2024',
          time: '11:00 AM - 5:00 PM',
          location: 'Creative Arts Building',
          description: 'Showcase your indie game developments and compete for recognition.',
          category: 'gaming',
          image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 22,
          title: 'Virtual Reality Gaming Expo',
          date: 'February 4, 2024',
          time: '10:00 AM - 4:00 PM',
          location: 'Tech Hub, VR Lab',
          description: 'Experience cutting-edge VR games and compete in immersive tournaments.',
          category: 'gaming',
          image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },

        // Business Events
        {
          id: 23,
          title: 'Business Leadership Conference',
          date: 'October 20, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Business School Auditorium',
          description: 'Learn from industry leaders about effective leadership strategies in the digital age.',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 24,
          title: 'Digital Marketing Symposium',
          date: 'November 8, 2023',
          time: '10:00 AM - 4:00 PM',
          location: 'Marketing Center, Conference Room',
          description: 'Explore the latest trends and strategies in digital marketing.',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 25,
          title: 'Entrepreneurship Forum',
          date: 'December 7, 2023',
          time: '1:00 PM - 6:00 PM',
          location: 'Business Innovation Hub',
          description: 'Connect with successful entrepreneurs and learn how to grow your business.',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        },
        {
          id: 26,
          title: 'Finance & Investment Summit',
          date: 'January 12, 2024',
          time: '9:00 AM - 5:00 PM',
          location: 'Finance Center Auditorium',
          description: 'Gain insights on financial strategies and investment opportunities in the current market.',
          category: 'business',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          sessions: []
        }
      ];
      
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === activeCategory));
    }
  }, [activeCategory, events]);

  if (loading) {
    return <div className="loading-container">Loading events...</div>;
  }

  return (
    <div className="event-schedule-page">
      <div className="page-header">
        <h1>Discover Events</h1>
        <p>Find and register for upcoming events that match your interests</p>
      </div>
      
      <div className="category-filter">
        <div className="filter-title">Filter by Category:</div>
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <p>No events found in this category.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-category-badge">{event.category}</div>
              </div>
              
              <div className="event-content">
                <h2>{event.title}</h2>
                <div className="event-meta">
                  <div className="meta-item">
                    <i className="fas fa-calendar-alt"></i> {event.date}
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-clock"></i> {event.time}
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-map-marker-alt"></i> {event.location}
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-actions">
                  <Link to={`/events/${event.id}`}>
                    <button className="btn btn-secondary">View Details</button>
                  </Link>
                  <Link to={`/register?event=${event.id}`}>
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSchedule;
