// Device memory

document.getElementById('result').innerHTML = navigator.deviceMemory || 'unknown'

// Network Type & Speed

function getConnection() {
    return navigator.connection || navigator.mozConnection ||
      navigator.webkitConnection || navigator.msConnection;
  }
  
  function updateNetworkInfo(info) {
    document.getElementById('networkType').innerHTML = info.type;
    document.getElementById('effectiveNetworkType').innerHTML = info.effectiveType;
    document.getElementById('downlinkMax').innerHTML = info.downlinkMax;
  }
  
  var info = getConnection();
  if (info) {
    info.onchange = function (event) {
      updateNetworkInfo(event.target);
    }
    updateNetworkInfo(info);
}