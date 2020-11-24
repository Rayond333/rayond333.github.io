self.addEventListener('install', function(event) {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                /* cache.add('/');
                cache.add('/index.html');
                cache.add('/src/js/app.js'); */
                cache.addAll([
                    '/public/',
                    '/public/index.html',
                    '/public/src/css/app.css',
                    '/public/src/js/app.js',
                    
                    '/public/src/images/pwa.jpg',
                    'https://fonts.googleapis.com/css?family=Raleway:400,700'
                ])
            }));
    
});

self.addEventListener('activate', function() {
    console.log('SW activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if (res) {
                    return res;
                } else {
                    return fetch(event.request);
                }
            })
    )
});
