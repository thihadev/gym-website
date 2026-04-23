import React, { useState, useEffect, useContext, useCallback } from "react";
import { setPusherInstance, getPusherInstance, disconnectPusher } from "../../src/pusher";
import ModalThankYou from "./ModalThankYou";
import { UserContext } from "../context/UserContext";
import useNotification from "../hook/useNotification";

const usePusherNotifications = (user, fetchNotifications) => {
      const [modalVisible, setModalVisible] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    if (!getPusherInstance()) {
      setPusherInstance(token);
    }

    const pusher = getPusherInstance();
    if (!pusher) return;

    const channelName = `private-subscription.${user.id}`;
    if (!pusher.channel(channelName)) {
      const channel = pusher.subscribe(channelName);

      channel.bind("pusher:subscription_error", (error) => {
        console.error("Pusher subscription error:", error);
      });

      channel.bind("TransactionUpdated", (data) => {
        setModalMessage(data.message);
        setModalVisible(true);
        fetchNotifications();
      });
    }

    return () => {
      pusher.unbind_all();
      const channel = pusher.channel(channelName);
      if (channel) {
        pusher.unsubscribe(channelName);
      }

      if (Object.keys(pusher.channels).length === 0) {
        disconnectPusher();
      }
    };
  }, [user, fetchNotifications]);
};

const TransactionNotifications = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { user } = useContext(UserContext);
  const { fetchNotifications } = useNotification();

  usePusherNotifications(user, fetchNotifications);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && <ModalThankYou message={modalMessage} onClose={closeModal} />}
    </>
  );
};

export default TransactionNotifications;