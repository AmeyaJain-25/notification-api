import { useEffect, useState } from 'react';
import FCMApi from './api/fcm.api';
import { getFCMToken } from './config/firebase.config';

function App() {
  const [notificationAccess, setNotificationAccess] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState('');
  const [subscriptionTopic, setSubscriptionTopic] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const requestNotificationAccess = () => {
    if (typeof window !== 'undefined') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setNotificationAccess(true);
          console.log('Notification permission granted.');
          getFCMToken((token: string) => setFcmToken(token));
        } else {
          setNotificationAccess(false);
          console.log('Unable to get permission to notify.');
        }
      });
    }
  };

  const sendAllNotification = async () => {
    try {
      const response = await FCMApi.sendAllNotification({
        title,
        body,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Error sending notification');
    }
  };

  const sendTokenNotification = async () => {
    if (!notificationAccess) return alert('Please allow notifications');
    if (!fcmToken) return alert('Please get FCM token first');

    try {
      const response = await FCMApi.sendNotificationToToken(fcmToken, {
        title,
        body,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Error sending notification');
    }
  };

  const sendTopicNotification = async () => {
    if (!topic) return alert('Please enter topic');
    try {
      const response = await FCMApi.sendNotificationToTopic(topic, {
        title,
        body,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Error sending notification');
    }
  };

  const subscribeToTopic = async () => {
    if (!subscriptionTopic) return alert('Please enter topic');
    if (!fcmToken) return alert('Please get FCM token first');

    try {
      const response = await FCMApi.subscribeToTopic(
        fcmToken,
        subscriptionTopic
      );
      if (response.success) {
        alert('Subscribed to topic');
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const unSubscribeToTopic = async () => {
    if (!subscriptionTopic) return alert('Please enter topic');
    if (!fcmToken) return alert('Please get FCM token first');
    try {
      const response = await FCMApi.unSubscribeToTopic(
        fcmToken,
        subscriptionTopic
      );
      if (response.success) {
        alert('Unsubscribed to topic');
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestNotificationAccess();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-teal-100 p-5">
      <h1 className="text-center text-4xl font-bold bg-black text-white p-4 m-0 w-fit border-2 border-black rounded-lg">
        Notification Api
      </h1>
      <h1 className="text-center text-2xl font-bold mt-10">
        {notificationAccess
          ? 'Notification Access Granted'
          : 'Notification Access Denied'}
      </h1>
      <div className="flex flex-col items-center mt-10 max-w-2xl w-full bg-white p-5 rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-10">
          Send Notification
        </h1>
        <input
          type="text"
          placeholder="Enter Title"
          className="border-2 border-black rounded-lg w-full bg-gray-100 focus:outline-none p-5 h-14 text-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Body"
          rows={5}
          className="border-2 border-black rounded-lg w-full bg-gray-100 focus:outline-none mt-5 p-5 text-xl"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Topic"
          className="border-2 border-black rounded-lg w-full bg-gray-100 focus:outline-none mt-5 p-5 h-14 text-xl"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="flex flex-row items-center mt-5 gap-5 w-full">
          <button
            className="bg-black text-white p-3 rounded-lg text-xl font-bold w-full"
            onClick={sendTokenNotification}
          >
            Send to Me
          </button>
          <button
            className="bg-black text-white p-3 rounded-lg text-xl font-bold w-full"
            onClick={sendAllNotification}
          >
            Send to Everyone
          </button>
          <button
            className="bg-black text-white p-3 rounded-lg text-xl font-bold w-full"
            onClick={sendTopicNotification}
          >
            Send With Topic
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 max-w-2xl w-full bg-white p-5 rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-10">
          Subscribe to Topic
        </h1>
        <input
          type="text"
          placeholder="Enter Topic"
          className="border-2 border-black rounded-lg w-full bg-gray-100 focus:outline-none mt-5 p-5 h-14 text-xl"
          value={subscriptionTopic}
          onChange={(e) => setSubscriptionTopic(e.target.value)}
        />
        <div className="flex flex-row items-center gap-5 w-full mt-10">
          <button
            className="bg-black text-white p-3 rounded-lg text-xl font-bold w-full"
            onClick={subscribeToTopic}
          >
            Subscribe to Topic
          </button>
          <button
            className="bg-black text-white p-3 rounded-lg text-xl font-bold w-full"
            onClick={unSubscribeToTopic}
          >
            Unsubscribe to Topic
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
