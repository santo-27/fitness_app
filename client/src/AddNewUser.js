import { useState } from 'react';
import TrainerHeader from './TrainerHeader';
import axios from 'axios';

export default function AddNewUser() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    password: '',
    healthIssues: '',
    age: '',
    gender: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is where you'll add your axios request
    console.log('Form submitted:', formData);
    postData()

    
    // Simulating request completion
    setTimeout(() => {
      setIsLoading(false);
      setFormData({
        useremail: '',
        username: '',
        password: '',
        healthIssues: '',
        age: '',
        gender: ''
      });
    }, 0);
  };

  const postData = async () => {
    const res = await axios.post("/addUser", {email:formData.useremail, password:formData.password, user_name:formData.username, health_issues:formData.healthIssues, age:formData.age, gender:formData.gender});
  }

  return (
    <div>
    <TrainerHeader />
    <div className="w-full min-h-screen bg-gray-50 pt-16">
      {/* Main container */}
      <div className="w-full max-w-3xl mx-auto px-6 pb-16">
        {/* Title section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Add New User
          </h1>
          <div className="mt-2 h-1 w-16 bg-gray-300 mx-auto"></div>
          <p className="mt-4 text-gray-600">Please fill in the details below to register a new user</p>
        </div>
        
        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Username field */}
              <div className="space-y">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"

                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  User Email
                </label>
                <input
                  id="useremail"
                  name="useremail"
                  type="email"
                  required
                  value={formData.useremail}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              {/* Age field */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>
              
              {/* Gender field */}
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              {/* Health Issues field - spans full width */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="healthIssues" className="block text-sm font-medium text-gray-700">
                  Health Issues
                </label>
                <textarea
                  id="healthIssues"
                  name="healthIssues"
                  rows="4"
                  value={formData.healthIssues}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
                  placeholder="List any health issues or medical conditions..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Please include any relevant medical information that trainers should be aware of.</p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="mt-8 border-t border-gray-200"></div>
            
            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Add User"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer note */}
        <div className="mt-4 text-center text-sm text-gray-500">
          All user information will be stored securely in accordance with our data policies.
        </div>
      </div>
    </div>
    </div>
  );
}