 // PIC CACHE
 if ('localStorage' in window || 'sessionStorage' in window) {
    var selectedEngine;
  
    var logTarget = document.getElementById('target');
    var valueInput = document.getElementById('value');
  
    var reloadInputValue = function () {
    console.log(selectedEngine, window[selectedEngine].getItem('myKey'))
      valueInput.value = window[selectedEngine].getItem('myKey') || '';
    }
    
    var selectEngine = function (engine) {
      selectedEngine = engine;
      reloadInputValue();
    };
  
    function handleChange(change) {
      var timeBadge = new Date().toTimeString().split(' ')[0];
      var newState = document.createElement('p');
      newState.innerHTML = '' + timeBadge + ' ' + change + '.';
      logTarget.appendChild(newState);
    }
  
    var radios = document.querySelectorAll('#selectEngine input');
    for (var i = 0; i < radios.length; ++i) {
      radios[i].addEventListener('change', function () {
        selectEngine(this.value)
      });
    }
    
    selectEngine('localStorage');
  
    valueInput.addEventListener('keyup', function () {
      window[selectedEngine].setItem('myKey', this.value);
    });
  
    var onStorageChanged = function (change) {
      var engine = change.storageArea === window.localStorage ? 'localStorage' : 'sessionStorage';
      handleChange('External change in ' + engine + ': key ' + change.key + ' changed from ' + change.oldValue + ' to ' + change.newValue + '');
      if (engine === selectedEngine) {
        reloadInputValue();
      }
    }
  
    window.addEventListener('storage', onStorageChanged);
  }

  // TAKE A PHOTO
  function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }
  
  var theStream;
  
  function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    
    var constraints = {
      video: true
    };
  
    getUserMedia(constraints, function (stream) {
      var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
  }
  
  function takePhoto() {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
    
    if (!theStream) {
      alert('Grab the video stream first!');
      return;
    }
    
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
    var imgCanvas = document.createElement("canvas"),
    imgContext = imgCanvas.getContext("2d");
    
  
    theImageCapturer.takePhoto();

    //   .then(blob => {
        var theImageTag = document.getElementById("canvas");
        imgCanvas.width = theImageTag.width;
        imgCanvas.height = theImageTag.height;
        imgContext.drawImage(theImageTag, 0, 0, theImageTag.width, theImageTag.height);
        var imgAsDataURL = imgCanvas.toDataURL("image/png");
        try {
            localStorage.setItem("bild", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
        /* console.log(theImageTag)
        theImageTag.src = URL.createObjectURL(blob);
        console.log(theImageTag.src = URL.createObjectURL(blob));
        localStorage.setItem("image",theImageTag.src); */
        
        
        
    //   })
    //   .catch(err => alert('Error: ' + err));
    // }
