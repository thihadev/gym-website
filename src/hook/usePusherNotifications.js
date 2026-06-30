import { useState, useEffect } from "react";
import { setPusherInstance, getPusherInstance, disconnectPusher } from "../../src/pusher";

const usePusherNotifications = (user, fetchNotifications) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    if (!getPusherInstance() && token) {
      setPusherInstance(token);
    }

    const pusher = getPusherInstance();
    if (!pusher) return;

    const channelName = `private-subscription.${user.id}`;
    let channel = pusher.channel(channelName);
    
    if (!channel) {
      channel = pusher.subscribe(channelName);
    }

    const handleSubscriptionError = (error) => {
      console.error("Pusher subscription error:", error);
    };

    const handleTransactionUpdated = (data) => {
      setModalMessage(data.message || "Transaction Updated Successfully!");
      setModalVisible(true);
      fetchNotifications();
    };

    channel.bind("pusher:subscription_error", handleSubscriptionError);
    channel.bind("TransactionUpdated", handleTransactionUpdated);

    return () => {
      if (channel) {
        channel.unbind("pusher:subscription_error", handleSubscriptionError);
        channel.unbind("TransactionUpdated", handleTransactionUpdated);
        pusher.unsubscribe(channelName);
      }

      if (Object.keys(pusher.channels).length === 0) {
        disconnectPusher();
      }
    };
  }, [user, fetchNotifications]);

  const closeModal = () => setModalVisible(false);

  return { modalVisible, modalMessage, closeModal };
};

export default usePusherNotifications;