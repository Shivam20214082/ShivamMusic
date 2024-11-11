import React from 'react';

function Podcast() {
    const podcasts = [
        { title: "Tech Talks", host: "John Doe", duration: "35:45" },
        { title: "Health & Wellness", host: "Jane Smith", duration: "42:10" },
        { title: "Marketing Strategies", host: "Mike Johnson", duration: "25:30" }
    ];

    return (
        <div className="podcast-list">
            <h3>Podcast List</h3>
            {podcasts.map((podcast, index) => (
                <div key={index} className="podcast-item">
                    <span>{podcast.title}</span>
                    <span>{podcast.host}</span>
                    <span>{podcast.duration}</span>
                </div>
            ))}
        </div>
    );
}

export default Podcast;
