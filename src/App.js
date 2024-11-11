import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Button, Box, Typography, IconButton, TextField } from '@mui/material';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FaHome, FaMusic, FaList, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { useMediaQuery } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import Drawer from '@mui/material/Drawer';



const allContent = [
    { id: '1', type: 'Music', title: 'Ki Kariye', image: process.env.PUBLIC_URL + '/image1.png', duration: 225, album: 'Code Name Tiranga', file: process.env.PUBLIC_URL + '/assets/Ki_Kariye_-_Code_Name_Tiranga_128_Kbps.mp3' },
    { id: '2', type: 'Music', title: 'Tu Banke Hawa', image: process.env.PUBLIC_URL + '/image2.png', duration: 240, album: 'Dhokha Round D Corner', file: process.env.PUBLIC_URL + '/assets/Tu_Banke_Hawa_-_Dhokha_Round_D_Corner_128_Kbps.mp3' },
    { id: '3', type: 'Music', title: 'Dil De Diya Hai', image: process.env.PUBLIC_URL + '/image3.png', duration: 210, album: 'Thank God', file: process.env.PUBLIC_URL + '/assets/Dil_De_Diya_Hai_-_Thank_God_128_Kbps.mp3' },
    { id: '4', type: 'Music', title: 'Hume Tumse Pyaar Kitna (Female)', image: process.env.PUBLIC_URL + '/image4.png', duration: 255, album: 'Hume Tumse Pyaar Kitna', file: process.env.PUBLIC_URL + '/assets/Hume_Tumse_Pyaar_Kitna_-_Female_-_Hume_Tumse_Pyaar_Kitna_128_Kbps.mp3' },
    { id: '5', type: 'Music', title: 'Song 3', image: process.env.PUBLIC_URL + '/imag6.jpg', duration: 240, album: 'Album 3', file: process.env.PUBLIC_URL + '/assets/song3.mp3' },
    { id: '6', type: 'Podcast', title: 'Podcast 3', image: process.env.PUBLIC_URL + '/imag3.jpg', album: 'Podcast Album' },
    { id: '7', type: 'Live', title: 'Live Event 1', image: process.env.PUBLIC_URL + '/imag7.jpg', album: 'Live Album' },
    { id: '8', type: 'Radio', title: 'Radio Station 1', image: process.env.PUBLIC_URL + '/imag8.jpg', album: 'Radio Album' },
  ];
  
  
function App() {
  const [selectedContent, setSelectedContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [filteredContent, setFilteredContent] = useState(allContent);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:900px)');

  // Format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Filter content based on search and type selection
  useEffect(() => {
    const results = allContent.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedContent ? item.type === selectedContent : true;
      return matchesSearch && matchesType;
    });
    setFilteredContent(results);
  }, [searchTerm, selectedContent]);

  useEffect(() => {
    let timer;
    if (isPlaying && sound) {
      timer = setInterval(() => {
        setCurrentTime(sound.seek());
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup on unmount or stop
  }, [isPlaying, sound]);
  

  const handlePlayPause = (item) => {
    if (item.type === 'Music') {
        // If a song is already playing and it's clicked again, toggle between play and pause
        if (isPlaying && currentSong.id === item.id) {
            sound.pause();
        } else {
            if (sound) {
                sound.stop();  // Stop the previous sound if it exists
                setIsPlaying(false);  // Reset play state
            }

            const newSound = new Howl({
                src: [item.file],
                html5: true,
                onplay: () => {
                    setIsPlaying(true);
                    setCurrentSong(item);
                    setCurrentTime(0);
                },
                onpause: () => setIsPlaying(false),
                onend: () => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                    handleNextSong();
                }
            });

            setSound(newSound);
            newSound.play();  // Play new sound
        }
    } else {
        // For other content types like Podcast, Live, etc.
        setCurrentSong(item);
        setIsPlaying(false);
        setCurrentTime(0);
    }
};


  // Move to the next song
  const handleNextSong = () => {
    const currentIndex = filteredContent.findIndex(item => item.id === currentSong.id);
    const nextSong = filteredContent[(currentIndex + 1) % filteredContent.length];
    handlePlayPause(nextSong);
  };

  // Move to the previous song
  const handlePrevSong = () => {
    const currentIndex = filteredContent.findIndex(item => item.id === currentSong.id);
    const prevSong = filteredContent[(currentIndex - 1 + filteredContent.length) % filteredContent.length];
    handlePlayPause(prevSong);
  };

  return (
    <Box 
    className="app" 
    sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' } ,// flexDirection changes based on screen size
      fontSize: { xs: '0.75rem', sm: '1rem' }

    }}
  >
      {/* Sidebar */}


      {isSmallScreen ? (
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#6a232d', padding: '10px', width: '100wh' }}>
            <Typography variant="h6" color="white">DreamMusic</Typography>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <FaBars />
            </IconButton>
        </Box>
        ) : (
        /* Sidebar for larger screens */
        <Box flex={1} className="sidebar" sx={{ backgroundColor: '#6a232d', padding: '20px' }}>
            <Typography variant="h4" color="white" mb={2}>ShivamMusic</Typography>
            <Box display="flex" flexDirection="column" gap={2} mb={4}>
            <Button startIcon={<FaHome />} variant="text" color="white">Home</Button>
            <Button startIcon={<FaMusic />} variant="text" color="white">Trends</Button>
            <Button startIcon={<FaList />} variant="text" color="white">Library</Button>
            <Button startIcon={<FaSearch />} variant="text" color="white">Discover</Button>
            </Box>
            <Button startIcon={<FaCog />} variant="contained" color="secondary" fullWidth>Settings</Button>
            <Button startIcon={<FaSignOutAlt />} variant="contained" color="secondary" fullWidth>Logout</Button>
        </Box>
        )}

        {/* Drawer for small screens */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: '#1f1f1f', height: '100%' }} role="presentation">
            <Typography variant="h5" color="white" sx={{ padding: '20px' }}>DreamMusic</Typography>
            <Box display="flex" flexDirection="column" gap={2} sx={{ padding: '20px' }}>
            <Button startIcon={<FaHome />} variant="text" color="white">Home</Button>
            <Button startIcon={<FaMusic />} variant="text" color="white">Trends</Button>
            <Button startIcon={<FaList />} variant="text" color="white">Library</Button>
            <Button startIcon={<FaSearch />} variant="text" color="white">Discover</Button>
            </Box>
            <Button startIcon={<FaCog />} variant="contained" color="secondary" fullWidth onClick={() => setDrawerOpen(false)} sx={{ margin: '20px' }}>Settings</Button>
            <Button startIcon={<FaSignOutAlt />} variant="contained" color="secondary" fullWidth onClick={() => setDrawerOpen(false)} sx={{ margin: '20px' }}>Logout</Button>
        </Box>
        </Drawer>

      {/* Content */}
      <Box flex={3} className="content" sx={{ padding: '10px' ,overflow:'auto',backgroundColor:'#811e1e',}}>
      <Box 
  display="flex" 
  justifyContent="space-between" 
  alignItems="center" 
  mb={2}
  sx={{
    
    flexDirection: { xs: 'column', sm: 'row' }, // Stack items in a column for small screens
    alignItems: 'center' // Center items on both small and large screens
  }}
>
  {/* Buttons - Will be in a row for large screens, and stack for small screens */}
  <Box 
    display="flex" 
    justifyContent="space-between" 
    sx={{
      flexWrap: { xs: 'wrap', sm: 'nowrap' }, 
      width: '100%', 
      marginBottom: { xs: 2, sm: 0 }, // Add bottom margin for small screens for spacing
    }}
  >
    <Button 
    onClick={() => setSelectedContent('Music')} 
    variant={selectedContent === 'Music' ? 'contained' : 'outlined'}
    sx={{ backgroundColor: selectedContent === 'Music' ? '#0b0103' : 'transparent', color: selectedContent === 'Music' ? 'white' : 'inherit' }}
    >
    Music
    </Button>
    <Button 
    onClick={() => setSelectedContent('Podcast')} 
    variant={selectedContent === 'Podcast' ? 'contained' : 'outlined'}
    sx={{ backgroundColor: selectedContent === 'Podcast' ? '#0b0103' : 'transparent', color: selectedContent === 'Podcast' ? 'white' : 'inherit' }}
    >
    Podcast
    </Button>
    <Button 
    onClick={() => setSelectedContent('Live')} 
    variant={selectedContent === 'Live' ? 'contained' : 'outlined'}
    sx={{ backgroundColor: selectedContent === 'Live' ? '#0b0103' : 'transparent', color: selectedContent === 'Live' ? 'white' : 'inherit' }}
    >
    Live
    </Button>
    <Button 
    onClick={() => setSelectedContent('Radio')} 
    variant={selectedContent === 'Radio' ? 'contained' : 'outlined'}
    sx={{ backgroundColor: selectedContent === 'Radio' ? '#0b0103' : 'transparent', color: selectedContent === 'Radio' ? 'white' : 'inherit' }}
    >
    Radio
    </Button>

  </Box>

  {/* Search Bar - On second line for small screens, right of buttons for large screens */}
  <TextField 
    variant="outlined" 
    size="small" 
    label="Search" 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
    sx={{ width: { xs: '100%', sm: 'auto' }, marginLeft: { sm: 2 } }} // Full width for small, auto width for large
  />
</Box>

        
        <Typography variant="h5"  color="primary" mb={2}>Popular</Typography>
        
        {/* List of content */}
        <Box >
          {filteredContent.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                  backgroundColor:'#6d2b34e0',
                padding: '10px',
                marginBottom: '10px',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                width: '100%',
              }}
              onClick={() => handlePlayPause(item)}
            >
              <Typography variant="body2" sx={{ flex: '0 0 50px', textAlign: 'center', marginRight: '10px' }}>{item.id}</Typography>
              <img src={item.image} alt={item.title} style={{ width: '45px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
              <Typography variant="body1" fontWeight="bold" sx={{ flex: '1 1 auto', marginRight: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ flex: '0 0 100px', textAlign: 'center', fontSize: '12px', marginRight: '10px' }}>{item.album}</Typography>
              <Typography variant="body2" sx={{ flex: '0 0 60px', textAlign: 'center', fontSize: '12px', marginRight: '10px' }}>{item.duration ? formatTime(item.duration) : '-'}</Typography>
              <Button variant="outlined" onClick={(e) => { e.stopPropagation(); handlePlayPause(item); }}>
                {isPlaying && currentSong && currentSong.id === item.id ? 'Pause' : 'Play'}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Now Playing Section */}
<Box
  flex={1}
  className="now-playing"
  sx={{
    padding: { xs: '10px', md: '20px' },
    // backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    alignItems: 'center',
    justifyContent: 'center',
    position: { xs: 'fixed', md: 'static' },
    bottom: { xs: 0, md: 'auto' },
    left: 0,
    width: { xs: '100%', md: 'auto' },
    height:{xs:'10%',md:'auto'},
    gap: { xs: 1, md: 2 },
    borderTop: { xs: '1px solid #ccc', md: 'none' },
    backgroundColor:'#811616'
  }}
>
  <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' } }}>Now Playing</Typography>
  {currentSong ? (
    <>
      <img
        src={currentSong.image}
        alt={currentSong.title}
        style={{
          width: { xs: '50px', md: '150px' },
          height: { xs: '50px', md: '150px' },
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: { xs: 0, md: '20px' },
          marginRight: { xs: '10px', md: 0 },
        }}
      />
      <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
        <Typography variant="body1" fontWeight="bold">{currentSong.title}</Typography>
        <Typography variant="body2" color="textSecondary">{currentSong.album}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} sx={{ marginLeft: { xs: 'auto', md: 0 } }}>
        <IconButton onClick={handlePrevSong}><FaStepBackward /></IconButton>
        <IconButton onClick={() => handlePlayPause(currentSong)}>{isPlaying ? <FaPause /> : <FaPlay />}</IconButton>
        <IconButton onClick={handleNextSong}><FaStepForward /></IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ marginLeft: { xs: 'auto', md: 0 } }}>
        {formatTime(currentTime)} / {currentSong.duration ? formatTime(currentSong.duration) : '-'}
      </Typography>
    </>
  ) : (
    <Typography variant="body2" color="textSecondary">No song selected</Typography>
  )}
</Box>
</Box>
  );
}

export default App;
