import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ContactList from './components/Contacts/ContactList';
import ContactForm from './components/Contacts/ContactForm';
import ContactEdit from './components/Contacts/ContactEdit';
import Layout from './components/Auth/Layout';
import Dashboard from './components/Auth/Dashboard';
import { AppContext } from './services/context';
import ContactDelete from './components/Contacts/ContactDelete';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
// protected routes for the specific users
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        {user ? (
          <Routes>
            <Route path="/get-contact" element={<ContactList />} />
            <Route path="/edit-contact/:id" element={<ContactEdit />} />
            <Route path="/create-contact" element={<ContactForm />} />
            <Route path="/delete-contact/:id" element={<ContactDelete />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
    </AppContext.Provider>
  );
};

export default App;
