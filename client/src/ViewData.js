import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';
import TrainerHeader from './TrainerHeader';
// import { Train } from 'lucide-react';

const ViewData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/allInfoUsers');
        console.log(res.data.response.rows);
        setUsers(res.data.response.rows); // assuming res.data is an array of user objects
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

    <TrainerHeader />
    <div className="flex flex-col gap-6 p-6">
      {users.map((user, index) => (
        <DisplayData
          key={index}
          email={user.email}
          password={user.user_password}
          healthIssues={user.health_issues}
          age={user.age}
          gender={user.gender}
          username = {user.user_name}
        />
      ))}
    </div>
    </div>
    
  );
};

export default ViewData;
