import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../services/context';

const ContactEdit = () => {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const [contact, setContact] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactDetails();
  }, [user, id]);
  
  const fetchContactDetails = async () => {
    try {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const response = await axios.get(`http://localhost:3000/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setContact(response.data.contact);
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };


  const handleUpdateContact = async () => {
    try {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const response = await axios.put(`http://localhost:3000/contacts/${id}`, contact, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('Contact updated successfully:', response.data);
      navigate('/get-contact');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div>
 <center><h2>Edit Contact</h2></center>   
    <form className="contact-form">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={contact.email}
        onChange={handleInputChange}
      />
      <button onClick={handleUpdateContact}>Update Contact</button>
    </form>
  </div>
  );
};

export default ContactEdit;
