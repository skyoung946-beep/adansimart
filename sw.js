// 1. Import Firebase Scripts
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// 2. Initialize Firebase in the Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyC4895RrHcz4dikOD7EXP4rxjXM4zT6DYM",
  authDomain: "adansimart-web.firebaseapp.com",
  projectId: "adansimart-web",
  storageBucket: "adansimart-web.firebasestorage.app",
  messagingSenderId: "319539198262",
  appId: "1:319539198262:web:c600365a5eab9945ea9b97"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 3. Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // Changed this to match your assets list
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 4. Your Existing Cache Logic
const CACHE_NAME = 'adansimart-v2';
const assets = ['/', '/index.html', '/icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
