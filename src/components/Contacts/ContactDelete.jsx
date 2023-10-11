import React, { useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../services/context';

const ContactDelete = () => {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteContact = async () => {
    try {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      await axios.delete(`http://localhost:3000/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('Contact deleted successfully');
      navigate('/get-contact', { replace: true });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
    <h2>Delete Contact</h2>
    <p>Are you sure you want to delete this contact?</p>
    <button className="delete-button" onClick={handleDeleteContact}>
      Confirm Delete
    </button>
  </div>
  );
};

export default ContactDelete;
