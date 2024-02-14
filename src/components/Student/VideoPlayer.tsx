import React, { useEffect, useState } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    materialName: string;
    materialDescription: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, materialName, materialDescription }) => {
    const [videoId, setVideoId] = useState<string>('');

    useEffect(() => {
        const extractedVideoId = extractYouTubeVideoId(videoUrl);
        setVideoId(extractedVideoId);

        return () => {
            const youtubeVideo = document.getElementById('youtubeVideo') as HTMLIFrameElement | null;
            if (youtubeVideo) {
                youtubeVideo.src = '';
            }
        };
    }, [videoUrl]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center font-[Vollkorn]">
            <h1 className="text-2xl font-bold mb-4">{materialName}</h1>
            <div className="mb-4 w-3/4 h-[60vh]">
                <iframe
                    title={materialName}
                    id="youtubeVideo"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allowFullScreen
                ></iframe>
            </div>
            <p className="text-gray-550 text-start">{materialDescription}</p>
        </div>
    );
};

const extractYouTubeVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
};

export default VideoPlayer;
