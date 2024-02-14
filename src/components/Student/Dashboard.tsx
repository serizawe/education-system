
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Course {
    courseId: string;
    name: string;
    description: string;
    thumbnailUrl: string;
}




const Dashboard: React.FC = () => {
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Fetch courses from the backend when the component mounts
        axios.get('https://localhost:7250/api/courses') // Replace with your actual backend URL
            .then((response) => {
                console.log(response.data);
                setAllCourses(response.data);
                setFilteredCourses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const handleSearch = (query: string) => {
        const filtered = allCourses.filter((course) =>
            course.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
        setSearchQuery(query);
    };

    return (
        <div className="w-full h-full flex flex-col items-center font-[Vollkorn]">
            <h1 className="text-2xl font-bold mt-5 mb-3">Kurslar</h1>
            <input
                type="text"
                placeholder="Bir kurs ara..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="border w-1/3 border-gray-300 p-2 rounded-xl mb-5"
            />
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {filteredCourses.map((course) => (
                        <div key={course.courseId} className="border p-4 rounded-md">
                            <Link to={`/courses/${course.courseId}`} className="block mb-2">
                                <img
                                    src={course.thumbnailUrl}
                                    alt={`Thumbnail for ${course.name}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </Link>
                            <Link to={`/courses/${course.courseId}`} className="text-blue-500 font-bold">
                                {course.name}
                            </Link>
                            <p className="text-gray-500">{course.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Kurs bulunamadı.</p>
            )}
        </div>
    );
};

export default Dashboard;
