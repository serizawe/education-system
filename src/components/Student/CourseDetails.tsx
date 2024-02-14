import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer'; // Make sure to adjust the import path
import { CiGrid41, CiBoxList } from 'react-icons/ci';
import axios from 'axios';

interface CourseMaterial {
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

const StudentCourseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const courseId = id;
    const [courseMaterials, setCourseMaterials] = useState<CourseMaterial[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<CourseMaterial | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (courseId) {
                    const response = await axios.get(`https://localhost:7250/api/courses/${courseId}/materials`);
                    setCourseMaterials(response.data.courseMaterials);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchData();
    }, [courseId]);

    const handleMaterialClick = (material: CourseMaterial) => {
        setSelectedMaterial(material);
    };

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
    };

    return (
        <div className="w-full h-full flex justify-center font-[Vollkorn]">
            {courseMaterials.length > 0 ? (
                <div className="w-5/6 h-[85vh] overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Kurs içeriği</h1>
                    <button
                        className="cursor-pointer flex justify-end ml-2 p-2 text-purple-600 hover:text-purple-800"
                        onClick={toggleViewMode}
                    >
                        {viewMode === 'list' ? <CiGrid41 className=' size-6' /> : <CiBoxList className='size-6' />}
                    </button>
                    {viewMode === 'list' ? (
                        <ul>
                            {courseMaterials.map((material) => (
                                <li
                                    key={material.id}
                                    className="flex items-start border-b-4 ml-4 p-2 rounded-xl hover:bg-gray-300 mb-4"
                                    onClick={() => handleMaterialClick(material)}
                                >
                                    <div className="flex-shrink-0 w-1/3 h-[26vh] ml-4">
                                        {material.thumbnailUrl && (
                                            <img
                                                src={material.thumbnailUrl}
                                                alt={`Thumbnail for ${material.name}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 items-start justify-start md:w-2/3 h-[26vh] p-10">
                                        <div className="flex h-full flex-col items-start justify-start overflow-y-scroll">
                                            <h2 className="text-xl font-bold text-[#4c4d95]">{material.name}</h2>
                                            <p className="text-gray-550 text-start">{material.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="w-full grid grid-cols-3 gap-3">
                            {courseMaterials.map((material) => (
                                <div
                                    key={material.id}
                                    className="flex flex-col justify-center ml-4   items-stretch w-full border-b-4 rounded-xl hover:bg-gray-300 mb-4"
                                    onClick={() => handleMaterialClick(material)}
                                >
                                    <div className=" w-full h-[26vh] p-4">
                                        {material.thumbnailUrl && (
                                            <img
                                                src={material.thumbnailUrl}
                                                alt={`Thumbnail for ${material.name}`}
                                                className="w-11/12 h-full object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                    <div className="w-full p-2 ">
                                        <div className="flex w- h-full flex-col items-start justify-start overflow-y-scroll">
                                            <h2 className="text-xl font-bold text-[#4c4d95]">{material.name}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p>Henüz kurs içeriği yok.</p>
            )}

            {selectedMaterial && (

                <div className="w-3/4 h-[85vh] flex justify-center items-center">
                    <VideoPlayer
                        videoUrl={selectedMaterial.videoUrl}
                        materialName={selectedMaterial.name}
                        materialDescription={selectedMaterial.description}
                    />
                </div>
            )}
        </div>
    );
};

export default StudentCourseDetails;
