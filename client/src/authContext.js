import React, { createContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  


  const login = async (email, password) => {
    try {
      // FOR THE SAKE OF FRONTENDD

      // COMMENTED(WORKS)
      const response = await axios.post('/api/login', { email, password });
      console.log(response)
      setUser(response.data.user);

      //FOR EASE OF USE FOR FRONTEND
      // setUser({email:'sample@gmail.com'})
      //COMMENT THIS IN FUTUREE
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
