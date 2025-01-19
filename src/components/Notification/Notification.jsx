import React from "react";

const Notification = ({ 
  notifications, 
  notificationCount, 
  markNotificationAsRead,
  markAllAsRead 
}) => {

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Notifications</h2>
        {notificationCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm md:text-base text-blue-600 hover:underline"
          >
            Mark All as Read
          </button>
        )}
      </div>
      <div
        className="space-y-2 overflow-y-auto p-3"
        style={{ maxHeight: "400px" }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg shadow ${
              notification.is_read
                ? "bg-gray-100"
                : "bg-blue-100 border-l-4 border-blue-500"
            }`}
          >
            <p className="text-gray-800 text-sm font-semibold md:text-base">
              {notification.message}
            </p>

            <p className="text-gray-500 text-xs md:text-sm mt-1">
              {notification.date_time}
            </p>

            {!notification.is_read && (
              <button
                onClick={() => markNotificationAsRead(notification.id)}
                className="text-sm md:text-base text-blue-600 hover:underline mt-2"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-5">
            No notifications available.
          </div>
        )}
      </div>
    </section>
  );
};

export default Notification;
