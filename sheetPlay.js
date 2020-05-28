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


    buttons.on('change', function (note) {
      
        console.log(note);
        
    })
      
    

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

            } else {
                
                songArr[count].classList.add('wrong');
            }            
    
            count++
    
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
    
          }
          scrollSong();
    });    
    
    
}



function scrollSong() {

    var scrollFocus = document.querySelector('span.active');            

    scrollFocus.scrollIntoView();
    document.getElementById('song-pattern').scrollBy(0, -3.5);
  //  songText.animate({ scrollTop: scrollCount*scrollSize }, 300)
  //  console.log('scrolled');
    
}

function cleanUpSheet(){
    songText.find('span.active').removeClass('active');
    songText.find('span.correct').removeClass('correct');
    songText.find('span.wrong').removeClass('wrong');
    
}

