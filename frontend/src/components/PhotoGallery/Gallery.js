// Gallery.js
import React from 'react';

const Gallery = ({ photos }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
    {photos.length === 0 && <p>No photos yet.</p>}
    {photos.map((photo, i) => (
      <img
        key={i}
        src={photo.path}
        alt={photo.caption || 'Photo'}
        style={{ width: '100%', borderRadius: 8, boxShadow: '0 1px 4px #f0e6c6' }}
      />
    ))}
  </div>
);

export default Gallery;
