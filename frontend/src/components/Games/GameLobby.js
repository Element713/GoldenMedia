// GameLobby.js
import React from 'react';

const GameLobby = () => (
  <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
    <h2>Game Lobby</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li>Go Fish (coming soon)</li>
      <li>Crazy Eights (coming soon)</li>
      <li>Memory Match (coming soon)</li>
    </ul>
    <button disabled style={{ marginTop: 16 }}>Create Game</button>
  </div>
);

export default GameLobby;
