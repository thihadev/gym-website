import Pusher from "pusher-js";

let pusherInstance = null;

export const setPusherInstance = (token) => {
  if (pusherInstance) return pusherInstance;

  if (!token) {
    console.warn("Pusher initialization skipped: No access token provided.");
    return null;
  }

  // Production မှာ တကယ့် pusher key နဲ့ cluster ထည့်ပေးရပါမယ်
  pusherInstance = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: 'ap1', // အဆင်ပြေမယ့် Cluster ပြောင်းပါ
    encrypted: true,
    authEndpoint: `${process.env.REACT_APP_PUSHER_URL}`, // အဆင်ပြေမယ့် API Endpoint ပြောင်းပါ
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
    pusherInstance = null; // ပြဿနာဖြေရှင်းချက်- null ပြန်လုပ်ပေးခြင်း
  }
};
