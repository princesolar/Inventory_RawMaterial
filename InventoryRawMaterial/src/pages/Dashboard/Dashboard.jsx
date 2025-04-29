import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://88.222.214.93:5000/admin/showDefectiveItemsOfWarehouse'
        );
        setData(response.data.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMoreInfo = (itemType) => {
    navigate('/all-defective-data', { state: { itemType } });
  };

  const renderCard = (title, color) => {
    const count =
      data?.totalsByGroup?.find((item) => item.item === title)?.defectiveCount || 0;

    return (
      <div className="card" style={{ backgroundColor: color }}>
        <h3>{title}</h3>
        <p>Total Defective</p>
        <strong>{count}</strong>
        <button onClick={() => handleMoreInfo(title)} className="more-info-btn">
          More Info
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-section">
          <img src="/images/Galo.png" alt="Logo" className="logo-img" />
          <h1>RMS ADMIN</h1>
        </div>
        <Sidebar />
        <Logout />
      </header>

      <div className="cards-container">
        {renderCard('Pump', '#E1341E')}
        {renderCard('Controller', '#97bcc7')}
        {renderCard('Motor', '#FFAEBC')}
      </div>
    </div>
  );
};

export default Dashboard;
