import React, { useState } from 'react';
import { useAppSelector } from '../../redux/store';
import axios from 'axios';

interface Course {
    name: string;
    description: string;
    thumbnailUrl: string; 
}

interface CourseCreationComponentProps {
    onClose: () => void;
}

const CourseCreationComponent: React.FC<CourseCreationComponentProps> = ({ onClose }) => {
    const [course, setCourse] = useState<Course>({
        name: '',
        description: '',
        thumbnailUrl: '', 
    });
    const instructorId = useAppSelector(state => state.auth.userId);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
    };

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7250/api/courses', JSON.stringify({
                ...course,
                instructorId: instructorId,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Course created successfully:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };


    return (
        <div className="mx-4 max-w-2xl font-[Vollkorn] mt-8">
            <h1 className="text-2xl font-bold mb-4 text-[#4c1d95]">Kurs Oluştur</h1>
            <form onSubmit={handleCreateCourse}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Kurs Adı
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={course.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                        Kurs Açıklaması
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-600">
                        Thumbnail URL
                    </label>
                    <input
                        type="text"
                        id="thumbnailUrl"
                        name="thumbnailUrl"
                        value={course.thumbnailUrl}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {course.thumbnailUrl && (
                        <img
                            src={course.thumbnailUrl}
                            alt="Course Thumbnail"
                            className="mt-2 mx-auto w-32 h-32 object-cover rounded-md"
                        />
                    )}
                </div>

                <button type="submit" className="bg-gray-500 text-white text-bold px-4 py-2 rounded-md mt-4">
                    Kurs Oluştur
                </button>
                <button type="button" onClick={onClose} className="bg-red-500 text-white text-bold px-4 py-2 rounded-md mt-4 ml-4">
                    İptal Et
                </button>
            </form>
        </div>
    );
};

export default CourseCreationComponent;
