import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoomsScreen } from './pages/RoomsScreen';
import { PoolScreen } from './pages/PoolScreen';
import { PickScreen } from './pages/PickScreen';
import { TonightScreen } from './pages/TonightScreen';
import { WatchedScreen } from './pages/WatchedScreen';
import { CreateRoomScreen } from './pages/CreateRoomScreen';
import { JoinRoomScreen } from './pages/JoinRoomScreen';
import { InviteScreen } from './pages/InviteScreen';
export function App() {
  return <Router>
      <div className="min-h-screen bg-background text-text-primary font-sans antialiased selection:bg-accent/30">
        <Routes>
          <Route path="/" element={<RoomsScreen />} />
          <Route path="/pool" element={<PoolScreen />} />
          <Route path="/pick" element={<PickScreen />} />
          <Route path="/tonight" element={<TonightScreen />} />
          <Route path="/watched" element={<WatchedScreen />} />
          <Route path="/create-room" element={<CreateRoomScreen />} />
          <Route path="/join-room" element={<JoinRoomScreen />} />
          <Route path="/room/:id/invite" element={<InviteScreen />} />
          {/* Fallback for room detail route to pool for now */}
          <Route path="/room/:id" element={<PoolScreen />} />
        </Routes>
      </div>
    </Router>;
}