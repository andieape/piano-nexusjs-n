var songText = $('#song-pattern');
var songArr = [];
var lineBreak = [];
var count = 0;
var playBtn = $('#play-btn');
var closeBtn = $('.piano-menu__top .close');
var restartBtn = $('#restart-btn');
var playBoo = false;

var scrollCount = 0;
var countSc = 0;

playBtn.on('click', function(){   
    playBoo = true;
    $('.piano-menu__song-start').addClass('hidden');
    pianoPlay();
});

restartBtn.on('click', function() {
    count = 0;
    scrollCount = 0;
    cleanUpSheet();
    songText.scrollTop(0);
    pianoPlay();    
 
});
closeBtn.on('click', function() {
    count = 0;
    scrollCount = 0;
    cleanUpSheet();
    songText.scrollTop(0);       
})



function pianoPlay() {   
    
   

    songArr = songText.find('span');    

    var lastNote =  songArr[songArr.length-1]
    console.log(lastNote)
    
    if (songArr[count+1].classList[0] != 'skip') {
        songArr[count].classList.add('active');
    } else {
        count++
        songArr[count].classList.add('active');
        
    }

    document.addEventListener('keydown', function(e){

        

        if (e.repeat){return}
        if (e.keyCode >= 48 && e.keyCode <= 90) {
            e.stopImmediatePropagation()
            var key =  songArr[count]; 
           
            if (count <= songArr.length-1){           
    
            songArr[count].classList.remove('active');
    
            if (e.key == key.innerHTML) {
                //scrollSong(lastNote, songText);
                songArr[count].classList.add('correct');   

            }/* else if (songArr[count+1].classList[0] == 'skip') {
              //  scrollSong(lastNote, songText);
                //console.log('gotcha')
              //  count++
            } */ else {
                
                songArr[count].classList.add('wrong');
            }
            
    
            count++
            countSc++
    
                //except last note
                if (count <= songArr.length-1 && songArr[count].classList[0] != 'skip'){
                    songArr[count].classList.add('active');
                  
                } else {
                    count++
                    songArr[count].classList.add('active');
                }
            
            } else {            
                //handle the song end here
                console.log('song end');
            } 
            
            if (songText.find('span.active').prev().is('br')){

                scrollSong(lastNote, songText);
               
            } else if (songText.find('span.active').prev().hasClass('skip')){
               
               if (songText.find('span.active').prev().prev().is('br')){                   
                    scrollSong(lastNote, songText);
                } else if (songText.find('span.active').prev().prev().hasClass('skip')) {
                    if (songText.find('span.active').prev().prev().prev().is('br')){                    
                         scrollSong(lastNote, songText);
                     }
                }
            } 
            
    
          }

    });
    
    
    
}



function scrollSong(lastNote, songText) {

    //var scrollSize = songText.find('span.active').offset().top - songText.offset().top;  
    var scrollSize = 22;

    scrollCount++
    
    lastNote.style.paddingBottom = scrollCount*(scrollSize).toString() + 'px';
 //   songText.scrollTop(scrollCount*scrollSize);
   songText.animate({ scrollTop: scrollCount*scrollSize }, 300)
    console.log('scrolled');
    
}

function cleanUpSheet(){
    songText.find('span.active').removeClass('active');
    songText.find('span.correct').removeClass('correct');
    songText.find('span.wrong').removeClass('wrong');
    
}