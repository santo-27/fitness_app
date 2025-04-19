import React from 'react';
import { Mail, Lock, HeartPulse, Calendar, User } from 'lucide-react';

const DisplayData = ({ email, password, healthIssues, age, gender , username}) => {
  return (
    <div className="w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{username}</h2>

      <div className="flex flex-col gap-5 text-gray-800 text-base">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-blue-600" />
          <span><strong>Email:</strong> {email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-red-500" />
          <span><strong>Password:</strong> {password}</span>
        </div>

        <div className="flex items-center gap-3">
          <HeartPulse className="w-6 h-6 text-pink-600" />
          <span><strong>Health Issues:</strong> {healthIssues || 'None'}</span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-green-600" />
          <span><strong>Age:</strong> {age}</span>
        </div>

        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-purple-600" />
          <span><strong>Gender:</strong> {gender}</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
