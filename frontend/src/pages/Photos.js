// Photos.js
import React from 'react';
import Gallery from '../components/PhotoGallery/Gallery';

const Photos = () => (
  <div>
    <h1>Photo Gallery</h1>
    {/* TODO: Add upload form and fetch photos from backend */}
    <Gallery photos={[]} />
  </div>
);

export default Photos;
