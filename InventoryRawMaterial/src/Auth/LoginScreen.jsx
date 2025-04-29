import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://88.222.214.93:5000/auth/login', {
        email,
        password,
        roleId: '8290551b-9d0c-4005-91a8-abe6c841ae4d',
      });

      const userData = response.data.data;

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);

      alert('Successfully Logged In');
      navigate('/dashboard');
    } catch (error) {
      alert(error?.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
    fetchData();
  };

  return (
    <div style={styles.container}>
      <img
        src="/assets/images/Galo.png" 
        alt="Logo"
        style={styles.image}
      />
      <h1 style={styles.textheading}>Welcome Back!</h1>
      <p style={styles.title}>
        We are happy to see you again. Please enter your Email and Password.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.header}>Email</label>
        <div style={styles.inputWithIcon}>
          <span style={styles.icon}>📧</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={styles.input}
          />
        </div>

        <label style={styles.header}>Password</label>
        <div style={styles.inputWithIcon}>
          <span style={styles.icon}>🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        <p>Signup</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    minHeight: '100vh',
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
    objectFit: 'contain',
    marginBottom: 20,
  },
  textheading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 40,
  },
  form: {
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'left',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWithIcon: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #000',
    borderRadius: 40,
    padding: '5px 10px',
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 16,
    padding: 10,
  },
  eyeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 20,
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 40,
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: 16,
    border: 'none',
    cursor: 'pointer',
  },
};

export default LoginScreen;
