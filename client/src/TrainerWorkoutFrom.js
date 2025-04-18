import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from './authContext';
import TrainerHeader from './TrainerHeader';

export default function TrainerWorkoutForm() {
  const [user_email, setUserEmail] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [day, setDay] = useState('');
  const [formData, setFormData] = useState(null);
  const {user, userType} = useContext(AuthContext)
  const [users, setUsers] = useState([]);

  // Sample workout types - in a real app this might come from an API
 

  const getData = async () => {
    const res = await axios.get("/users");
    console.log(res);
    return res.data.response;
  }



  useEffect(() => {
    if(user && userType == 'trainer'){
        getData().then(response => {
            setUsers(response.rows.map((ele, i) => ele.email));

            console.log(users)

        });
    }
  }, [])

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormData(...formData, [name]:c)
  // }

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      userEmail : user_email,
      workName : workoutName,
      d : day,
      sets: parseInt(sets, 10) || 0,
      reps: parseInt(reps, 10) || 0
    };


    
    setFormData(data);
    
    // In a real app, you might send this data to an API
    postData(data);
  };

  const postData = async (data) => {
    const res = await axios.post("/newWorkout", {email:data.userEmail, name: data.workName, set:data.sets, day:data.d});

  }
  
  return (
    <div>
    <TrainerHeader />
    
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Workout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User email
          </label>
          <select
            value={user_email}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workout Name
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Bench Press, Running"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sets
          </label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of sets"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Day
          </label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the Day"

          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reps
          </label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Number of repetitions"
            min="0"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Workout
        </button>
      </form>
      
      {formData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-medium mb-2">Submitted Data:</h3>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
    </div>
  );
}