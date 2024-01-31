const cacheName = 'kw-ttt';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll([
                   './',
                    'online.js',
                    'online.css',
                    'index.html',
                    'win/win.html',
                    'win/win.css',
                    'lose/lose.html',
                    'lose/lose.css',
                    'icon1.svg',
                    // Add other files or assets you want to cache here
                ]);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache-first strategy
                return response || fetch(event.request).then(fetchResponse => {
                    // Cache new requests
                    return caches.open(cacheName).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
    );
});
