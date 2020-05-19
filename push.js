var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEv9G1X9XHbxNsMl370fKfda-RwQJxKX9Y3pB0M5PbnDrOpobeIM1L9IHmWeY2TepvbKx4vyUuFVQxTt50dzam8",
   "privateKey": "bUbt6PkSQ-qPWrkW_C0f4y-qDDvYpPrbEjVbCXOvMXc"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/db7D-CgI_Jo:APA91bGGGO0THKpLZ9PgNUXc_Mda_rWi-Ibz9TcXssknUqDmxf-XO7TzQfmK47zMeyI7UgbQhaO5OwvmjcIrrHj9lSj4Sz2Gno0vj48rjTHdK5-qCnGjGecjqmpln2X-FdkQAO9T4z_p",
   "keys": {
       "p256dh": "BAluXEzRx8mxzgc8o/2htHrD4jlaf+0N4Z0Jcg+//Xj/G30mGo7ZE5DA61A6ywmUebmamhDbkthhWb+oNa5Mnzw=",
       "auth": "scB4DnyFx2xbX2R57Z//eQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '260840183056',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);