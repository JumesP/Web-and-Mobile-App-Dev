// service-worker.js

const casheName = "OnlineWebstore";
const filesToCache = [
    "/",
    "../img/placeholder.png",
    "../css/public.css",
    "../css/landing.css",
    "../js/public.js",
    "../js/item_page.js",
    "../favicon.ico"
];

var productImg = [];

const promise = fetch(self.location.origin + "/api/products")
    .then(response => {
        for (let i = 0; i < response.length; i++) {
            productImg.push(response[i].image);
        }
    })

var contentToCache = filesToCache.concat(productImg);

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(casheName).then(async (cache) => {
            console.log("[Service Worker] Caching all: app shell and content");
            return cache.addAll(await contentToCache);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log("[Service Worker] Fetching resource: " + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(casheName).then((cache) => {
                    console.log("[Service Worker] Caching new resource: " + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    )
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== casheName) {
                    console.log("[Service Worker] Removing old cache", key);
                    return caches.delete(key);
                }
            }));
        })
    );
});