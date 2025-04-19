import { useState } from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';

export default function NewTrainer() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    postData(formData);

    // Simulating request completion
    setTimeout(() => {
      setIsLoading(false);
      setFormData({ email: '', password: '' });
    }, 1000);


  };

  const postData = async (data) => {
    const res = await axios.post("/addTrainer", formData);

  }

  return (
    <div>
    <AdminHeader />
    
    <div className="w-full min-h-screen bg-white pt-24">

      <div className="w-full max-w-4xl mx-auto px-6 pb-16">

        <div className="relative mb-12 px-4">
          <div className="absolute left-0 top-0 w-2 h-full bg-black"></div>
          <h1 className="text-5xl font-black tracking-tight text-black uppercase pl-6">
            ADD NEW<br />TRAINER
          </h1>
          <div className="mt-3 h-2 w-32 bg-black ml-6"></div>
        </div>
        

        <div className="bg-gray-100 p-8 relative">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-16 border-r-16 border-t-black border-r-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-16 border-l-16 border-b-black border-l-transparent"></div>
          
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              <div className="relative">
                <label htmlFor="email" className="block text-base font-bold text-gray-800 uppercase tracking-widest mb-3">
                  TRAINER EMAIL
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 bg-white border-b-2 border-l-2 border-black focus:outline-none focus:border-gray-700 text-black text-lg"
                    placeholder="email@example.com"
                  />
                  <div className="absolute right-0 bottom-0 w-3 h-3 bg-black"></div>
                </div>
              </div>
              

              <div className="relative">
                <label htmlFor="password" className="block text-base font-bold text-gray-800 uppercase tracking-widest mb-3">
                  TRAINER PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 bg-white border-b-2 border-l-2 border-black focus:outline-none focus:border-gray-700 text-black text-lg"
                    placeholder="••••••••"
                  />
                  <div className="absolute right-0 bottom-0 w-3 h-3 bg-black"></div>
                </div>
              </div>
            </div>
            

            <div className="mt-12 relative max-w-xs mx-auto">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full flex justify-center py-4 px-6 bg-black text-white font-black text-xl uppercase tracking-widest hover:bg-gray-800 transition-colors duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESSING
                  </span>
                ) : "ADD TRAINER"}

                <div className="absolute top-0 right-0 w-4 h-4 bg-gray-300"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-300"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Decorative bottom element */}
        <div className="w-full relative h-6 mt-8">
          <div className="absolute left-0 bottom-0 w-1/4 h-2 bg-black"></div>
          <div className="absolute right-16 bottom-0 w-8 h-2 bg-black"></div>
        </div>
      </div>
    </div>
    </div>
  );
}