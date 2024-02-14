import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { RiDragMoveFill } from "react-icons/ri";
import CreateCourseMaterial from './CreateCourseMaterial'
import axios from 'axios';
import EditLectureDetails from './EditLecture';

interface CourseMaterial {
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

const CourseDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [createClicked, setCreateClicked] = useState<boolean>(false);
    const [courseDetails, setCourseDetails] = useState<{
        name: string;
        description: string;
        courseMaterials: CourseMaterial[];
    } | null>(null);
    const [editingCourseMaterial, setEditingCourseMaterial] = useState<{
        id: string;
        name: string;
        description: string;
        thumbnailUrl: string;
        videoUrl: string;
    } | null>(null);

    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        courseMaterialId: string;
    }>({ isOpen: false, courseMaterialId: '' });


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`https://localhost:7250/api/courses/${id}/materials`);
                    console.log(response.data);
                    setCourseDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleDeleteConfirmation = (courseMaterialId: string) => {
        setDeleteConfirmation({ isOpen: true, courseMaterialId });
    };

    const handleDeletecourseMaterial = async () => {
        if (courseDetails && deleteConfirmation.courseMaterialId) {
            console.log(deleteConfirmation.courseMaterialId);
            try {
                // Make a delete request to the backend with the specific material id
                await axios.delete(`https://localhost:7250/api/courses/material/${deleteConfirmation.courseMaterialId}`);

                // Update the local state to reflect the deletion
                const updatedcourseMaterials = courseDetails.courseMaterials.filter(
                    (courseMaterial) => courseMaterial.id !== deleteConfirmation.courseMaterialId
                );
                setCourseDetails({ ...courseDetails, courseMaterials: updatedcourseMaterials });
                setDeleteConfirmation({ isOpen: false, courseMaterialId: '' });
            } catch (error) {
                console.error('Error deleting course material:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmation({ isOpen: false, courseMaterialId: '' });
    };

    const handleEditcourseMaterial = (
        courseMaterialId: string,
        courseMaterialName: string,
        courseMaterialDescription: string,
        courseMaterialThumbnailUrl: string,
        courseMaterialVideoUrl: string
    ) => {
        setEditingCourseMaterial({
            id: courseMaterialId,
            name: courseMaterialName,
            description: courseMaterialDescription,
            thumbnailUrl: courseMaterialThumbnailUrl,
            videoUrl: courseMaterialVideoUrl,
        });
    };


    const handleSaveCourseMaterialDetails = async (
        materialId: string,
        name: string,
        description: string,
        thumbnailUrl: string,
        videoUrl: string
    ) => {
        try {
            console.log(materialId, name,
                description,
                thumbnailUrl,
                videoUrl,);
            await axios.put(`https://localhost:7250/api/courses/material/${materialId}`, {
                materialId,
                name,
                description,
                thumbnailUrl,
                videoUrl,
            });
            if (courseDetails) {
                const updatedcourseMaterials = courseDetails.courseMaterials.map((courseMaterial) =>
                    courseMaterial.id === materialId
                        ? { ...courseMaterial, name, description, thumbnailUrl, videoUrl }
                        : courseMaterial
                );
                setCourseDetails({ ...courseDetails, courseMaterials: updatedcourseMaterials });
            }

            // Close the edit modal
            setEditingCourseMaterial(null);
        } catch (error) {
            console.error('Error updating course material details:', error);
        }
    };


    const handleCreatecourseMaterial = () => {
        setCreateClicked(true);
    };



    const handleSaveCreatecourseMaterial = async (name: string, description: string, youtubeUrl: string, thumbnailUrl: string) => {
        try {

            await axios.post('https://localhost:7250/api/courses/material', {
                courseId: id,
                name: name,
                description: description,
                videoUrl: youtubeUrl,
                thumbnailUrl: thumbnailUrl,
            });
            setCreateClicked(false);
        } catch (error) {
            console.error('Error creating course material:', error);
        }
    };




    const handleCancelCreatecourseMaterial = () => {
        setCreateClicked(false);
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.dataTransfer.setData('text/plain', String(index));
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index && courseDetails) {
            const updatedcourseMaterials = [...courseDetails.courseMaterials];
            const draggedcourseMaterial = updatedcourseMaterials[draggedIndex];
            updatedcourseMaterials.splice(draggedIndex, 1);
            updatedcourseMaterials.splice(index, 0, draggedcourseMaterial);
            setCourseDetails({ ...courseDetails, courseMaterials: updatedcourseMaterials });
            setDraggedIndex(null);
        }
    };


    return (
        <div className="w-full h-svh flex justify-center font-[Vollkorn]">
            {courseDetails ? (
                <div className="w-3/4 h-[85svh] overflow-y-scroll">
                    <h1 className="text-2xl font-bold">{courseDetails.name}</h1>
                    <p className="text-gray-500 mb-5">{courseDetails.description}</p>

                    {courseDetails.courseMaterials && courseDetails.courseMaterials.length > 0 ? (
                        <ul>
                            {courseDetails.courseMaterials && courseDetails.courseMaterials.map((courseMaterial, index) => (
                                <li
                                    key={courseMaterial.id}
                                    className="flex items-center border-b-4 p-2 rounded-xl hover:bg-gray-300 mb-4"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDrop={(e) => handleDrop(e, index)}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 ml-2">
                                        <RiDragMoveFill className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div className="flex-shrink-0 w-1/3 h-[26svh] ml-4">
                                        {courseMaterial.thumbnailUrl && (
                                            <img
                                                src={courseMaterial.thumbnailUrl}
                                                alt={`Thumbnail for ${courseMaterial.name}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 items-start justify-start  md:w-2/3 h-[26svh] p-10">
                                        <div className='flex h-full flex-col items-start justify-start overflow-y-scroll'>
                                            <h2 className="text-xl font-bold  text-[#4c4d95]">{courseMaterial.name}</h2>
                                            <p className=" text-gray-550 text-start">{courseMaterial.description}</p>
                                        </div>
                                        <div className="flex space-x-2 float-right">
                                            <button
                                                onClick={() => handleEditcourseMaterial(
                                                    courseMaterial.id,
                                                    courseMaterial.name,
                                                    courseMaterial.description,
                                                    courseMaterial.thumbnailUrl,
                                                    courseMaterial.videoUrl
                                                )}
                                                className="text-black px-2 py-1 rounded-full"
                                            >
                                                <MdEdit className="w-6 h-6" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteConfirmation(courseMaterial.id)}
                                                className=" text-red-500 px-2 py-1 rounded-full"
                                            >
                                                <MdDelete className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Henüz hiç ders yok.</p>
                    )}

                    <button
                        onClick={handleCreatecourseMaterial}
                        className="bg-gray-500 w-1/14 h-12 text-white px-2 py-1 rounded-md mt-4"
                    >
                        Ders Ekle
                    </button>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}
            {deleteConfirmation.isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-md">
                        <p className="text-lg mb-4">Bu dersi silmek istediğinize emin misiniz?</p>
                        <div className="flex justify-end">
                            <button onClick={handleDeletecourseMaterial} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Sil
                            </button>
                            <button onClick={handleCancelDelete} className="ml-2 bg-gray-500 text-white p-2 rounded-md">
                                İptal Et
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {editingCourseMaterial && (
                <div>
                    <EditLectureDetails
                        lectureId={editingCourseMaterial.id}
                        initialName={editingCourseMaterial.name}
                        initialDescription={editingCourseMaterial.description}
                        initialThumbnailUrl={editingCourseMaterial.thumbnailUrl}
                        initialYoutubeUrl={editingCourseMaterial.videoUrl}
                        onClose={() => setEditingCourseMaterial(null)}
                        onSave={(name, description, thumbnailUrl, youtubeUrl) =>
                            handleSaveCourseMaterialDetails(editingCourseMaterial.id, name, description, thumbnailUrl, youtubeUrl)
                        }
                    />
                </div>

            )}
            {createClicked && (
                <CreateCourseMaterial
                    onClose={handleCancelCreatecourseMaterial}
                    onSave={handleSaveCreatecourseMaterial}
                />
            )}
        </div>
    );
};

export default CourseDetails;

