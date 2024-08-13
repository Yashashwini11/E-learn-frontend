import { addLearningMaterial, getLearningMaterials } from '@/services/Api';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TutorLearningMaterial = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getLearningMaterials(courseId);
        const data = Array.isArray(response.data) ? response.data : [];
        setMaterials(data);
      } catch (err) {
        setError('Failed to fetch learning materials.');
        console.error('Error fetching learning materials:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMaterials();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLearningMaterial(courseId, title, type, url);
      setMessage('Learning material added successfully!');
      setTitle('');
      setType('');
      setUrl('');

      const response = await getLearningMaterials(courseId);
      const data = Array.isArray(response.data) ? response.data : [];
      setMaterials(data);
    } catch (error) {
      console.error('Failed to add learning material:', error.response ? error.response.data : error.message);
      setMessage('Failed to add learning material.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 min-h-screen bg-gray-50 lg:ml-64 lg:mt-20 lg:mr-4">
      <div className="flex-1 lg:w-1/2 lg:mr-8 bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Learning Materials for Course {courseId}</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : materials.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      {material.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No learning materials found for this course.</p>
        )}
      </div>

      <div className="flex-1 lg:w-1/2 lg:ml-8 bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Add New Learning Material</h2>
        {message && (
          <p className={`mb-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorLearningMaterial;
