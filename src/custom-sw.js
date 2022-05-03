importScripts('/workbox.js');

const DYNAMIC_CASHES = 'DYNAMIC_CASHES';

workbox.routing.registerRoute(
    'https://fakestoreapi.com/products',
    new workbox.strategies.StaleWhileRevalidate({
    cacheName : 'productItems',
    cacheExpiration : {
        maxAgeSeconds : 60*60*24*30
    }
}));

const cacheDynamicData = (key, value) => {
   return cashes.open(DYNAMIC_CASHES)
    .then(cache => {
        cache.put(key, value)
        return value
    })
}
self.addEventListener('fetch', (event) => {
    event.respondWith(
        cashes.match(event.request)
            .then(response => {
                if(response) return response;

                if(!response) {
                    return fetch( event.request )   
                        .then( responseForDynamic => {
                            return cacheDynamicData(event.request.url, responseForDynamic.clone())
                        })
                        .catch(err => { })
                        
                }
            })
    )
})


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

