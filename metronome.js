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

metro.toMaster();


function metroPlay() {
    metro.triggerAttackRelease('A1');
}

