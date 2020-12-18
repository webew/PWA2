if(navigator.serviceWorker){
    // enregistrement du fichier sw.js comme service worker
    console.log("Enregistrement du service worker");
    navigator.serviceWorker.register('sw.js');
}

