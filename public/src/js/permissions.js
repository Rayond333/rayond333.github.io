if ('permissions' in navigator) {
    var logTarget = document.getElementById('logTarget');
  
    function handleChange(permissionName, newState) {
      var timeBadge = new Date().toTimeString().split(' ')[0];
      var newStateInfo = document.createElement('p');
      newStateInfo.innerHTML = '' + timeBadge + ' State of ' + permissionName + ' permission status changed to ' + newState + '.';
      logTarget.appendChild(newStateInfo);
    }
  
    function checkPermission(permissionName, descriptor) {
      try {
      navigator.permissions.query(Object.assign({name: permissionName}, descriptor))
        .then(function (permission) {
          document.getElementById(permissionName + '-status').innerHTML = permission.state;
          permission.addEventListener('change', function (e) {
            document.getElementById(permissionName + '-status').innerHTML = permission.state;
            handleChange(permissionName, permission.state);
          });
        });
      } catch (e) {
      }
    }
  
    checkPermission('geolocation');
    checkPermission('notifications');
    checkPermission('push', {userVisibleOnly: true});
    checkPermission('midi', {sysex: true});
    checkPermission('camera');
    checkPermission('microphone');
    checkPermission('background-sync');
    checkPermission('ambient-light-sensor');
    checkPermission('accelerometer');
    checkPermission('gyroscope');
    checkPermission('magnetometer');
  
    var noop = function () {};
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    
    function requestGeolocation() {
      navigator.geolocation.getCurrentPosition(noop);
    }
  
    function requestNotifications() {
      Notification.requestPermission();
    }
  
    function requestPush() {
      navigator.serviceWorker.getRegistration()
        .then(function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.subscribe();
        });
    }
  
    function requestMidi() {
      navigator.requestMIDIAccess({sysex: true});
    }
    
    function requestCamera() {
      navigator.getUserMedia({video: true}, noop, noop)
    }
    
    function requestMicrophone() {
      navigator.getUserMedia({audio: true}, noop, noop)
    }
}