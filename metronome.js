var metroStatus;

var metro = new Tone.Sampler({

    'A1' : 'metro-up.[wav]',    
},
 {
    'baseUrl' : './samples/metro/',
    curve: "exponential",
    attack: 0,
    release: 4,
    sustain: 1,
    decay: 1    
});

 var vol2 = new Tone.Volume(-10);

metro.chain(vol2, Tone.Master);


var metronome = new Tone.Loop(function(){

    metro.triggerAttackRelease('A1');

}, "1.2");


function metroPlay(interv) {
    //metro.triggerAttackRelease('A1');
    metronome.interval = interv;
    metronome.start(interv/2);
    Tone.Transport.start();
}

function metroStop() {
    metronome.stop()
    Tone.Transport.stop();
}

metroStatus = false;

document.addEventListener('keydown', function(e) {
    
    if (e.key == '*') {
      if (!metroStatus) {
        metroPlay()
        metroStatus = true;    
      } else {
        metroStop()
        metroStatus = false;
      }
       
    } 

})