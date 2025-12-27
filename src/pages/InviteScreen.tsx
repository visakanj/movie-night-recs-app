import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
import { InviteCodeCard } from '../components/InviteCodeCard';
import { InviteLinkCard } from '../components/InviteLinkCard';
import { MembersList, Member } from '../components/MembersList';
import { PendingInvitesList, PendingInvite } from '../components/PendingInvitesList';
// Mock data
const MOCK_DATA = {
  code: 'ABC123',
  link: 'https://movienight.app/join/abc123',
  roomName: 'Friday Movie Night',
  members: [{
    id: '1',
    name: 'You',
    avatar: '👤',
    role: 'host'
  }, {
    id: '2',
    name: 'Sarah',
    avatar: '👩‍💻',
    role: 'member'
  }, {
    id: '3',
    name: 'Mike',
    role: 'member'
  }, {
    id: '4',
    name: 'Jessica',
    avatar: '🎨',
    role: 'member'
  }] as Member[],
  pendingInvites: [{
    id: '1',
    recipient: 'john@example.com',
    sentAt: new Date(Date.now() - 86400000)
  }, {
    id: '2',
    recipient: 'alex@example.com',
    sentAt: new Date(Date.now() - 172800000)
  }] as PendingInvite[]
};
export function InviteScreen() {
  const {
    id
  } = useParams();
  const [pendingInvites, setPendingInvites] = useState(MOCK_DATA.pendingInvites);
  const handleResend = (inviteId: string) => {
    // Mock API call
    console.log('Resending invite:', inviteId);
    // Show toast or feedback here
  };
  const handleCancel = (inviteId: string) => {
    // Mock API call
    if (window.confirm('Are you sure you want to cancel this invite?')) {
      setPendingInvites(prev => prev.filter(i => i.id !== inviteId));
    }
  };
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="Invite Friends" showBack={true} />

      <main className="pt-20 px-4 max-w-md mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
            Grow your circle
          </h2>
          <p className="text-text-tertiary text-sm">
            Share the code or link to add friends to <br />
            <span className="text-accent font-medium">
              {MOCK_DATA.roomName}
            </span>
          </p>
        </div>

        {/* Primary Actions */}
        <div className="space-y-4">
          <InviteCodeCard code={MOCK_DATA.code} expiresAt={new Date(Date.now() + 86400000 * 2)} />

          <InviteLinkCard link={MOCK_DATA.link} roomName={MOCK_DATA.roomName} />
        </div>

        <div className="h-px bg-white/[0.06] w-full" />

        {/* Lists */}
        <div className="space-y-8">
          <MembersList members={MOCK_DATA.members} />

          <PendingInvitesList invites={pendingInvites} onResend={handleResend} onCancel={handleCancel} />
        </div>
      </main>

      <BottomNav />
    </div>;
}