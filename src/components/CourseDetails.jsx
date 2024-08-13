import React from 'react';
import { Link } from 'react-router-dom';

const CourseDetails = ({ course }) => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        <ul className="list-disc list-inside space-y-2">
          {course.map((item) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
        <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="flex space-x-4">
            <Link
              to={`/view-doc/pdf/${course.samplePdf}`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Sample PDF
            </Link>
            <Link
              to={`/view-doc/ppt/${course.samplePpt}`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              View Sample PPT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
