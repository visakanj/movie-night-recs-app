import React, { useState } from 'react';
import { PlusCircle, Plus, LogIn, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { RoomCard } from '../components/RoomCard';
import { BottomNav } from '../components/BottomNav';
import { ActionSheet, ActionSheetOption } from '../components/ActionSheet';
export function RoomsScreen() {
  const navigate = useNavigate();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const rooms = [{
    id: '1',
    name: 'Friday Movie Night',
    memberCount: 4,
    active: true
  }, {
    id: '2',
    name: 'Horror Club',
    memberCount: 12,
    lastActive: '2d ago'
  }, {
    id: '3',
    name: 'Oscar Season',
    memberCount: 6,
    lastActive: '1w ago'
  }];
  const handleCreateRoom = () => {
    setIsActionSheetOpen(false);
    navigate('/create-room');
  };
  const handleJoinRoom = () => {
    setIsActionSheetOpen(false);
    navigate('/join-room'); // Assuming this route exists based on context, if not it might be /invite or similar, but prompt said /join-room
  };
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="Rooms" action={<button onClick={() => setIsActionSheetOpen(true)} className="p-2 -mr-2 text-accent hover:text-accent-hover transition-colors rounded-full active:bg-white/10" aria-label="Add or join room">
            <PlusCircle size={24} />
          </button>} />

      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-text-primary tracking-tight">
            Your Rooms
          </h2>
          <p className="text-text-tertiary mt-1 text-base">
            Join a room to start picking.
          </p>
        </div>

        <div className="space-y-4">
          {rooms.map(room => <RoomCard key={room.id} {...room} />)}
        </div>
      </main>

      <ActionSheet isOpen={isActionSheetOpen} onClose={() => setIsActionSheetOpen(false)} title="Add Room">
        <ActionSheetOption icon={<Plus size={24} />} label="Create New Room" description="Start a new movie group" rightIcon={<ChevronRight size={20} />} onClick={handleCreateRoom} />
        <ActionSheetOption icon={<LogIn size={24} />} label="Join Existing Room" description="Enter an invite code" rightIcon={<ChevronRight size={20} />} onClick={handleJoinRoom} />
      </ActionSheet>

      <BottomNav />
    </div>;
}