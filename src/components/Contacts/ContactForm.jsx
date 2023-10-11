import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../services/context';
import { useNavigate } from 'react-router-dom';
function ContactForm() {
  const { user } = useContext(AppContext);
  const [contact, setContact] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  const handleCreateContact = async () => {
    try {
      // Check if the user is authenticated
      if (!user) {
        console.error('User not authenticated');
        return;
      }
// Create a new contact object with user ID
      const newContact = {
        name: contact.name,
        email: contact.email,
        userId: user.id, // Assuming your user object has an 'id' property
      };

      const response = await axios.post('http://localhost:3000/contacts', newContact, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log('Contact created successfully:', response.data);

      // Clear input fields after successful contact creation
      setContact({ name: '', email: '' });
      navigate('/get-contact');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div>
      <h2>Create Contact</h2>
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
        <button onClick={handleCreateContact}>Create Contact</button>
      </form>
    </div>
  );
}

export default ContactForm;



