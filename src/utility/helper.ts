export const isServiceWorkerSupported = 'serviceWorker' in navigator;

export const enableServiceWorker = () => {
    if( !isServiceWorkerSupported ) return;

    navigator.serviceWorker
        .register('/service-worker.js')
        .catch(err => {
            console.error('serviceWorker not registered')
        })
}