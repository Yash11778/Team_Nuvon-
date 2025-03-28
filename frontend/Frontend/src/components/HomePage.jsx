import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { calendar } from '../assets/animations';
import ThreeDBackground from './ThreeDBackground';
import AnimatedCounter from './AnimatedCounter';

const HomePage = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "October 15, 2023",
      description: "Join us for a day of innovation and networking with industry leaders.",
      tags: ["Technology", "Networking", "Innovation"],
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Hackathon Challenge",
      date: "November 5-6, 2023",
      description: "48 hours to build something amazing. Cash prizes and opportunities await!",
      tags: ["Coding", "Competition", "Prizes"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Web Development Workshop",
      date: "September 25, 2023",
      description: "Learn modern web development techniques from expert developers.",
      tags: ["Learning", "Web Dev", "Hands-on"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const statistics = [
    { value: "120", title: "Events Hosted", icon: "🎪" },
    { value: "3500", title: "Happy Attendees", icon: "👥" },
    { value: "45", title: "Expert Speakers", icon: "🎤" },
    { value: "12", title: "Award Wins", icon: "🏆" }
  ];

  return (
    <div className="home-container">
      <ThreeDBackground style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '80vh', zIndex: -1, opacity: 0.8 }} />
      
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="hero-content">
          <motion.h1
            className="text-contrast-high"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover, Register, Experience
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find amazing events and secure your spot in just a few clicks!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/register">
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.button>
            </Link>
            
            <Link to="/events">
              <motion.button 
                className="btn btn-secondary btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Events
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-animation"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Lottie animationData={calendar} loop={true} />
        </motion.div>
      </motion.section>

      <motion.section 
        className="statistics-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="statistics-container">
          {statistics.map((stat, index) => (
            <AnimatedCounter 
              key={index}
              value={stat.value}
              title={stat.title}
              icon={stat.icon}
              delay={index * 0.1 + 0.8}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h2 className="section-title text-contrast-high">Featured Events</h2>
        <div className="featured-events">
          {featuredEvents.map((event, index) => (
            <motion.div 
              key={event.id} 
              className="event-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
            >
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-date">{event.date}</div>
              </div>
              <div className="event-content">
                <h3 className="text-contrast-high">{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-tags">
                  {event.tags.map(tag => (
                    <span key={tag} className="event-tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/register?event=${event.id}`}>
                  <motion.button 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="cta-content">
          <h2>Ready to host your own event?</h2>
          <p>We provide the best platform for your in-person, virtual, or hybrid events.</p>
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Demo
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
