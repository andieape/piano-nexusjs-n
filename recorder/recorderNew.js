//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getDisplayMedia()
var recorder; 						//WebAudioRecorder object
var input; 							//MediaStreamAudioSourceNode  we'll be recording
var encodingType; 					//holds selected encoding for resulting audio (file)
var encodeAfterRecord = true;       // when to encode

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //new audio context to help us record





var encodingTypeSelect = document.getElementById("encodingTypeSelect");
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var recordButtonNew = document.getElementById('recordButtonNew');

//add events to those 2 buttons
/*
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
recordButtonNew.addEventListener('click', startRecordingNew);
*/


function startRecording() {
	console.log("startRecording() called");
    
//	console.log(audioContext1); 
	navigator.mediaDevices.getDisplayMedia({ video:true, audio: { sampleRate: 44100, audioBitsPerSecond: 320000} }).then(function(stream) {
		
		/*
			create an audio context after getDisplayMedia is called
			sampleRate might change after  getDisplayMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device
		*/
		audioContext = new AudioContext({  			
			sampleRate: 44100
		});
		
		
		
		//assign to gumStream for later use
		gumStream = stream;
		
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(gumStream);
		console.log(input);
		
		
	
      
		//get the encoding 
		
		encodingType = encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value;
		
		//disable the encoding selector
        
       
		
		recorder = new WebAudioRecorder(input, {
		  workerDir: "js/", // must end with slash
		  encoding: encodingType,
		  numChannels:2, //2 is the default, mp3 encoding supports only 2
		  onEncoderLoading: function(recorder, encoding) {
	
		  },
		  onEncoderLoaded: function(recorder, encoding) {

		  }
		});

		recorder.onComplete = function(recorder, blob) { 
			
			createDownloadLink(blob,recorder.encoding);
			
		}

		recorder.setOptions({
		  timeLimit:300,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 0.9},
	      mp3: {bitRate: 320}
	    });

		//start the recording process
		recorder.startRecording();

	//	 __log("Recording started");

	}).catch(function(err) {
	  	
    

	});

	
   
}

if(navigator.userAgent.indexOf("Chrome") != -1 ){
	console.log(navigator.userAgent);
} else {
	
}


function startRecordingNew() {

		actx = Tone.context;
		console.log(actx);

		var dest = actx.createMediaStreamDestination();		
		
		
		//assign to gumStream for later use
		vol.connect(dest);
		gumStream = dest.stream;
		console.log(pianO);
		
		
		// use the stream 
		input = actx.createMediaStreamSource(gumStream);
	
		//get the encoding 
		
		encodingType = 'wav';  //encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value;
		
		//disable the encoding selector
      //  encodingTypeSelect.disabled = true;
       
		
		recorder = new WebAudioRecorder(input, {
		  workerDir: "js-dev/recorder/", // must end with slash
		  encoding: encodingType,
		  numChannels:2, //2 is the default, mp3 encoding supports only 2
		  onEncoderLoading: function(recorder, encoding) {
	
		  },
		  onEncoderLoaded: function(recorder, encoding) {

		  }
		});

		recorder.onComplete = function(recorder, blob) { 
			
			createDownloadLink(blob,recorder.encoding);
			
		}

		recorder.setOptions({
		  timeLimit:300,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 0.9},
	      mp3: {bitRate: 320}
	    });

		//start the recording process
		recorder.startRecording();
		console.log('started!')



	
   
}


function stopRecording() {
	console.log("stopRecording() called");

	//var auOld = document.getElementById('audio1');
	
/*	if (auOld){
		auOld.parentNode.removeChild(auOld);
	}
	
*/	//stop
	gumStream.getAudioTracks()[0].stop();

	
	//tell the recorder to finish 
	recorder.finishRecording();
	console.log('hmm');
//	createDownloadLink(blob,recorder.encoding);

}

var url;

function createDownloadLink(blob,encoding) {
	
	console.log('la');

	if ($('#audio_record')){
		$('#audio_record').remove();
	}

/*	if (recordingsList.firstElementChild){
		recordingsList.firstElementChild.remove()
	}*/

	url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = $('.record__link.download');
	au.title = 'title';
	au.id = 'audio_record'
	var recordUi = $('.submenu.record');
	au.style.display = 'none';
	


	
	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//link the a element to the blob
	link.attr('href', url);
//	link.download = new Date().toISOString() + '.'+encoding;
	//link.innerHTML = 'Download';

	recordUi.append(au);

	//add the new audio and a elements to the li element
	//li.appendChild(au);
	//li.appendChild(link);
	
	//label.setAttribute(label) = 'alala';

	//add the li element to the ordered list
//	recordingsListrecordingsList.appendChild(li);

 	var auDuration = document.getElementById('audio_record').duration

	var time = convertTime();
	console.log(time);



}


function convertTime()
{   

	var time = document.getElementById('audio_record').duration;
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

