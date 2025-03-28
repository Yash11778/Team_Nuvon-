import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, this would integrate with OAuth providers
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required    
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary btn-block" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="auth-separator">
        <span>OR</span>
      </div>
      
      <div className="auth-providers">
        <button 
          className="auth-button auth-button-google" 
          onClick={() => handleSocialLogin('Google')}
        >
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/google.svg" alt="Google" />
          Login with Google
        </button>
        
        <button 
          className="auth-button auth-button-github" 
          onClick={() => handleSocialLogin('GitHub')}
        >
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg" alt="GitHub" />
          Login with GitHub
        </button>
      </div>
      
      <p className="auth-footer">
        Don't have an account? <Link to="/register-account">Register here</Link>
      </p>
      
      <p className="auth-footer">
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
    </div>
  );
};

export default Login;
