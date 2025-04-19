import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerGraph from './TrainerGraph';

function ShowProgTrainer(props) {
  const user = props.data;
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllWorkouts = async (email) => {
    try {
      console.log("Making request...");
      const response = await axios.post("/workout_plan", { email });
      const raw_workouts = response.data.rows;
      console.log("Raw workouts:", raw_workouts);

      setAllData(raw_workouts);


      const cleanWorkouts = [...new Set(raw_workouts.map(w => w.workout))];
      setData(cleanWorkouts);
      console.log(data)
    } catch (err) {
      console.error("Error fetching workouts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      getAllWorkouts(user.email);
    }
  }, [user]);

  if (!user || !user.email) return <div>Waiting for user info...</div>;
  if (isLoading) return <div>Loading workouts...</div>;

  return (
    <div>
      {data.length > 0 ? (
        data.map((item, i) => (
          <TrainerGraph user={user} key={i} workout={item} data={allData} />
        ))
      ) : (
        <div>No workouts found.</div>
      )}
    </div>
  );
}

export default ShowProgTrainer;
