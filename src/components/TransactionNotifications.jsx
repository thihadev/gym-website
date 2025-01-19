import React, { useState, useEffect, useContext } from "react";
import { setPusherInstance, getPusherInstance, disconnectPusher } from "../../src/pusher";
import ModalThankYou from "./ModalThankYou";
import { UserContext } from "../context/UserContext";
import useNotification from "../hook/useNotification";

const TransactionNotifications = ({user}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const { user } = useContext(UserContext);
  const { fetchNotifications } = useNotification();

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    setPusherInstance(token);

    const pusher = getPusherInstance();
    const channel = pusher.subscribe(`private-subscription.${user.id}`);
    channel.bind("pusher:subscription_error", (error) => {
      console.error("Pusher subscription error:", error);
    });


    channel.bind("TransactionUpdated", (data) => {
      setModalMessage(data.message);
      setModalVisible(true);
      fetchNotifications();
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`private-subscription.${user.id}`);
      disconnectPusher();
    };
  }, [user, fetchNotifications]);

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
