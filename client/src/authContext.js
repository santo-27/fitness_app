import React, { createContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  


  const login = async (email, password, userType) => {
    try {
      // FOR THE SAKE OF FRONTENDD

      // COMMENTED(WORKS)
      if(userType == "user"){
        const response = await axios.post('/api/login', { email, password });
        console.log(response);
        setUser(response.data.user);
        setUserType("user");
      }

      else if(userType == "trainer"){
        const response = await axios.post('/api/trainerlogin', { email, password });
        console.log(response);
        setUser(response.data.user);
        setUserType("trainer");
      }

      else if(userType == "admin"){
        const response = await axios.post('/api/adminLogin', { email, password });
        console.log(response);
        setUser(response.data.user);
        setUserType("admin");
      }
      

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
    <AuthContext.Provider value={{userType, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
