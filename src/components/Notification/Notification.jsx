import React from "react";

const Notification = ({ notifications, notificationCount, markNotificationAsRead, markAllAsRead, loading }) => {
  return (
    <div>
      {/* Header row */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-base text-slate-300">
          {notificationCount > 0 ? `${notificationCount} unread` : "All caught up"}
        </p>
        {notificationCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-base text-lime-400 hover:text-lime-300 font-semibold transition"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-xl border text-base transition ${
              n.is_read
                ? "bg-[#1f2937] border-white/8 text-slate-300"
                : "bg-lime-400/8 border-lime-400/25 text-white"
            }`}
          >
            <p className="font-medium leading-snug">{n.message}</p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-base text-slate-400">{n.date_time}</span>
              {!n.is_read && (
                <button
                  onClick={() => markNotificationAsRead(n.id)}
                  className="text-base text-lime-400 hover:text-lime-300 font-semibold"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}

        {!loading && notifications.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-base">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
