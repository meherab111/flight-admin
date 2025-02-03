import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => (
  <div className="fixed top-0 left-0 right-0 bg-green-500 text-black p-4 shadow-lg flex justify-between items-center">
    <span>{message}</span>
    <button
      onClick={onClose}
      className="ml-4 bg-red-300 text-black px-2 py-1 rounded"
    >
      OK
    </button>
  </div>
);

export default Notification;
