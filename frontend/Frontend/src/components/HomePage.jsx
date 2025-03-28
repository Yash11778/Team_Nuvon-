import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Conference 2023",
      date: "October 15, 2023",
      description: "Join us for a day of innovation and networking with industry leaders."
    },
    {
      id: 2,
      title: "Hackathon Challenge",
      date: "November 5-6, 2023",
      description: "48 hours to build something amazing. Cash prizes and opportunities await!"
    },
    {
      id: 3,
      title: "Web Development Workshop",
      date: "September 25, 2023",
      description: "Learn modern web development techniques from expert developers."
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Event Registration Portal</h1>
        <p>Discover exciting events and register in just a few clicks!</p>
        <Link to="/register">
          <button className="btn btn-primary">Register Now</button>
        </Link>
      </section>

      <section>
        <h2>Featured Events</h2>
        <div className="featured-events">
          {featuredEvents.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
              <Link to={`/register?event=${event.id}`}>
                <button className="btn btn-primary">Register</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
