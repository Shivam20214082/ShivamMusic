import React from 'react';
import SongItem from './SongItem';

function SongList() {
    const songs = [
        { title: "Billie Jean", album: "Thriller 25", duration: "4:18" },
        { title: "Beat It", album: "Thriller 25", duration: "4:17" },
        { title: "Smooth Criminal", album: "Bad 25", duration: "6:05" },
    ];

    return (
        <div className="song-list">
            <h3>Song List</h3>
            {songs.map((song, index) => (
                <SongItem key={index} song={song} />
            ))}
        </div>
    );
}

export default SongList;
