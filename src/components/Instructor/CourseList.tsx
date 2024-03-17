// InstructorCoursesList.tsx
import CreateCourse from './CreateCourse';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import axios from 'axios';

interface Course {
    courseId: string;
    name: string;
    description: string;
    thumbnailUrl: string;
}

const InstructorCoursesList: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const instructorId = useAppSelector(state => state.auth.userId);
    const role = useAppSelector(state => state.auth.role);
    console.log(instructorId, role);
    useEffect(() => {
        const getInstructorCourses = async () => {
            try {
                if (instructorId) {
                    console.log(typeof (instructorId));
                    const response = await axios.post(`https://localhost:7250/api/courses/instructor/${instructorId}`);
                    console.log(response);
                    setCourses(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getInstructorCourses();
    }, [instructorId]);

    const handleCreateCourseClick = () => {
        setShowCreateCourse(true);
    };

    const handleCreateCourseClose = () => {
        setShowCreateCourse(false);
    };

    const isMobile = window.innerWidth <= 767;

    return (
        <div className={`flex flex-col pt-5 md:flex-row h-[100vh] w-full justify-center items-center mx-0 font-[Vollkorn]`}>
            <div className="md:w-1/2">
                {isMobile ? (
                    showCreateCourse ? (
                        <CreateCourse onClose={handleCreateCourseClose} />
                    ) : (
                        <>
                            <h1 className="text-2xl text-[#4c1d95] font-bold mb-4">KURSLAR</h1>
                            <ul className='h-[60vh] mb-5 overflow-y-scroll'>
                                {courses.map((course) => (
                                    <li key={course.courseId} className="mb-4 flex items-center flex-col md:flex-row ml-5 overflow-y-scroll hover:bg-gray-300 border-b-2">
                                        <div className="md:w-2/3 h-36 p-10 text-center md:text-left">
                                            <Link to={`/instructor/courses/${course.courseId}`} className="text-[#818cf8] text-xl font-bold hover:underline">
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
                        </>
                    )
                ) : (
                    <>
                        {courses.length === 0 && (
                            <p className='pb-5'>You haven't created any courses yet.</p>
                        )}
                        <button
                            onClick={handleCreateCourseClick}
                            className='text-2xl mb-5 bg-gray-500 rounded-xl text-white font-semibold hover:underline p-2 '
                        >
                            Kurs oluştur
                        </button>
                        <ul className='h-[65vh] mb-5 overflow-y-scroll'>
                            {courses.map((course) => (
                                <li key={course.courseId} className="mb-4 flex items-center ml-5 overflow-y-scroll hover:bg-gray-300 border-b-2 ">
                                    <div className="flex-shrink-0 w-2/5 h-32 ml-4">
                                        {course.thumbnailUrl && (
                                            <img src={course.thumbnailUrl} alt={`Thumbnail for ${course.name}`} className="w-full h-full object-cover rounded-md" />
                                        )}
                                    </div>
                                    <div className="flex-1 md:w-2/3 h-36 p-10">
                                        <Link to={`/instructor/courses/${course.courseId}`} className="text-[#818cf8] text-xl font-bold hover:underline">
                                            {course.name}
                                        </Link>
                                        <p className="text-gray-500 font-semibold">{course.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            {!isMobile && showCreateCourse && (
                <div className='border-l-4 md:w-1/2 md:ml-5'>
                    <CreateCourse onClose={handleCreateCourseClose} />
                </div>
            )}
        </div>
    );
};

export default InstructorCoursesList;
