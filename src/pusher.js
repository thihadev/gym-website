import Pusher from "pusher-js";

let pusherInstance = null;

export const setPusherInstance = (token) => {
  if (pusherInstance) return pusherInstance;

  if (!token) {
    console.warn("Pusher initialization skipped: No access token provided.");
    return null;
  }

  pusherInstance = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: 'ap1',
    encrypted: true,
    authEndpoint: `${process.env.REACT_APP_PUSHER_URL}`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  return pusherInstance;
};

export const getPusherInstance = () => pusherInstance;

export const disconnectPusher = () => {
  if (pusherInstance) {
    pusherInstance.disconnect();
    pusherInstance = null;
  }
};
