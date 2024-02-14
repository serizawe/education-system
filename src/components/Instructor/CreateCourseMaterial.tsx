import React, { useState } from 'react';

interface CreateLectureProps {
    onClose: () => void;
    onSave: (name: string, description: string, youtubeUrl: string, thumbnailUrl: string) => void;
}

const CreateLecture: React.FC<CreateLectureProps> = ({ onClose, onSave }) => {
    const [lectureName, setLectureName] = useState('');
    const [lectureDescription, setLectureDescription] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');


    const handleSave = () => {
        onSave(lectureName, lectureDescription, youtubeUrl, thumbnailUrl);
        onClose();
    };

    return (
        <div className="fixed top-0 h-full left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex items-center justify-center font-[Vollkorn]">
            <div className="bg-white w-2/3 h-4/5 p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Ders Ekle</h2>
                <div className="mb-4">
                    <label htmlFor="lectureName" className="block text-sm font-medium text-gray-700">
                        Ders Başlığı
                    </label>
                    <input
                        type="text"
                        id="lectureName"
                        value={lectureName}
                        onChange={(e) => setLectureName(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div className="mb-6 h-1/2">
                    <label htmlFor="lectureDescription" className="block text-sm font-medium text-gray-700">
                        Ders Açıklaması
                    </label>
                    <textarea
                        id="lectureDescription"
                        value={lectureDescription}
                        onChange={(e) => setLectureDescription(e.target.value)}
                        className="mt-1 h-full p-2 block w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
                        YouTube Video URL
                    </label>
                    <input
                        type="text"
                        id="youtubeUrl"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
                        Thumbnail URL
                    </label>
                    <input
                        type="text"
                        id="thumbnailUrl"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Kaydet
                    </button>
                    <button onClick={onClose} className="ml-2 p-2 rounded-md bg-red-500 text-white">
                        İptal Et
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateLecture;
