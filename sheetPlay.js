var songText = $('#song-pattern');
var songArr = [];
var count = 0;


var playBtn = $('#play-btn');
var closeBtn = $('.piano-menu__top .close');
var restartBtn = $('#restart-btn');

var autoPlayBtn = $('#autoplay-btn');
var autoPlayInterval;
var playBoo = false;

var timeTaken;

var keysPressed = {};

// stats here 
var accuCount = 0;
var accuScore = 0;
// change rythm and bpm later
var bpm = 120;
var rythmCount = 100;

var autoPlaySpeed = 180; //milliseconds

var timerRunning = false;
var timeInterval;

var userRating = {
    set(rating){
        localStorage.setItem('userRating', rating);
    },
    get(){
        return parseInt(localStorage.getItem('userRating'));
        
    }
}

//change afterwards



userRating.set(1000);

$('#stat_rating').html(userRating.get());

function checkPlay() {

    if (!playBoo) {        

        playBtn.html('Play');
        clearInterval(timeInterval); 
   
        playBoo = false;
        timerRunning = false;

    }  else {
        playBtn.html('Pause');
        if (!timerRunning){
            countTime();
            }
       
        return playBoo = true;
    }  

   // return playBoo
    
}


playBtn.on('click', function(){   

    $('.piano-menu__song-start').addClass('hidden');    
    checkPlay(); 
    //playBtn    
    
});

restartBtn.on('click', function() {
    cleanUpSheet();

    stopAutoPlay();

    accuCount = 0;
    $('#stat_accur').html('- - -');
    clearInterval(timeInterval);
    $('#stat_time').html('00:00');
    timerRunning = false;

    if(autoPlayBtn.hasClass('playing')) {       
        autoPlayBtn.removeClass('playing');
    }
 
});

closeBtn.on('click', function() {
    cleanUpSheet();

    $('#stat_accur').html('- - -');

    accuCount = 0;
    clearInterval(autoPlayInterval);
    clearInterval(timeInterval);
    $('#stat_time').html('00:00');
    timerRunning = false;
    playBoo = true;

    if(autoPlayBtn.hasClass('playing')) {       
        autoPlayBtn.removeClass('playing');
    }

})

autoPlayBtn.on('click', function() { 
    
    if(!autoPlayBtn.hasClass('playing')) {
        autoPlay(autoPlaySpeed);
        autoPlayBtn.addClass('playing');
        autoPlayBtn.html('Auto Pause')
       
    } else {

        stopAutoPlay();
        autoPlayBtn.removeClass('playing');
        autoPlayBtn.html('Auto Play');
    }  

    if (!$('.piano-menu__song-start').hasClass('hidden')){
        $('.piano-menu__song-start').addClass('hidden');
    }
    
});








function pianoPlay() {

    accuCount = 0;        

    songArr = songText.find('span'); 
    
    if (songArr[count+1].classList[0] != 'skip') {
        songArr[count].classList.add('active');
    } else {
      //  count++
        songArr[count].classList.add('active');        
    }

    var noteMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => ([v, k])));

    buttons.on('change', function (note) {


        playBtn.html('Pause');
        if (!timerRunning){
            countTime();
        }

        playBoo = false;

        keysPressed[noteMap[note.note]] = true;

        
        var pressStr = Object.keys(keysPressed).sort().join('');   

        if (note.state == false) {

            if (sustClicked){
                pianO.triggerRelease(Tone.Frequency(note.note + parseInt(transValue), "midi").toNote());    
            } 
            
            var key =  songArr[count];            
            if (count <= songArr.length-1){          
    
                key.classList.remove('active');
    
            if (noteMap[note.note] == key.innerHTML && key.classList[0] != 'gliss') {                
                key.classList.add('correct');   
                accuCount++

            } else if (key.innerHTML.length > 1) {
                
                
            } else if (noteMap[note.note] != key.innerHTML && key.classList[0] != 'gliss'){                
                key.classList.add('wrong');
            }   
            
            if (key.classList[0] == 'gliss') {
             /*    let gliTime = 0.00;
                 let glissTimer;
                 function goTimerGli() {
                         glissTimer = setInterval(() => {
                         gliTime = gliTime + 0.01
                         return console.log(gliTime)
                      }, 100);
                 }                    
               */
                 if (noteMap[note.note] == key.innerHTML){

                     key.classList.remove('active');
                     key.classList.add('correct');
                     count++
                     accuCount++
                     
                 } else {
                     key.classList.remove('active');
                     key.classList.remove('correct');
                     key.classList.add('wrong');
                     let parentGliss = key.parentNode.querySelectorAll('span');
                     parentGliss.forEach(function(x){
                         x.classList.remove('correct');
                         x.classList.add('wrong');
                         });
                     
                     NodeList.prototype.indexOf = Array.prototype.indexOf;
                     key.parentNode.classList.add('wrong');
                     count = count + (parentGliss.length - parentGliss.indexOf(key) + 1)   
                     

                 }

             

         } else if (key.innerHTML.length > 1 && key.classList[0] == 'chord'){
                
                var chordStr = key.innerHTML.split('').sort().join('');
                if (pressStr.length == chordStr.length && pressStr == chordStr){

                    key.classList.add('correct'); 
                    accuCount++                  
                    count++
                    
                } else if (pressStr.length == chordStr.length && pressStr != chordStr) {

                    key.classList.add('wrong');                           
                    count++         
                }     
                
            } else if (key.innerHTML.length == 1) {
                count++
            }
                
                //except the last note

                
            
                if (count == songArr.length) {
                    
                     console.log('end!');
                     finishSong();
                } else {

                    if  (count <= songArr.length-1 && songArr[count].classList[0] != 'skip' && songArr[count].classList[0] != 'pause'){
                        songArr[count].classList.add('active');
                        
                    }  else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'long' && songArr[count+6].classList[1] == 'par'){                        
                        count = count + 16;                        
                        songArr[count].classList.add('active');
                     
                        
                                            
                    }  else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'par' && (songArr[count+11].innerHTML.length > 1 && songArr[count+11].classList[0] == 'chord-gliss')){                        
                        count = count + 12;                        
                        songArr[count].classList.add('active');
                     
                        
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'par'){                        
                        count = count + 11;                        
                        songArr[count].classList.add('active');
                     
                        
                    } else if (count < songArr.length && (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+2].classList[0] == 'pause' && songArr[count+3].classList[0] == 'pause' && songArr[count+4].classList[0] == 'pause')) {
                        count = count + 5;
                        songArr[count].classList.add('active');  
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count +1].classList[0] == 'pause' && songArr[count+2].classList[0] != 'pause') {
                        count++
                        count++
                        songArr[count].classList.add('active');
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] != 'chord-gliss'){
                        count++                        
                        songArr[count].classList.add('active');
                                              
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'chord-gliss'){
                        count++ 
                        count++                                               
                        songArr[count].classList.add('active');
                    }
                }
               
            } 

            

            setTimeout(() => {
                keysPressed = {};
            }, 100);

            scrollSong();
        }            
        
    })  
    

    document.addEventListener('keydown', function(e){            

        if (e.repeat){ return }
        if (e.keyCode >= 48 && e.keyCode <= 90) {  

            playBtn.html('Pause');
            if (!timerRunning){
            countTime();
            }

            playBoo = false;

            keysPressed[e.key] = true;
            var pressStr = Object.keys(keysPressed).sort().join('');            

            var key =  songArr[count]; 

            if (count <= songArr.length-1){          
    
                key.classList.remove('active');
    
            if (e.key == key.innerHTML && key.classList[0] != 'gliss') {                
                key.classList.add('correct');   
                accuCount++

            } else if (key.innerHTML.length > 1) {
                
                
            } else if (e.key != key.innerHTML && key.classList[0] != 'gliss'){                
                key.classList.add('wrong');
            }  
            
            
            if (key.classList[0] == 'gliss') {
                    let gliTime = 0.00;
                    
                /*     let glissTimer = setInterval(() => {
                            gliTime = gliTime + 0.01
                            return console.log(gliTime)
                         }, 100);

*/
                                      
                  
                    if (e.key == key.innerHTML){

                        key.classList.remove('active');
                        key.classList.add('correct');
                        count++
                        accuCount++
                        
                    } else {
                        key.classList.remove('active');
                        key.classList.remove('correct');
                        key.classList.add('wrong');
                        let parentGliss = key.parentNode.querySelectorAll('span');
                        parentGliss.forEach(function(x){
                            x.classList.remove('correct');
                            x.classList.add('wrong');
                            });
                        
                        NodeList.prototype.indexOf = Array.prototype.indexOf;
                        key.parentNode.classList.add('wrong');
                        count = count + (parentGliss.length - parentGliss.indexOf(key) + 1)   
                        

                    }

                

            } else if (key.innerHTML.length > 1 && key.classList[0] == 'chord'){
                
                var chordStr = key.innerHTML.split('').sort().join('');                

                //IGNORE SHIFT FOR LETTERS HERE
                pressStr = pressStr.toUpperCase();
                chordStr = chordStr.toUpperCase();

                if (pressStr.length == chordStr.length && pressStr == chordStr){
                   

                    key.classList.add('correct'); 
                    accuCount++                  
                    count++
                    
                } else if (pressStr.length == chordStr.length && pressStr != chordStr) {

                    key.classList.add('wrong');                           
                    count++         
                }     
                
            } else if (key.innerHTML.length == 1) {
                count++
            }                
                //except the last note
            
                if (count == songArr.length) {
                    
                     console.log('end!');
                     finishSong();
                } else {

                    if  (count <= songArr.length-1 && songArr[count].classList[0] != 'skip' && songArr[count].classList[0] != 'pause'){
                        songArr[count].classList.add('active');
                        
                    }  else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'long' && songArr[count+6].classList[1] == 'par'){                        
                        count = count + 16;                        
                        songArr[count].classList.add('active');
                     
                        
                                            
                    }  else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'par' && (songArr[count+11].innerHTML.length > 1 && songArr[count+11].classList[0] == 'chord-gliss')){                        
                        count = count + 12;                        
                        songArr[count].classList.add('active');
                     
                        
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+1].classList[1] == 'par'){                        
                        count = count + 11;                        
                        songArr[count].classList.add('active');
                     
                        
                    } else if (count < songArr.length && (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause' && songArr[count+2].classList[0] == 'pause' && songArr[count+3].classList[0] == 'pause' && songArr[count+4].classList[0] == 'pause')) {
                        count = count + 5;
                        songArr[count].classList.add('active');  
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count +1].classList[0] == 'pause' && songArr[count+2].classList[0] != 'pause') {
                        count++
                        count++
                        songArr[count].classList.add('active');
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] != 'chord-gliss'){
                        count++                        
                        songArr[count].classList.add('active');
                                              
                    } else if (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'chord-gliss'){
                        count++ 
                        count++                                               
                        songArr[count].classList.add('active');
                    }
                }
               
            }    
    
          }

          scrollSong();
    });
    
    document.addEventListener('keyup', (e) => {
        setTimeout(() => {     
            

       //     if (Object.keys(keysPressed).length > 0) {return}
            
            let allSpans = document.querySelectorAll('.span-pressed')
            let allRects = document.querySelectorAll('rect.pressed')

            for (let s of allSpans) {
                if (!s) { return };
               s.classList.remove('span-pressed');                                
            }
            for (let r of allRects) {
                if (!r) { return };
                r.classList.remove('pressed')
            }
            delete keysPressed[e.key];  
            keysPressed = {}


            
        }, 100);

     });    
    
}

function scrollSong() {    
    
    var scrollFocus = document.querySelector('span.active');  
    if (!scrollFocus) { return };
    if (scrollFocus.classList[0] == 'pause') { return };
    if (scrollFocus.classList[0] == 'skip') { return };

    if (scrollFocus.parentNode.classList[0] == 'chord-gliss'){
        scrollFocus.parentNode.parentNode.scrollTop = scrollFocus.offsetTop - scrollFocus.parentNode.parentNode.offsetTop - 7;
    } else if (scrollFocus) {
        scrollFocus.parentNode.scrollTop = scrollFocus.offsetTop - scrollFocus.parentNode.offsetTop - 7;
    }    
    
}

function cleanUpSheet(){

    songText = $('#song-pattern');     
    songArr = songText.find('span'); 
    

    songText.find('span.active').removeClass('active');
    songText.find('span.correct').removeClass('correct');
    songText.find('span.wrong').removeClass('wrong');

    count = 0;
      
    songText.scrollTop(0);     
  
    if (songArr[count+1].classList[0] != 'skip') {
        songArr[count].classList.add('active');
    } else {
        count++
        songArr[count].classList.add('active');        
    }
    
}

function autoPlay(speed) {
    
    songText = $('#song-pattern');     
    songArr = songText.find('span'); 

     autoPlayInterval = setInterval(() => {
        let keyCheck = songArr[count];
        
        if (!keyCheck){

            stopAutoPlay()
            return;
           
        }

        let checkNext = songArr[count+1];        

        let key = keyCheck.innerHTML;

        animateKey(keyMap[key]);

        if (keyCheck.classList[0] == 'chord-gliss'){

            keyCheck.classList.remove('active');
            

            stopAutoPlay()
            autoPlay(autoPlaySpeed/2);

            console.log('restart!')
            count++
        
        } else if (keyCheck.classList[0] == 'gliss' && songArr[count+2].classList[0] != 'gliss'){

            keyCheck.classList.remove('active');
            keyCheck.classList.add('correct');  
            pianO.triggerAttack(Tone.Frequency(keyMap[key] + parseInt(transValue), "midi").toNote());
            console.log('restart again!')
            stopAutoPlay()
            autoPlay(autoPlaySpeed);
            count = count++
        }
        
        if (key.length == 1 && key != '.' && key != '|' && keyCheck.classList[0] != 'pause'){

           pianO.triggerAttack(Tone.Frequency(keyMap[key] + parseInt(transValue), "midi").toNote());
           songArr[count].classList.remove('active');
           songArr[count].classList.add('correct');
           
           count++
            

        } else if (key == "."){ 
            songArr[count].classList.remove('active'); 
            count++
           

        } else if (key == ""){ 
            songArr[count].classList.remove('active'); 
            count++
           

        } else if (key == "|"){ 

            songArr[count].classList.remove('active');                         
            count++
           

        }  else {
            if (keyCheck.classList[0] == 'chord-gliss') { return };
            chord = key.split('');
            for (let cNote of chord){
                animateKey(keyMap[cNote]);                
                pianO.triggerAttack(Tone.Frequency(keyMap[cNote] + parseInt(transValue), "midi").toNote());
                songArr[count].classList.remove('active');
                if (songArr[count].classList[0] != 'skip') {
                    songArr[count].classList.add('correct');
                }     
               setTimeout(() => {
                animateKey(keyMap[cNote]);
               }, speed*2);
            }   
            count++         

        }

        if  (count < songArr.length && key != '|'){
            
            songArr[count].classList.add('active');
            
        } else if (count < songArr.length && songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip' && songArr[count+2].classList[0] == 'skip'){
            count++
            count++
            count++
            songArr[count].classList.add('active');
            
        }   else if (count < songArr.length && songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip'){
            count++
            count++
            songArr[count].classList.add('active');
            
        }   else if (count < songArr.length && songArr[count].classList[0] == 'skip'){
            count++
            songArr[count].classList.add('active');
            
            
        } else if (count == songArr.length-1) {            
            //handle the song end here
            console.log('song end');
            
        }  

    setTimeout(() => {
        animateKey(keyMap[key]); 
    }, speed*2);           
    scrollSong();    

    }, speed);
    
}

function stopAutoPlay(){

    
    clearInterval(autoPlayInterval);
}

function finishSong(){
    
    let skipped = songText.find('.skip').length;
    let pauses = songText.find('span.pause').length;
    let totalNotes = songArr.length - skipped - pauses; 
    accuScore = Math.round(accuCount/totalNotes * 100); 

    clearInterval(timeInterval);

    countRating(userRating.get(), bpm);  

    $('#stat_accur').html(accuScore + '%');
    
    stopAutoPlay();
}


function countTime() {
    
    timerRunning = true;

    let startTime = new Date().getTime();

    let timeNow = $('#stat_time').html();
    timeNow = timeNow.split(':')
 
    let minNow = parseInt(timeNow[0]);
    let secNow = parseInt(timeNow[1]);

    timeInterval = setInterval(() => {
        let currentTime = new Date().getTime();
        timeTaken = currentTime - startTime;
       
       let minutes = Math.floor((timeTaken % (1000 * 60 * 60)) / (1000 * 60))+ minNow;
       let seconds = Math.floor((timeTaken % (1000 * 60)) / 1000)+ secNow;

       if (seconds < 10){ seconds = "0" + seconds; } else { seconds = seconds; }
       if (minutes < 10){ minutes = "0" + minutes; } else { minutes = minutes; }

       var timerStat = minutes + ':' + seconds;

        $('#stat_time').html(timerStat);

        
        
    }, 1000);

    
    
}


function countRating(rating, bpm){

    let skipped = songText.find('.skip').length;
    let pauses = songText.find('span.pause').length
    let totalNotes = songArr.length - skipped - pauses; 

    let seconds = Math.floor((timeTaken % (1000 * 60)) / 1000);    

    let prevRating = rating;
    let songDiff = parseInt($('#stat_level').html());
    let rythm = totalNotes / seconds;
    let neededRythm = bpm / 30;
    
    let rythmAccu = (neededRythm - rythm) * 100;

    if (rythmAccu > 100){ rythmAccu = rythmAccu - 100; } 
    else { rythmAccu = rythmAccu; }
    let newRating = Math.round(prevRating + (accuScore + rythmAccu)/10 + (songDiff/2));

    userRating.set(newRating);
    $('#stat_rating').html(newRating);

    if (!$('.piano-menu__song-stats').hasClass('active')){
        $('.piano-menu__song-stats').addClass('active');
    }
   

}



