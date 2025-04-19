import React, { useEffect, useState } from 'react';
import TrainerHeader from './TrainerHeader';
import ShowProgTrainer from './ShowProgTrainer';
import axios from 'axios';
const TrainerProgress = () => {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [targetEmail, setTargetEmail] = useState({});
  const [emailList, setEmailList] = useState([
    'john@example.com',
    'jane@example.com',
    'doe@example.com',
    'test@example.com'
  ]);

  const getData = async () => {
    const res = await axios.get("/users");
    console.log(res);
    return res.data.response;
  }

  useEffect(() => {
    getData().then(response => {
        setEmailList(response.rows.map((ele, i) => ele.email));

    });
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    setTargetEmail({email : selectedEmail});

  };

  return (
    <div>
        <TrainerHeader />

        {Object.keys(targetEmail).length == 0 ? (<form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select Email:
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Choose an email --</option>
          {emailList.map((email, index) => (
            <option key={index} value={email}>
              {email}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        disabled={!selectedEmail}
      >
        Submit
      </button>
    </form>) : (
        <ShowProgTrainer data = {targetEmail} />
    )}
    </div>
    
  );
};

export default TrainerProgress;
