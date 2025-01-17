import React, { useState, useEffect } from "react";
import { setPusherInstance, getPusherInstance, disconnectPusher } from "../../src/pusher";
import ModalThankYou from "./ModalThankYou"; // Modal component

const TransactionNotifications = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    // Set Pusher instance with the current token
    const token = localStorage.getItem("accessToken");
    setPusherInstance(token);

    const channel = getPusherInstance().subscribe(`private-subscription.${user.id}`);
    channel.bind("TransactionUpdated", (data) => {
      setModalMessage(data.message);
      setModalVisible(true);
    });

    // Cleanup: Unbind events and unsubscribe from channel on user change or component unmount
    return () => {
      if (channel) {
        channel.unbind("TransactionUpdated");
        getPusherInstance().unsubscribe(`private-subscription.${user.id}`);
      }
      disconnectPusher(); // Disconnect Pusher if needed
    };
  }, [user]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {/* Modal Envelope Thank You Box */}
      {modalVisible && (
        <ModalThankYou message={modalMessage} onClose={closeModal} />
      )}
    </>
  );
};

export default TransactionNotifications;
