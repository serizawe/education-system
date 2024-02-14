import React, { useState } from 'react';

interface EditLectureDetailsProps {
    lectureId: string;
    initialName: string;
    initialDescription: string;
    initialThumbnailUrl: string;
    initialYoutubeUrl: string;
    onClose: () => void;
    onSave: (name: string, description: string, thumbnailUrl: string, youtubeUrl: string) => void;
}

const EditLectureDetails: React.FC<EditLectureDetailsProps> = ({
    lectureId,
    initialName,
    initialDescription,
    initialThumbnailUrl,
    initialYoutubeUrl,
    onClose,
    onSave,
}) => {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [youtubeUrl, setYoutubeUrl] = useState(initialYoutubeUrl);

    const handleSave = () => {
        onSave(name, description, thumbnailUrl, youtubeUrl);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center font-[Vollkorn] bg-gray-700 bg-opacity-50">
            <div className="bg-white h-5/6 p-8 rounded-md w-1/2">
                <h2 className="text-2xl font-bold mb-8">Edit Lecture Details</h2>
                <label className="block mb-2">
                    Ders Adı:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border w-full mt-4 p-2"
                    />
                </label>
                <label className="block mb-2">
                    Ders Açıklaması:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border block w-full h-24 mt-4 p-2 resize-none"
                    />
                </label>
                <label className="block mb-2">
                    Thumbnail URL:
                    <input
                        type="text"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        className="border w-full mt-4 p-2"
                    />
                </label>
                <label className="block mb-16">
                    YouTube Video URL:
                    <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="border w-full mt-4 p-2"
                    />
                </label>
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Kaydet
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        İptal Et
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditLectureDetails;
