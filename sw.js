console.log("Hi I'm your Service Worker !");

const cacheName = "Cache de l'application";

self.addEventListener('install', evt => {
    const cachePromise = caches.open(cacheName).then( cache => {
        cache.addAll([
            'index.html',
            'main.js',
            'css/style.css'
        ]);
    });
});

self.addEventListener('fetch', evt => {
    
    // on "intercepte" les requêtes http
    console.log('fetch sur url : ', evt.request.url);

    //stratégie de network first with cache fallback
    evt.respondWith(
        fetch(evt.request)
            .then( res => {
                console.log("Essai par le réseau : " + evt.request.url);
                caches.open(cacheName).then( cache => cache.put(evt.request, res));
                return res.clone();
            }).catch(err => {
                console.log(evt.request.url + " indisponible sur le réseau " );
                return caches.match(evt.request);
            })
    );
});


