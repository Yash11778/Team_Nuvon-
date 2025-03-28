import { useState } from 'react';

const HackathonRegistration = ({ onSubmit }) => {
  const [teamData, setTeamData] = useState({
    teamName: '',
    projectIdea: '',
    techStack: '',
    members: [
      { name: '', email: '', role: '', skills: '' }
    ]
  });

  const handleTeamDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value
    });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...teamData.members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [name]: value
    };
    
    setTeamData({
      ...teamData,
      members: updatedMembers
    });
  };

  const addTeamMember = () => {
    setTeamData({
      ...teamData,
      members: [
        ...teamData.members,
        { name: '', email: '', role: '', skills: '' }
      ]
    });
  };

  const removeTeamMember = (index) => {
    const updatedMembers = [...teamData.members];
    updatedMembers.splice(index, 1);
    
    setTeamData({
      ...teamData,
      members: updatedMembers
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(teamData);
  };

  return (
    <div className="event-specific-form">
      <h3>Hackathon Team Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name *</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            className="form-control"
            value={teamData.teamName}
            onChange={handleTeamDataChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="projectIdea">Project Idea (Brief description) *</label>
          <textarea
            id="projectIdea"
            name="projectIdea"
            className="form-control"
            value={teamData.projectIdea}
            onChange={handleTeamDataChange}
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="techStack">Technologies You Plan to Use</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            className="form-control"
            value={teamData.techStack}
            onChange={handleTeamDataChange}
            placeholder="e.g., React, Node.js, MongoDB"
          />
        </div>
        
        <h4>Team Members</h4>
        <div className="team-members-container">
          {teamData.members.map((member, index) => (
            <div key={index} className="team-member">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`member-${index}-name`}>Name *</label>
                  <input
                    type="text"
                    id={`member-${index}-name`}
                    name="name"
                    className="form-control"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, e)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`member-${index}-email`}>Email *</label>
                  <input
                    type="email"
                    id={`member-${index}-email`}
                    name="email"
                    className="form-control"
                    value={member.email}
                    onChange={(e) => handleMemberChange(index, e)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`member-${index}-role`}>Role in Team</label>
                  <input
                    type="text"
                    id={`member-${index}-role`}
                    name="role"
                    className="form-control"
                    value={member.role}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="e.g., Frontend Developer, UI Designer"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`member-${index}-skills`}>Skills</label>
                  <input
                    type="text"
                    id={`member-${index}-skills`}
                    name="skills"
                    className="form-control"
                    value={member.skills}
                    onChange={(e) => handleMemberChange(index, e)}
                    placeholder="e.g., JavaScript, UI/UX, Python"
                  />
                </div>
              </div>
              
              {teamData.members.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeTeamMember(index)}
                >
                  Remove Team Member
                </button>
              )}
            </div>
          ))}
          
          {teamData.members.length < 5 && (
            <button
              type="button"
              className="add-member-button"
              onClick={addTeamMember}
            >
              + Add Team Member
            </button>
          )}
        </div>
        
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Submit Team Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default HackathonRegistration;
