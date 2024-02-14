import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Course {
    courseId: string;
    name: string;
    description: string;
    thumbnailUrl: string;
}


const StudentCoursesList: React.FC = () => {
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const studentId = useAppSelector(state => state.auth.userId);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                if (studentId) {
                    const response = await axios.get(`https://localhost:7250/api/courses/enrolled/${studentId}`);
                    setEnrolledCourses(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        fetchEnrolledCourses();
    }, [studentId]);
    return (
        <div className="flex w-1/2 h-[70dvh] flex-col pt-5 justify-center items-center mx-0 font-[Vollkorn]">
            <h1 className="text-2xl text-[#4c1d95] font-bold mb-4">Kurslarım</h1>
            {enrolledCourses.length > 0 ? (
                <ul className="h-[60vh] mb-5 overflow-y-scroll">
                    {enrolledCourses.map((course) => (
                        <li key={course.courseId} className="mb-4 flex items-center flex-col md:flex-row ml-5 overflow-y-scroll hover:bg-gray-300 border-b-2">
                            <div className="md:w-2/3 h-36 p-10 text-center md:text-left">
                                <Link to={`/student/courses/${course.courseId}`} className="text-[#818cf8] text-xl font-bold hover:underline">
                                    {course.name}
                                </Link>
                                <p className="text-gray-500 font-semibold">{course.description}</p>
                            </div>
                            <div className="flex-shrink-0 w-32 h-32 ml-4">
                                {course.thumbnailUrl && (
                                    <img src={course.thumbnailUrl} alt={`Thumbnail for ${course.name}`} className="w-full h-full object-cover rounded-md" />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Kaydedilmiş kursunuz yok.</p>
            )}
        </div>
    );
};

export default StudentCoursesList;
