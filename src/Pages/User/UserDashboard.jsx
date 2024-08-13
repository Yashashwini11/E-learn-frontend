import React, { useEffect, useState } from 'react';
import UserCourseCard from '../../components/UserCourseCard';
import { getUserCourses } from '@/services/Api';

const UserDashboard = () => {
  const [currentCourses, setCurrentCourses] = useState([]);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        if (userId) {
          const response = await getUserCourses(userId);
          setCurrentCourses(response.data); // Assuming response.data is an array of course titles
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    fetchUserCourses();
  }, [userId]);

  return (
    <div className="pt-[2vh] pl-[16.6667%] w-full min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Welcome message with username */}
        <h1 className="text-3xl font-bold mb-6">Welcome back, {username}!</h1>
        
        <div className="mb-8">
         
          <div>
            <h2 className="text-2xl font-semibold mb-4">Progress Tracker</h2>
            <div className="p-4 light:bg-slate-400 rounded-lg shadow-md">
              <p className="text-sm light:text-gray-600 mb-2">Overall Progress: {}%</p>
              <div className="relative w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{ width: '70%' }} 
                ></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 pt-10">My Courses</h2>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 px-32">
              {currentCourses && currentCourses.length > 0 ? (
                currentCourses.map((courseTitle, index) => (
                  <UserCourseCard
                    key={index} 
                    title={courseTitle}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No courses enrolled yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
