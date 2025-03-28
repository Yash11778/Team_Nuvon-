import { useState } from 'react';

const WorkshopRegistration = ({ onSubmit }) => {
  const [workshopData, setWorkshopData] = useState({
    experienceLevel: '',
    expectations: '',
    requiresLaptop: true,
    receiveMaterials: true,
    receiveUpdates: true
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setWorkshopData({
      ...workshopData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(workshopData);
  };

  return (
    <div className="event-specific-form">
      <h3>Workshop Registration Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="experienceLevel">Your Experience Level *</label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            className="form-control"
            value={workshopData.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Your Level --</option>
            <option value="beginner">Beginner - New to the topic</option>
            <option value="intermediate">Intermediate - Some experience</option>
            <option value="advanced">Advanced - Experienced in this field</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="expectations">What do you hope to learn from this workshop?</label>
          <textarea
            id="expectations"
            name="expectations"
            className="form-control"
            value={workshopData.expectations}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group checkbox-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="requiresLaptop"
              name="requiresLaptop"
              className="form-check-input"
              checked={workshopData.requiresLaptop}
              onChange={handleChange}
            />
            <label htmlFor="requiresLaptop" className="form-check-label">
              I will bring my own laptop for hands-on activities
            </label>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="receiveMaterials"
              name="receiveMaterials"
              className="form-check-input"
              checked={workshopData.receiveMaterials}
              onChange={handleChange}
            />
            <label htmlFor="receiveMaterials" className="form-check-label">
              I would like to receive workshop materials in advance
            </label>
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="receiveUpdates"
              name="receiveUpdates"
              className="form-check-input"
              checked={workshopData.receiveUpdates}
              onChange={handleChange}
            />
            <label htmlFor="receiveUpdates" className="form-check-label">
              Keep me updated about future workshops on similar topics
            </label>
          </div>
        </div>
        
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Complete Workshop Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkshopRegistration;
