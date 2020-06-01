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


playBtn.on('click', function(){   
    playBoo = true;
    $('.piano-menu__song-start').addClass('hidden');

    if (!timerRunning){
        countTime();
        }
    
});

restartBtn.on('click', function() {
    cleanUpSheet();

    accuCount = 0;
    $('#stat_accur').html('- - -');
    clearInterval(timeInterval);
    $('#stat_time').html('00:00');
    timerRunning = false;
 
});
closeBtn.on('click', function() {
    cleanUpSheet();

    $('#stat_accur').html('- - -');

    accuCount = 0;
    clearInterval(autoPlayInterval);
    clearInterval(timeInterval);
    $('#stat_time').html('00:00');
    timerRunning = false;
})

autoPlayBtn.on('click', function() {
   
    if (!autoPlayBtn.hasClass('playing')){
        autoPlay();
        autoPlayBtn.toggleClass('playing');
    } else {
        stopAutoPlay();
         autoPlayBtn.toggleClass('playing');
    }

    if (!$('.piano-menu__song-start').hasClass('hidden')){
        $('.piano-menu__song-start').addClass('hidden');
    }
    
})



function pianoPlay() {

    accuCount = 0;      

    playBoo = true;  

    songArr = songText.find('span'); 

    
    if (songArr[count+1].classList[0] != 'skip') {
        songArr[count].classList.add('active');
    } else {
      //  count++
        songArr[count].classList.add('active');        
    }

    var noteMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => ([v, k])));

    buttons.on('change', function (note) {

        if (!timerRunning){
        countTime();
        }

        if (note.state == false){

            if (sustClicked){
                pianO.triggerRelease(Tone.Frequency(note.note, "midi").toNote());    
            } 
            
            var key =  songArr[count];            
            if (count <= songArr.length-1){          
    
            songArr[count].classList.remove('active');
    
            if (noteMap[note.note] == key.innerHTML) {                
                songArr[count].classList.add('correct');   
                accuCount++

            } else {
                
                songArr[count].classList.add('wrong');
            }            
    
            count++
    
                //except the last note
                if (count == songArr.length) {
                    
                    console.log('end!');
                    finishSong();
               } else {

                   if  (count <= songArr.length-1 && songArr[count].classList[0] != 'skip'){
                       songArr[count].classList.add('active');
                       
                    } else if (count < songArr.length && songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip' && songArr[count+2].classList[0] == 'skip'){
                        count++
                        count++
                        count++
                        songArr[count].classList.add('active');
                        
                    }  else if (songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip'){
                       count++
                       count++
                       songArr[count].classList.add('active');
                       
                   }    else if (songArr[count].classList[0] == 'skip'){
                       count++
                       songArr[count].classList.add('active');
                       
                   }
               }
            }  

            scrollSong();
        }            
        
    })  
    

    document.addEventListener('keydown', function(e){    

        if (e.repeat){return}
        if (e.keyCode >= 48 && e.keyCode <= 90) {  

            if (!timerRunning){
                countTime();
                }

            keysPressed[e.key] = true;
            var pressStr = Object.keys(keysPressed).sort().join('');            

            var key =  songArr[count];          
            

            if (count <= songArr.length-1){          
    
                key.classList.remove('active');
    
            if (e.key == key.innerHTML) {                
                key.classList.add('correct');   
                accuCount++

            } else if (key.innerHTML.length > 1) {
                
                
            } else {                
                key.classList.add('wrong');
            }            
            if (key.innerHTML.length > 1){
                
                var chordStr = key.innerHTML.split('').sort().join('');
                if (pressStr.length == chordStr.length && pressStr == chordStr){
                    console.log(chordStr);
                    console.log(pressStr);
                    key.classList.add('correct'); 
                    accuCount++                  
                    count++
                    
                } else if (pressStr.length == chordStr.length && pressStr != chordStr) {
                    console.log(chordStr);
                    console.log(pressStr);
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
                        
                        
                    } else if (count < songArr.length && ((songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip') || (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause')) ){
                        count++
                        count++
                        count++
                        songArr[count].classList.add('active');
                       
                        
                    }  else if ((songArr[count].classList[0] == 'skip' && songArr[count+1].classList[0] == 'skip') || (songArr[count].classList[0] == 'pause' && songArr[count+1].classList[0] == 'pause')){
                        count++
                        count++
                        songArr[count].classList.add('active');
                        
                        
                    }    else if (songArr[count].classList[0] == 'skip' || songArr[count].classList[0] == 'pause'){
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
            delete keysPressed[e.key];            
        }, 500);

     });    
    
}

function scrollSong() {    

    var scrollFocus = document.querySelector('span.active');  
    if (scrollFocus) {
        scrollFocus.parentNode.scrollTop = scrollFocus.offsetTop - scrollFocus.parentNode.offsetTop;
    }
    
    document.getElementById('song-pattern').scrollBy(0, -5);
    
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

function autoPlay() {
    
    songText = $('#song-pattern');     
    songArr = songText.find('span'); 

     autoPlayInterval = setInterval(() => {
        let keyCheck = songArr[count];

        if (!keyCheck){
            
            stopAutoPlay()
            return;
           
        }
        let key = keyCheck.innerHTML;
        
        if (key.length == 1 && key != '.' && key != '|'){

           pianO.triggerAttack(Tone.Frequency(keyMap[key], "midi").toNote());
           songArr[count].classList.remove('active');
           songArr[count].classList.add('correct');
           count++
            

        } else if (key == "."){ 
            songArr[count].classList.remove('active'); 
            console.log(key);
            count++
           

        } else if (key == "|"){ 
            songArr[count].classList.remove('active'); 
            
            count++
           

        }  else {
            chord = key.split('');
            for (let cNote of chord){
                pianO.triggerAttack(Tone.Frequency(keyMap[cNote], "midi").toNote());
                songArr[count].classList.remove('active');
                if (songArr[count].classList[0] != 'skip') {
                    songArr[count].classList.add('correct');
                }               
                
                
                
               
            }   
            count++         

        }

        if  (count < songArr.length ){
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

        
        scrollSong();
        

    }, 20000/bpm);
    
}

function stopAutoPlay(){

    
    clearInterval(autoPlayInterval);
}

function finishSong(){
    
    let skipped = songText.find('.skip').length;
    let totalNotes = songArr.length - skipped;  
    accuScore = Math.round(accuCount/totalNotes * 100); 

    clearInterval(timeInterval);

    countRating(userRating.get(), bpm);
  

    $('#stat_accur').html(accuScore + '%');
    
    stopAutoPlay();
}


function countTime() {
    
    timerRunning = true;

 //  let timeTaken;

    let startTime = new Date().getTime();
    timeInterval = setInterval(() => {
        let currentTime = new Date().getTime();
        timeTaken = currentTime - startTime;
       
       let minutes = Math.floor((timeTaken % (1000 * 60 * 60)) / (1000 * 60));
       let seconds = Math.floor((timeTaken % (1000 * 60)) / 1000);

       if (seconds < 10){ seconds = "0" + seconds; } else { seconds = seconds; }
       if (minutes < 10){ minutes = "0" + minutes; } else { minutes = minutes; }
       

       var timerStat = minutes + ':' + seconds;
        //console.log(convertTime(currentTime-startTime));

        $('#stat_time').html(timerStat);
        
    }, 1000);

    
    
}


function countRating(rating, bpm){

    let skipped = songText.find('.skip').length;
    let totalNotes = songArr.length - skipped; 

    let seconds = Math.floor((timeTaken % (1000 * 60)) / 1000);    

    let prevRating = rating;
    let songDiff = parseInt($('#stat_level').html());
    let rythm = totalNotes / seconds;
    let neededRythm = bpm / 30;
    
    let rythmAccu = (neededRythm - rythm) * 100;

    if (rythmAccu > 100){ rythmAccu = rythmAccu - 100; } 
    else { rythmAccu = rythmAccu; }
    console.log(prevRating)
    let newRating = Math.round(prevRating + (accuScore + rythmAccu)/10 + (songDiff/2));

    userRating.set(newRating);
    $('#stat_rating').html(newRating);

}


