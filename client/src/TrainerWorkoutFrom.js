import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from './authContext';
import TrainerHeader from './TrainerHeader';

export default function TrainerWorkoutForm() {
  const [user_email, setUserEmail] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [day, setDay] = useState('');
  const [formData, setFormData] = useState(null);
  const { user, userType } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Set default day to today's weekday
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setDay(today);
  }, []);

  const getData = async () => {
    const res = await axios.get("/users");
    return res.data.response;
  }

  useEffect(() => {
    if (user && userType === 'trainer') {
      getData().then(response => {
        setUsers(response.rows.map((ele) => ele.email));
      });
    }
  }, [user, userType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      userEmail: user_email,
      workName: workoutName,
      d: day,
      sets: parseInt(sets, 10) || 0,
      reps: parseInt(reps, 10) || 0
    };

    setFormData(data);
    postData(data);
  };

  const postData = async (data) => {
    await axios.post("/newWorkout", {
      email: data.userEmail,
      name: data.workName,
      set: data.sets,
      day: data.d,
      rep: data.reps
    });
  };

  return (
    <div>
      <TrainerHeader />

      <h2 className="text-3xl font-semibold text-gray-800">Create New Workout</h2>
      <div className="mt-1 mb-3 h-1 w-20 bg-gray-300 mx-auto"></div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          <div className='bg-white'>
            <label className="block text-md font-medium text-gray-700 mb-1 bg-white">
              User email
            </label>
            <select
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            >
              <option value="">Select the user</option>
              {users.map((userr) => (
                <option key={userr} value={userr}>
                  {userr}
                </option>
              ))}
            </select>
          </div>

          <div className='bg-white'>
            <label className="block text-md font-medium text-gray-700 mb-1 bg-white">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="e.g., Bench Press, Squats"
              required
            />
          </div>

          <div className='bg-white'>
            <label className="block text-md font-medium text-gray-700 mb-1 bg-white">
              Sets
            </label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter sets"
              min="0"
            />
          </div>

          <div className='bg-white'>
            <label className="block text-md font-medium text-gray-700 mb-1 bg-white">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className='bg-white'>
            <label className="block text-md font-medium text-gray-700 mb-1 bg-white">
              Reps
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter reps"
              min="0"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white text-md py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800"
          >
            Add Workout &nbsp; &rarr;
          </button>
        </form>

        {formData && (
          // <div className="mt-6 p-4 bg-gray-100 rounded-md">
          //   <h3 className="text-lg font-medium mb-2">Successfully added workout for {user_email} on {day} </h3>
            // {/* <pre className="text-sm whitespace-pre-wrap">
            //   {JSON.stringify(formData, null, 2)}
            // </pre> */}
          // </div>
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="text-lg font-semibold text-green-800 mb-1">
            ✅ Workout Added Successfully!
          </h3>
          <p className="text-sm text-green-700 text-left">
            You've scheduled <strong>{workoutName}</strong> for <strong>{user_email}</strong> on <strong>{day}</strong> with <strong>{sets}</strong> sets and <strong>{reps}</strong> reps.
          </p>
          </div>
        )}
      </div>
    </div>
  );
}
