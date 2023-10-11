import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../../services/context';

const ContactList = () => {
  const { user } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, [user]);


  const fetchContacts = async () => {
    try {
      // Check if the user is authenticated
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const response = await axios.get('http://localhost:3000/contacts', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Getting contact called");
      console.log('API Response:', response.data.contacts);
      setContacts(response.data.contacts);
   

    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <div>
   <center> <h2>Contact List</h2></center>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {contacts.map((contact) => (
          <li key={contact.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1' }}>
              <strong>Name:</strong> {contact.name} <br />
              <strong>Email:</strong> {contact.email}
            </div>
            <div style={{ flex: '0 0 auto', marginLeft: '10px' }}>
              <button style={{ marginRight: '5px' }}>
                <Link to={`/edit-contact/${contact.id}`}>Edit</Link>
              </button>
              <button> 
                <Link to={`/delete-contact/${contact.id}`}>Delete</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
