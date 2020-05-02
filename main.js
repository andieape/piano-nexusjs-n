NProgress.start();


/*var samples = {

    'A0' : 'A0.[mp3|ogg]',
    'C1' : 'C1.[mp3|ogg]',
    'D#1' : 'Ds1.[mp3|ogg]',
    'F#1' : 'Fs1.[mp3|ogg]',
    'A1' : 'A1.[mp3|ogg]',
    'C2' : 'C2.[mp3|ogg]',
    'D#2' : 'Ds2.[mp3|ogg]',
    'F#2' : 'Fs2.[mp3|ogg]',
    'A2' : 'A2.[mp3|ogg]',
    'C3' : 'C3.[mp3|ogg]',
    'D#3' : 'Ds3.[mp3|ogg]',
    'F#3' : 'Fs3.[mp3|ogg]',
    'A3' : 'A3.[mp3|ogg]',
    'C4' : 'C4.[mp3|ogg]',
    'D#4' : 'Ds4.[mp3|ogg]',
    'F#4' : 'Fs4.[mp3|ogg]',
    'A4' : 'A4.[mp3|ogg]',
    'C5' : 'C5.[mp3|ogg]',
    'D#5' : 'Ds5.[mp3|ogg]',
    'F#5' : 'Fs5.[mp3|ogg]',
    'A5' : 'A5.[mp3|ogg]',
    'C6' : 'C6.[mp3|ogg]',
    'D#6' : 'Ds6.[mp3|ogg]',
    'F#6' : 'Fs6.[mp3|ogg]',
    'A6' : 'A6.[mp3|ogg]',
    'C7' : 'C7.[mp3|ogg]',
    'D#7' : 'Ds7.[mp3|ogg]',
    'F#7' : 'Fs7.[mp3|ogg]',
    'A7' : 'A7.[mp3|ogg]',
    'C8' : 'C8.[mp3|ogg]'
    
}*/
// load samples //

var samples = SampleLibrary.load({
    instruments: ['piano'],
    baseUrl: "./samples/"
})








// show keyboard on load //
var current
Tone.Buffer.on('load', function() {
    document.querySelector(".container").style.display = 'block';
    document.querySelector("#loading").style.display = 'none';
    NProgress.done();

    // loop through instruments and set release, connect to master output
    for (var property in samples) {
        if (samples.hasOwnProperty(property)) {
            console.log(samples[property])
            samples[property].release = .5;
            samples[property].toMaster();
        }
    }

    current = samples['piano'];

})

Tone.Buffer.on('error', function() {
    document.querySelector("#loading").innerHTML = "I'm sorry, there has been an error loading the samples. This demo works best on on the most up-to-date version of Chrome.";
})



document.querySelector("#loading").style.display = 'none';
window.onload = NProgress.done();
window.onload = document.querySelector(".container").style.display = 'block';
// create Nexus UI //
Nexus.colors.accent = "#f00"

var select = new Nexus.Select('#Selector', {
    'size': [300, 30],
    'options': Object.keys(samples)
});

var buttons = new Nexus.Piano('#Keyboard', {
    'size': [1200, 212],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 24,
    'highNote': 85
});



Tone.context.latencyHint = 'interactive';

var pianO = new Tone.Sampler({

/*CLOSE GRAND*/
  /*      'A1': 'A1.mp3',
        'A#1': 'As1.mp3',
        'B1': 'B1.mp3',
        'C1': 'C1.mp3',
        'C#1': 'Cs1.mp3',
        'D1': 'D1.mp3',
        'D#1': 'Ds1.mp3',
        'E1': 'E1.mp3',
        'F1': 'F1.mp3',
        'F#1': 'Fs1.mp3',
        'G1': 'G1.mp3',
        'G#1': 'Gs1.mp3'

*/
   /*     'A0' : 'A0.[mp3|ogg]',
        'C1' : 'C1.[mp3|ogg]',
        'D#1' : 'Ds1.[mp3|ogg]',
        'F#1' : 'Fs1.[mp3|ogg]',
        'A1' : 'A1.[mp3|ogg]',
        'C2' : 'C2.[mp3|ogg]',
        'D#2' : 'Ds2.[mp3|ogg]',
        'F#2' : 'Fs2.[mp3|ogg]',
        'A2' : 'A2.[mp3|ogg]',
        'C3' : 'C3.[mp3|ogg]',
        'D#3' : 'Ds3.[mp3|ogg]',
        'F#3' : 'Fs3.[mp3|ogg]',
        'A3' : 'A3.[mp3|ogg]',
        'C4' : 'C4.[mp3|ogg]',
        'D#4' : 'Ds4.[mp3|ogg]',
        'F#4' : 'Fs4.[mp3|ogg]',
        'A4' : 'A4.[mp3|ogg]',
        'C5' : 'C5.[mp3|ogg]',
        'D#5' : 'Ds5.[mp3|ogg]',
        'F#5' : 'Fs5.[mp3|ogg]',
        'A5' : 'A5.[mp3|ogg]',
        'C6' : 'C6.[mp3|ogg]',
        'D#6' : 'Ds6.[mp3|ogg]',
        'F#6' : 'Fs6.[mp3|ogg]',
        'A6' : 'A6.[mp3|ogg]',
        'C7' : 'C7.[mp3|ogg]',
        'D#7' : 'Ds7.[mp3|ogg]',
        'F#7' : 'Fs7.[mp3|ogg]',
        'A7' : 'A7.[mp3|ogg]',
        'C8' : 'C8.[mp3|ogg]'*/

    /* old */
    'A0': 'A0.[mp3|ogg]',
    'A1': 'A1.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A6': 'A6.[mp3|ogg]',
    
    /*-----------old------*/
    'A#0': 'As0.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'A#6': 'As6.[mp3|ogg]',
    'B0': 'B0.[mp3|ogg]',
    'B1': 'B1.[mp3|ogg]',
    'B2': 'B2.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'B5': 'B5.[mp3|ogg]',
    'B6': 'B6.[mp3|ogg]',
    'C0': 'C0.[mp3|ogg]',
    'C1': 'C1.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'C#0': 'Cs0.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'C#6': 'Cs6.[mp3|ogg]',
    'D0': 'D0.[mp3|ogg]',
    'D1': 'D1.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D6': 'D6.[mp3|ogg]',
    'D#0': 'Ds0.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'D#6': 'Ds6.[mp3|ogg]',
    'E0': 'E0.[mp3|ogg]',
    'E1': 'E1.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'E6': 'E6.[mp3|ogg]',
    'F0': 'F0.[mp3|ogg]',
    'F1': 'F1.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'F6': 'F6.[mp3|ogg]',
    'F#0': 'Fs0.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    'G0': 'G0.[mp3|ogg]',
    'G1': 'G1.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'G6': 'G6.[mp3|ogg]',
    'G#0': 'Gs0.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    'G#6': 'Gs6.[mp3|ogg]'
},
 {
    'baseUrl' : './samples/piano/',
    curve: "linear",
    attack: 0,
    release: 2,
    sustain: 1,
    decay: 1    
});

/* KILLING NOISES HERE */
const piano_gain = new Tone.Gain(0.2);
/*var comp = new Tone.Compressor({
        ratio : 4 ,
        threshold : -20 ,
        release : 0.20 ,
        attack : 0.003 ,
        knee : 30
    });*/

/* SOME OPTIONAL FUN HERE */

//var reverb = new Tone.Freeverb(0.1, 1000);
//var delay  = new Tone.PingPongDelay('32n', 0.1);
//var distortion  = new Tone.Distortion(0.2);
//pianO.connect(delay);

//reverb.toMaster();
//pianO.connect(distortion);
//distortion.connect(piano_gain);
//pianO.connect(reverb);
//delay.toMaster();

/* PIANO SAMPLER TO GAIN, GAIN TO MASTER */ 
pianO.connect(piano_gain);
//pianO.volume.value = -10;
//piano_gain.connect(comp);
//pianO.toMaster();
piano_gain.toMaster();
//comp.toMaster();





buttons.on('change', function(note) {
    
    console.log(Tone.Frequency(note.note).toNote());
    if (note.state === true) {
        pianO.triggerAttack(Tone.Frequency(note.note, 'midi').toNote());
        
    } else if (note.state === false) {
        
        pianO.triggerRelease(Tone.Frequency(note.note, "midi").toNote());
    }
});



var keyMap = {
    '1': 24,'!': 25,'2': 26,'@': 27,'3': 28,'4': 29,'$': 30,'5': 31,'%': 32,'6': 33,'^': 34,'7': 35,'8': 36,'*': 37,'9': 38,'(': 39,'0': 40,'q': 41,'Q': 42,'w': 43,'W': 44,'e': 45,'E': 46,'r': 47,'t': 48,'T': 49,'y': 50,'Y': 51,'u': 52,'i': 53,'I': 54,'o': 55,'O': 56,'p': 57,'P': 58,'a': 59,'s': 60,'S': 61,'d': 62,'D': 63,'f': 64,'g': 65,'G': 66,'h': 67,'H': 68,'j': 69,'J': 70,'k': 71,'l': 72,'L': 73,'z': 74,'Z': 75,'x': 76,'c': 77,'C': 78,'v': 79,'V': 80,'b': 81,'B': 82,'n': 83,'m': 84
    };


    /*Press key animation TEMPORARY*/

var pressed = false;

function animateKey(id) {
    if (pressed){
        document.getElementById(id).classList.toggle("pressed");
    } else if (!pressed){
        document.getElementById(id).classList.remove("pressed");
    }
    
}

function playInput(buttons){
document.addEventListener("keydown", (e) => {      
    if (e.repeat) { return };

       if (e.keyCode >= 48 && e.keyCode <= 90)  {
       pianO.triggerAttack(Tone.Frequency(keyMap[e.key], "midi").toNote()); 
       e.preventDefault();
       pressed = true;
       animateKey('key_'+ keyMap[e.key]);
       
        }    
});

document.addEventListener("keyup", (e) => {      
        
    console.log(e.key);
    if (e.keyCode >= 48 && e.keyCode <= 90)  {  
        pianO.triggerRelease(Tone.Frequency(keyMap[e.key], "midi").toNote());    
     pressed = false;  
     animateKey('key_'+ keyMap[e.key]);  
        e.preventDefault();      
    }
});


}

playInput();



/* RESIZER --- DON'T USE YET */

/*
var x = window.matchMedia("(max-width: 700px)");
resizePiano(x);
x.addListener(resizePiano);

function resizePiano(x) {
	if (x.matches) {
        buttons.resize(800, 150);
		Tone.context.lookAhead = 0.1;
    } else {
        buttons.resize(1000, 150);
		Tone.context.lookAhead = 0;
    }
}

*/



/* Setting IDs for keys*/

//reordering the obj to set the ids
var keyIds = Object.values(keyMap).sort(function(a, b){return a-b});;





$(window).on('load', function(){
    console.log('ready');
    var keyB = $('#Keyboard').find('rect');
    for (var i=0; i < keyB.length; i++){
        var key = keyB[i];
      
        if (key){
            key.setAttribute('id', 'key_'+ keyIds[i]);            
       
        }       
       
    }
  
});
