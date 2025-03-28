import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventSchedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch events from your backend
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: 'Tech Conference 2023',
          date: 'October 15, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Tech Center, Main Hall',
          description: 'Join us for a day of innovation and networking with industry leaders.',
          sessions: [
            { time: '9:00 AM', title: 'Registration & Breakfast' },
            { time: '10:00 AM', title: 'Keynote: Future of Technology' },
            { time: '11:30 AM', title: 'Panel Discussion: AI Ethics' },
            { time: '1:00 PM', title: 'Lunch Break' },
            { time: '2:00 PM', title: 'Workshop: Cloud Technologies' },
            { time: '3:30 PM', title: 'Networking Session' },
            { time: '4:30 PM', title: 'Closing Remarks' }
          ]
        },
        {
          id: 2,
          title: 'Hackathon Challenge',
          date: 'November 5-6, 2023',
          time: 'Starts at 9:00 AM',
          location: 'Innovation Hub',
          description: '48 hours to build something amazing. Cash prizes and opportunities await!',
          sessions: [
            { time: 'Nov 5, 9:00 AM', title: 'Opening Ceremony & Team Formation' },
            { time: 'Nov 5, 10:30 AM', title: 'Hacking Begins' },
            { time: 'Nov 5, 1:00 PM', title: 'Lunch' },
            { time: 'Nov 5, 7:00 PM', title: 'Dinner' },
            { time: 'Nov 6, 9:00 AM', title: 'Breakfast' },
            { time: 'Nov 6, 12:00 PM', title: 'Submission Deadline' },
            { time: 'Nov 6, 1:00 PM', title: 'Presentations & Judging' },
            { time: 'Nov 6, 4:00 PM', title: 'Awards Ceremony' }
          ]
        },
        {
          id: 3,
          title: 'Web Development Workshop',
          date: 'September 25, 2023',
          time: '10:00 AM - 3:00 PM',
          location: 'Learning Center, Room 201',
          description: 'Learn modern web development techniques from expert developers.',
          sessions: [
            { time: '10:00 AM', title: 'Introduction to Modern Web Development' },
            { time: '11:00 AM', title: 'Hands-on: Building Your First React App' },
            { time: '12:30 PM', title: 'Lunch Break' },
            { time: '1:30 PM', title: 'Backend Integration with APIs' },
            { time: '2:30 PM', title: 'Q&A and Wrap-up' }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="event-schedule">
      <h1>Upcoming Events</h1>
      
      {events.map(event => (
        <div key={event.id} className="event-card">
          <h2>{event.title}</h2>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p>{event.description}</p>
          
          <div className="event-sessions">
            <h3>Schedule</h3>
            <ul>
              {event.sessions.map((session, index) => (
                <li key={index}>
                  <strong>{session.time}</strong> - {session.title}
                </li>
              ))}
            </ul>
          </div>
          
          <Link to={`/register?event=${event.id}`}>
            <button className="btn btn-primary">Register Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventSchedule;
