import Pusher from "pusher-js";

// Function to initialize Pusher with dynamic token
const createPusherInstance = (token) => {
  return new Pusher("b02a822843465dc0345f", {
    cluster: "ap1",
    encrypted: true,
    forceTLS: true,
    debug: true,
    authEndpoint: process.env.REACT_APP_PUSHER_URL,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

let pusher = null;

const getPusherInstance = () => pusher;

// Function to create a new Pusher instance with the current token
const setPusherInstance = (token) => {
  if (pusher) {
    pusher.disconnect();
  }
  pusher = createPusherInstance(token);
};

const disconnectPusher = () => {
  if (pusher) {
    pusher.disconnect();
  }
};

export { setPusherInstance, getPusherInstance, disconnectPusher };
