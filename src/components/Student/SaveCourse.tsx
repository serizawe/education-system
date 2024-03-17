import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface CourseMaterial {
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

const StudentCourseDetailsWithSave: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const courseId = id;
    const studentId = useAppSelector(state => state.auth.userId);
    const [courseDetails, setCourseDetails] = useState<{
        name: string;
        description: string;
        courseMaterials: CourseMaterial[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCourseSaved, setIsCourseSaved] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (courseId) {
                    const response = await axios.get(`https://localhost:7250/api/courses/${courseId}/materials`);
                    setCourseDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
                setError('Error fetching course details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    useEffect(() => {
        const checkEnrollmentStatus = async () => {
            try {
                if (courseId && studentId) {
                    const response = await axios.get(`https://localhost:7250/api/courses/${courseId}/enrollment-status/${studentId}`);
                    setIsCourseSaved(response.data.enrolled);
                }
            } catch (error) {
                console.error('Error checking enrollment status:', error);
            }
        };

        checkEnrollmentStatus();
    }, [courseId, studentId]);

    const handleSaveCourse = async () => {
        try {
            if (courseId && studentId) {
                const response = await axios.post(
                    `https://localhost:7250/api/courses/${courseId}/enroll`,
                    JSON.stringify(studentId),
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (response.status === 201) {
                    setIsCourseSaved(true);
                    console.log(response.data);
                } else {
                    console.error('Enrollment failed:', response.data);
                }
            }
        } catch (error) {
            console.error('Error enrolling in the course:', error);
        }
    };

    return (
        <div className="w-full h-full flex justify-center font-[Vollkorn]">
            {isLoading && <p>Loading...</p>}
            {!isLoading && error && <p>{error}</p>}
            {!isLoading && courseDetails && courseDetails.courseMaterials.length > 0 ? (
                <div className="w-3/4 h-[85svh] overflow-y-scroll">
                    <h1 className="text-2xl font-bold">{courseDetails.name}</h1>
                    <p className="text-gray-550">{courseDetails.description}</p>
                    <ul>
                        {courseDetails.courseMaterials.map((material) => (
                            <li
                                key={material.id}
                                className="flex items-center border-b-4 p-2 rounded-xl hover:bg-gray-300 mb-4"
                            >
                                <div className="flex-shrink-0 w-1/3 h-[26svh] ml-4">
                                    {material.thumbnailUrl && (
                                        <img
                                            src={material.thumbnailUrl}
                                            alt={`Thumbnail for ${material.name}`}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 items-start justify-start md:w-2/3 h-[26svh] p-10">
                                    <div className="flex h-full flex-col items-start justify-start overflow-y-scroll">
                                        <h2 className="text-xl font-bold text-[#4c4d95]">{material.name}</h2>
                                        <p className="text-gray-550 text-start">{material.description}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isCourseSaved === true && (
                        <button
                            disabled
                            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md"
                        >
                            Kaydolundu
                        </button>
                    )}
                    {isCourseSaved !== true && (
                        <button
                            onClick={handleSaveCourse}
                            className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-md"
                        >
                            Kursa Kaydol
                        </button>
                    )}
                </div>
            ) : (
                <p>Henüz kurs içeriği yok.</p>
            )}
        </div>
    );
};

export default StudentCourseDetailsWithSave;
