if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/sw.js')
    .then(function() {
      console.log('SW registered');
    });
}