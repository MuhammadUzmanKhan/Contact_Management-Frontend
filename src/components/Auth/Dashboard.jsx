import React, { useContext } from 'react';
import { AppContext } from '../../services/context';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, setUser } = useContext(AppContext);
  const editContact = `/edit-contact/${user.id}`;
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Welcome to the Contact Managment System</h1>
  <Link
    style={{
      textDecoration: 'none',
      fontSize: '18px',
      margin: '0 10px',
      color: '#333',
    }}
    to="/get-contact"
  >
    Get Contacts
  </Link>
  <span style={{ fontSize: '18px' }}> | </span>
  <Link
    style={{
      textDecoration: 'none',
      fontSize: '18px',
      margin: '0 10px',
      color: '#333',
    }}
    to="/create-contact"
  >
    Create Contact
  </Link>

  <button
    style={{
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '16px',
      borderRadius: '5px',
    }}
    onClick={handleLogout}
  >
    Logout
  </button>
  <p></p>
</div>

  );
}
