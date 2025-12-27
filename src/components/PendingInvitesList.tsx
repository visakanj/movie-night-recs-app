import React from 'react';
import { Clock, RefreshCw, X } from 'lucide-react';
export interface PendingInvite {
  id: string;
  recipient: string;
  sentAt: Date;
}
interface PendingInvitesListProps {
  invites: PendingInvite[];
  onResend: (id: string) => void;
  onCancel: (id: string) => void;
}
export function PendingInvitesList({
  invites,
  onResend,
  onCancel
}: PendingInvitesListProps) {
  if (invites.length === 0) {
    return <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary px-1">
          Pending Invites
        </h3>
        <div className="p-6 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-text-tertiary">No pending invites</p>
        </div>
      </div>;
  }
  return <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-semibold text-text-primary">
          Pending Invites
        </h3>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium text-text-secondary">
          {invites.length}
        </span>
      </div>

      <div className="space-y-2">
        {invites.map(invite => <div key={invite.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1D]/40 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <Clock size={18} className="text-text-tertiary" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-text-primary truncate max-w-[140px] sm:max-w-xs">
                  {invite.recipient}
                </p>
                <p className="text-xs text-text-tertiary">
                  Sent {invite.sentAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={() => onResend(invite.id)} className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/10 transition-colors" title="Resend invite">
                <RefreshCw size={16} />
              </button>
              <button onClick={() => onCancel(invite.id)} className="p-2 rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Cancel invite">
                <X size={16} />
              </button>
            </div>
          </div>)}
      </div>
    </div>;
}