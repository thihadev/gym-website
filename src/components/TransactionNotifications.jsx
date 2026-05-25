import React, { useContext } from "react";
import ModalThankYou from "./ModalThankYou";
import { UserContext } from "../context/UserContext";
import useNotification from "../hook/useNotification";
import usePusherNotifications from "../hook/usePusherNotifications";

const TransactionNotifications = () => {
  const { user } = useContext(UserContext);
  const { fetchNotifications } = useNotification();

  // Custom hook မှ State များကို ရယူအသုံးပြုခြင်း
  const { modalVisible, modalMessage, closeModal } = usePusherNotifications(user, fetchNotifications);

  return (
    <>
      {modalVisible && <ModalThankYou message={modalMessage} onClose={closeModal} />}
    </>
  );
};

export default TransactionNotifications;