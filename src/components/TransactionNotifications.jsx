import React, { useState, useEffect, useContext } from "react";
import { setPusherInstance, getPusherInstance, disconnectPusher } from "../../src/pusher";
import ModalThankYou from "./ModalThankYou"; // Modal component
import { UserContext } from "../hook/UserContext";

const TransactionNotifications = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { fetchNotifications } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    // Set Pusher instance with the current token
    const token = localStorage.getItem("accessToken");
    setPusherInstance(token);

    const channel = getPusherInstance().subscribe(`private-subscription.${user.id}`);
    channel.bind("TransactionUpdated", (data) => {
      setModalMessage(data.message);
      setModalVisible(true);
      fetchNotifications();
    });


    // Cleanup: Unbind events and unsubscribe from channel on user change or component unmount
    return () => {
      if (channel) {
        channel.unbind("TransactionUpdated");
        getPusherInstance().unsubscribe(`private-subscription.${user.id}`);
      }
      disconnectPusher(); // Disconnect Pusher if needed
    };
  }, [user, fetchNotifications]);

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
