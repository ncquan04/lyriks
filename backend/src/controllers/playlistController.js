const playlistService = require('../services/playlistService');

exports.getUserPlaylists = async (req, res) => {
    try {
        const { userId } = req.body; 
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const playlists = await playlistService.getPlaylistByUserId(userId);
        res.status(200).json({ success: true, playlists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.createPlaylist = async (req, res) => {
    try {
        const { userId, name } = req.body;
        if (!userId || !name) {
            return res.status(400).json({ success: false, message: 'User ID and name are required' });
        }
        const playlist = await playlistService.createPlaylist(userId, name);
        res.status(201).json({ success: true, playlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.deletePlaylist = async (req, res) => {
    try {
        const { playlistId, userId } = req.body;
        if (!playlistId || !userId) {
            return res.status(400).json({ success: false, message: 'Playlist ID and user ID are required' });
        }
        await playlistService.deletePlaylist(playlistId, userId);
        res.status(200).json({ success: true, message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getPlaylistSongs = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const songIds = await playlistService.getPlaylistSongs(playlistId);
        res.status(200).json({ success: true, songIds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;
    if (!playlistId || !songId) {
        return res.status(400).json({ success: false, message: 'Playlist ID and song ID are required' });
    }
    try {
        await playlistService.addSongToPlaylist(playlistId, songId);
        res.status(200).json({ success: true, message: 'Song added to playlist successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;
    if (!playlistId || !songId) {
        return res.status(400).json({ success: false, message: 'Playlist ID and song ID are required' });
    }
    try {
        await playlistService.removeSongFromPlaylist(playlistId, songId);
        res.status(200).json({ success: true, message: 'Song removed from playlist successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};