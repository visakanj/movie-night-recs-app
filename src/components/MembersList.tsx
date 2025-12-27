import React from 'react';
import { User, Crown } from 'lucide-react';
export interface Member {
  id: string;
  name: string;
  avatar?: string;
  role: 'host' | 'member';
}
interface MembersListProps {
  members: Member[];
}
export function MembersList({
  members
}: MembersListProps) {
  return <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-semibold text-text-primary">Members</h3>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium text-text-secondary">
          {members.length}
        </span>
      </div>

      <div className="space-y-2">
        {members.map(member => <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1D]/40 border border-white/[0.04] hover:bg-[#1A1A1D]/60 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10">
                {member.avatar ? <span className="text-lg">{member.avatar}</span> : <User size={20} className="text-text-tertiary" />}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {member.name}
                </p>
                <p className="text-xs text-text-tertiary capitalize">
                  {member.role}
                </p>
              </div>
            </div>

            {member.role === 'host' && <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Crown size={14} className="text-amber-500" />
              </div>}
          </div>)}
      </div>
    </div>;
}