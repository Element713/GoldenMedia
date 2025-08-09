
import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/Profile/ProfileCard';
import Gallery from '../components/PhotoGallery/Gallery';
import { Link } from 'react-router-dom';

const defaultUser = {
  name: '',
  avatarUrl: '',
  bio: '',
  birthday: '',
};

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [birthday, setBirthday] = useState('');
  const [photos, setPhotos] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch user profile, photos, and games
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // 1. Fetch user profile
        const resUser = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!resUser.ok) throw new Error('Failed to fetch user profile');
        const userData = await resUser.json();
        setUser(userData);
        setBio(userData.bio || '');
        setAvatarUrl(userData.avatarUrl || '');
        setBirthday(userData.birthday ? userData.birthday.slice(0,10) : '');

        // 2. Fetch user photos
        const resPhotos = await fetch(`/api/photos?userId=${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!resPhotos.ok) throw new Error('Failed to fetch photos');
        const photosData = await resPhotos.json();
        setPhotos(photosData);

        // 3. Fetch active games
        const resGames = await fetch(`/api/games?userId=${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!resGames.ok) throw new Error('Failed to fetch games');
        const gamesData = await resGames.json();
        setGames(gamesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  // Save profile changes
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bio, avatarUrl, birthday })
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updated = await res.json();
      setUser(updated);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Upload photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setError('');
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const res = await fetch('/api/photos/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Photo upload failed');
      const newPhoto = await res.json();
      setPhotos(p => [newPhoto, ...p]);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <ProfileCard user={{ ...user, bio, avatarUrl, birthday }} />
      {editMode ? (
        <form className="card" style={{ maxWidth: 400, margin: '1rem auto' }} onSubmit={handleSave}>
          <label>Bio:
            <textarea value={bio} onChange={e => setBio(e.target.value)} />
          </label>
          <label>Avatar URL:
            <input value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://..." />
          </label>
          <label>Birthday:
            <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>Cancel</button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}

      <div className="card" style={{ marginBottom: 24 }}>
        <h2>Photo Album Preview</h2>
        <Gallery photos={photos} />
        <label style={{ display: 'block', marginTop: 16 }}>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
          <button type="button">Upload Photos</button>
        </label>
      </div>

      <div className="card">
        <h2>Active Games</h2>
        {games.length === 0 ? <p>No active games.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {games.map(game => (
              <li key={game.id || game._id} style={{ marginBottom: 8 }}>
                <Link to="/games">{game.name}</Link> <span style={{ color: '#888' }}>({game.status})</span>
              </li>
            ))}
          </ul>
        )}
        <Link to="/games"><button style={{ marginTop: 8 }}>Go to Games</button></Link>
      </div>
    </div>
  );
};

export default Profile;

