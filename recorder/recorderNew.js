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




if(navigator.userAgent.indexOf("Chrome") != -1 ){
	console.log(navigator.userAgent);
} else {
	
}


function startRecordingNew() {

		actx = Tone.context;	

		var dest = actx.createMediaStreamDestination();		

		//assign to gumStream for later use
		vol.connect(dest);
		gumStream = dest.stream;
		console.log(pianO);
		
		
		// use the stream 
		input = actx.createMediaStreamSource(gumStream);
	
		//get the encoding 
		
		encodingType = 'wav';  //encodingTypeSelect.options[encodingTypeSelect.selectedIndex].value;
		
		recorder = new WebAudioRecorder(input, {
		  workerDir: "recorder/", // must end with slash
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
		  timeLimit:30,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 0.9},
	      mp3: {bitRate: 320}
		});
		
		recorder.onTimeout = function(recorder) { 			
			

			if ($('.record-btn').hasClass('recording')) {
                $('.record-btn').removeClass('recording').addClass('opened');
                $('.record-btn').next().addClass('active')
                console.log('stopped')
                stopRecording();
            } else if ($('.record').hasClass('active')) {
                $('.record-btn').removeClass('opened active');
                $('.record-btn').next().removeClass('active');
		 }

		 $('.record__stop').trigger('click');

		} 

		//start the recording process
		recorder.startRecording();
		console.log('started!')   
}


function stopRecording() {
	console.log("stopRecording() called");	
	//stop
	gumStream.getAudioTracks()[0].stop();
	
	//tell the recorder to finish 
	recorder.finishRecording();
	console.log('hmm');

}

var url;

function createDownloadLink(blob,encoding) {	

	if ($('#audio_record')){
		$('#audio_record').remove();
	}

	var recordTimeCurrent = $('.record__time').children().first();
	var recordTimeMax = $('.record__time').children().last();

	url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = $('.record__link.download');
	var linkSc = $('.record__link.soundcloud');	
	
	au.title = 'title';
	au.id = 'audio_record'
	
	var recordUi = $('.submenu.record');
	au.style.display = 'none';
	
	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//link the a element to the blob
	
	link.attr('href', url);
	link.attr('target', '_blank');
	link.attr('download', new Date().toISOString() + '.'+encodingType)

	linkSc.attr('href', 'https://soundcloud.com/upload');	
	linkSc.attr('target', '_blank');

	recordUi.append(au);

	var time = convertTime();
	setTimeout(() => {

		var auD = document.getElementById('audio_record');
		
	//	recordTimeCurrent.html(convertTime(auD.currentTime));	
		recordTimeMax.html(convertTime(auD.duration));

	}, 400);

}


function convertTime(number){   

	var time = number;
   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
