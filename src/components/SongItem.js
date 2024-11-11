import React from 'react';

function SongItem({ song }) {
    return (
        <div className="song-item">
            <span>{song.title}</span>
            <span>{song.album}</span>
            <span>{song.duration}</span>
        </div>
    );
}

export default SongItem;
