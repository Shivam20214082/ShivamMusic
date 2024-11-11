import React, { useState } from 'react';

function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player-container">
            <div className="controls">
                <button>Prev</button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <button>Next</button>
            </div>
        </div>
    );
}

export default MusicPlayer;
