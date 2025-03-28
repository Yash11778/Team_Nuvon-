const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database setup with initial data
const db = {
  users: [
    {
      _id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2a$10$ixQWJ.BrOANszLJB9JriU.ykJFPeoFGLTXQhop/KX4C/IKT12JpJS', // admin123
      role: 'admin',
      createdAt: new Date()
    },
    {
      _id: '2',
      name: 'Regular User',
      email: 'user@example.com',
      password: '$2a$10$YzpjwElq3NnHNQaXzD0FDecNTGtJfVCfNY1CXc6.lR0sIdTY7uUYy', // user123
      role: 'user',
      createdAt: new Date()
    }
  ],
  events: [
    {
      _id: '1',
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
      ],
      createdAt: new Date()
    },
    {
      _id: '2',
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
      ],
      createdAt: new Date()
    },
    {
      _id: '3',
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
      ],
      createdAt: new Date()
    }
  ],
  registrations: [
    {
      _id: '1',
      userId: '2',
      eventId: '1',
      name: 'Regular User',
      email: 'user@example.com',
      phone: '555-123-4567',
      organization: 'Tech Corp',
      dietary: 'vegetarian',
      specialRequests: 'None',
      registrationId: 'REG123456',
      createdAt: new Date()
    }
  ]
};

console.log('Connected to in-memory database');
console.log('Sample users created: Admin (admin@example.com/admin123), User (user@example.com/user123)');

// Middleware for authentication and authorization
const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => 
  req.user?.role === 'admin' 
    ? next() 
    : res.status(403).json({ message: 'Admin access required' });

// Routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (db.users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      _id: (db.users.length + 1).toString(),
      name, email, password: hashedPassword,
      role: role || 'user',
      createdAt: new Date()
    };
    
    db.users.push(newUser);
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.users.find(user => user.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/users/me', auth, (req, res) => {
  const user = db.users.find(user => user._id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.get('/api/events', (req, res) => res.json(db.events));

app.post('/api/events', auth, isAdmin, (req, res) => {
  try {
    const { title, date, time, location, description, sessions } = req.body;
    const newEvent = {
      _id: (db.events.length + 1).toString(),
      title, date, time, location, description, sessions,
      createdAt: new Date()
    };
    
    db.events.push(newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/registrations', auth, (req, res) => {
  try {
    const { eventId, name, email, phone, organization, dietary, specialRequests } = req.body;
    const registrationId = 'REG' + Date.now().toString().slice(-6);
    
    const registration = {
      _id: (db.registrations.length + 1).toString(),
      userId: req.user.id,
      eventId, name, email, phone, organization, dietary, specialRequests, registrationId,
      createdAt: new Date()
    };
    
    db.registrations.push(registration);
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/registrations/user', auth, (req, res) => {
  try {
    const userRegistrations = db.registrations
      .filter(reg => reg.userId === req.user.id)
      .map(reg => ({
        ...reg,
        eventId: db.events.find(e => e._id === reg.eventId)
      }));
      
    res.json(userRegistrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/registrations', auth, isAdmin, (req, res) => {
  try {
    const registrations = db.registrations.map(reg => {
      const event = db.events.find(e => e._id === reg.eventId);
      const user = db.users.find(u => u._id === reg.userId);
      const { password, ...userInfo } = user;
      
      return { ...reg, eventId: event, userId: userInfo };
    });
    
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/registrations/:id', (req, res) => {
  try {
    const registration = db.registrations.find(r => r.registrationId === req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    
    const event = db.events.find(e => e._id === registration.eventId);
    res.json({ ...registration, eventId: event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Database status endpoint
app.get('/api/db-status', (req, res) => {
  res.json({
    status: 'connected',
    type: 'in-memory',
    message: 'Using in-memory database for development',
    dbStats: {
      users: db.users.length,
      events: db.events.length,
      registrations: db.registrations.length
    }
  });
});

// MongoDB connection test endpoint
app.get('/api/mongodb-status', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    // Try a quick connection to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { 
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    
    const result = {
      status: 'connected',
      type: 'mongodb',
      database: mongoose.connection.db.databaseName,
      host: mongoose.connection.host
    };
    
    await mongoose.connection.close();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      type: 'mongodb',
      message: 'Failed to connect to MongoDB',
      error: err.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
