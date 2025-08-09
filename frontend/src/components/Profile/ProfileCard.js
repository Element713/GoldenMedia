// ProfileCard.js
import React from 'react';

const ProfileCard = ({ user }) => (
  <div className="card" style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
    <img
      src={user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User')}
      alt="Avatar"
      style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
    />
    <h2>{user?.name}</h2>
    <p style={{ color: '#888' }}>{user?.bio || 'No bio yet.'}</p>
    {user?.birthday && <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>}
  </div>
);

export default ProfileCard;
