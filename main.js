var isTouchDevice = (('ontouchstart' in window)
         || (navigator.MaxTouchPoints > 0)
         || (navigator.msMaxTouchPoints > 0));
 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
  isTouchDevice = true;
 } else {
  isTouchDevice = false;
 }

 var playTimer;
 var transValue = 0;
 
 var noteModified;

var tpCache = {};

  tpCache.touches = new Array();
  tpCache.targets = new Array();



//    var la = new Tone.BufferSource(baseUrl);

$('.loading').addClass('loading-progress');

Tone.Buffer.on('load', function() {
    
	$('.loading').addClass('loaded');
    console.log('ready');  
    document.querySelector(".piano-menu__search").classList.add('active');  
});


/*

setTimeout(function() {
    $('.loading').addClass('loaded');
}, 3000)

*/
// create Nexus UI //
Nexus.colors.accent = "transparent";
Nexus.colors.light = "url('#grad-white')";
Nexus.colors.dark = "url('#grad-black')";
Nexus.colors.mediumLight = "transparent";


var buttons = new Nexus.Piano('#Keyboard', {
    'size': [1262, 212],
    'mode': 'impulse', // 'button', 'toggle', or 'impulse'
    'lowNote': 24,
    'highNote': 85
});

var keysHeight = $('.slider').height();
$(window).resize(function(){
    if ($(window).width() <= 1310 && $(window).width() > 1024) {
        buttons.resize(1262, 212);

        var scale = $('.slider').width() / $('#Keyboard').width();

        $('#Keyboard').css({'transform': 'scale(' + scale + ')'});
        $('.slider').css({'height': keysHeight * scale + 20 + 'px'})
        
    } else if ($(window).width() <= 1024) {
        $('#Keyboard').css({'transform': 'scale(1)'});
        $('.slider').css({'height': 'auto'});
        console.log($(window).width())
        buttons.resize(1766, 244);
        $('.slider').scrollLeft((buttons.width/36)*10 + 3);
    } else {

        $('#Keyboard').css({'transform': 'scale(1)'});
        $('.slider').css({'height': 'auto'})
        buttons.resize(1262, 212);
    }
})

$(window).trigger('resize');




Tone.context.latencyHint = 'interactive';

var pianO;

var pianO1 = new Tone.Sampler({

    'A0' : 'A0.[mp3]',
    'C1' : 'C1.[mp3]',
    'D#1' : 'Ds1.[mp3]',
    'F#1' : 'Fs1.[mp3]',
    'A1' : 'A1.[mp3]',
    'C2' : 'C2.[mp3]',
    'D#2' : 'Ds2.[mp3]',
    'F#2' : 'Fs2.[mp3]',
    'A2' : 'A2.[mp3]',
    'C3' : 'C3.[mp3]',
    'D#3' : 'Ds3.[mp3]',
    'F#3' : 'Fs3.[mp3]',
    'A3' : 'A3.[mp3]',
    'C4' : 'C4.[mp3]',
    'D#4' : 'Ds4.[mp3]',
    'F#4' : 'Fs4.[mp3]',
    'A4' : 'A4.[mp3]',
    'C5' : 'C5.[mp3]',
    'D#5' : 'Ds5.[mp3]',
    'F#5' : 'Fs5.[mp3]',
    'A5' : 'A5.[mp3]',
    'C6' : 'C6.[mp3]',
    'D#6' : 'Ds6.[mp3]',
    'F#6' : 'Fs6.[mp3]',
    'A6' : 'A6.[mp3]',
    'C7' : 'C7.[mp3]',
    'D#7' : 'Ds7.[mp3]',
    'F#7' : 'Fs7.[mp3]',
    'A7' : 'A7.[mp3]',
    'C8' : 'C8.[mp3]'
},
 {
    'baseUrl' : './samples/piano/',
    curve: "exponential",
    attack: 0,
    release: 4,
    sustain: 1,
    decay: 1    
});


var pianO2 = pianO1;/* new Tone.Sampler({

    
    'A0' : 'A0.[mp3]',
    'C1' : 'C1.[mp3]',
    'D#1' : 'Ds1.[mp3]',
    'F#1' : 'Fs1.[mp3]',
    'A1' : 'A1.[mp3]',
    'C2' : 'C2.[mp3]',
    'D#2' : 'Ds2.[mp3]',
    'F#2' : 'Fs2.[mp3]',
    'A2' : 'A2.[mp3]',
    'C3' : 'C3.[mp3]',
    'D#3' : 'Ds3.[mp3]',
    'F#3' : 'Fs3.[mp3]',
    'A3' : 'A3.[mp3]',
    'C4' : 'C4.[mp3]',
    'D#4' : 'Ds4.[mp3]',
    'F#4' : 'Fs4.[mp3]',
    'A4' : 'A4.[mp3]',
    'C5' : 'C5.[mp3]',
    'D#5' : 'Ds5.[mp3]',
    'F#5' : 'Fs5.[mp3]',
    'A5' : 'A5.[mp3]',
    'C6' : 'C6.[mp3]',
    'D#6' : 'Ds6.[mp3]',
    'F#6' : 'Fs6.[mp3]',
    'A6' : 'A6.[mp3]',
    'C7' : 'C7.[mp3]',
    'D#7' : 'Ds7.[mp3]',
    'F#7' : 'Fs7.[mp3]',
    'A7' : 'A7.[mp3]',
    'C8' : 'C8.[mp3]'
    
},
 {
    'baseUrl' : './samples/new samples/',
    curve: "exponential",
    attack: 0,
    release: 4,
    sustain: 1,
    decay: 1    
});
*/



pianO = pianO1;


var switchClicked = false,
    sustClicked = false;



var vol1 = new Tone.Volume(-10);


var vol = vol1;

pianO1.chain(vol, Tone.Master);
pianO2.chain(vol, Tone.Master);



var keyMap = {
    '1': 24,'!': 25,'2': 26,'@': 27,'3': 28,'4': 29,'$': 30,'5': 31,'%': 32,'6': 33,'^': 34,'7': 35,'8': 36,'*': 37,'9': 38,'(': 39,'0': 40,'q': 41,'Q': 42,'w': 43,'W': 44,'e': 45,'E': 46,'r': 47,'t': 48,'T': 49,'y': 50,'Y': 51,'u': 52,'i': 53,'I': 54,'o': 55,'O': 56,'p': 57,'P': 58,'a': 59,'s': 60,'S': 61,'d': 62,'D': 63,'f': 64,'g': 65,'G': 66,'h': 67,'H': 68,'j': 69,'J': 70,'k': 71,'l': 72,'L': 73,'z': 74,'Z': 75,'x': 76,'c': 77,'C': 78,'v': 79,'V': 80,'b': 81,'B': 82,'n': 83,'m': 84
    };


    /*Press key animation TEMPORARY*/

//var pressed = false;

function animateKey(id) {
    

    id = '#key_' + id;
    
   if (id == 'key_undefined') {return};     
        
     var keyId = $(id);
    
    if (keyId.hasClass('pressed') && noteModified){

        keyId.removeClass('pressed');
        keyId.parent().parent().removeClass('span-pressed');
        
    } else if (keyId.hasClass('pressed')) {
        keyId.removeClass('pressed');
        keyId.parent().parent().removeClass('span-pressed');

    } else if (!keyId.hasClass('pressed') && !noteModified) {
        keyId.addClass('pressed');
        keyId.parent().parent().addClass('span-pressed');

    } else if (!keyId.hasClass('pressed') && noteModified) {
        keyId.addClass('pressed');
        keyId.parent().parent().addClass('span-pressed');

    } 
   
}


var noteMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => ([v, k])));

buttons.on('change', function(note) {  

    if (!note) {return};
   
    
    let currentKey = '#key_' +note.note;
    currentKey = $(currentKey);
    console.log(currentKey)
    

    if (!$('.piano-menu__played').hasClass('active') && !$('.piano-menu__song').hasClass('active')){
        $('.piano-menu__played').addClass('active').siblings().removeClass('active');

    }
    
    if (note.state === true) {      
           
        
        pianO.triggerAttack(Tone.Frequency(note.note + parseInt(transValue), "midi").toNote());      
        currentKey.parent().parent().addClass('span-pressed');

        
        if ($('.piano-menu__played').hasClass('active')){
            
            if (tpCache.touches.length > 1){
                console.log(tpCache.touches)
             $('#piano-chord').html(Tone.Frequency(note.note, "midi").toNote());
             $('#piano-key').html(noteMap[note.note]);  
             $('#piano-key-history').append('<span>'+noteMap[note.note]+'</span>'); 

            } else {
                console.log('aa')
                $('#piano-chord').html(Tone.Frequency(note.note, "midi").toNote());
                $('#piano-key').html(noteMap[note.note]);  
                $('#piano-key-history').append('<span>'+noteMap[note.note]+'</span>'); 

            }

         
             var scrollHistory = document.getElementById('piano-key-history').lastChild;
                 scrollHistory.parentNode.scrollTop = scrollHistory.offsetTop - scrollHistory.parentNode.offsetTop;      			
           }
             

        
                    
    } else if (note.state === false) {
    
        currentKey.parent().parent().removeClass('span-pressed');

        if (sustClicked){
            pianO.triggerRelease(Tone.Frequency(note.note + parseInt(transValue), "midi").toNote());    
        } 



    }

    if(!$('.piano-menu__song-start').hasClass('hidden')){
        $('.piano-menu__song-start').addClass('hidden');
    }

});


function playInput(){

document.addEventListener("keydown", (e) => {    
    
    e.stopPropagation();
    e.stopImmediatePropagation();

    
    if (e.repeat) { return };   
    if ($('.piano-menu__search-box').hasClass('active')) { return };
    if (!keyMap[e.key] && e.keyCode != 32  && e.keyCode != 8 && e.keyCode != 13 ) { return };
    if (keyMap[e.key] == 'key_undefined') { return };
       if (e.keyCode >= 48 && e.keyCode <= 90)  {

        keysPressed[e.key] = true;
        noteModified = e.getModifierState("Shift");        
        animateKey(keyMap[e.key]);
        
        pianO.triggerAttack(Tone.Frequency(keyMap[e.key]  + parseInt(transValue), "midi").toNote());  
        if (!noteModified) {            
            

            
            let next = keyMap[e.key] +1;            
            if ($("#key_" + next).hasClass('pressed')) {
                animateKey(next);
            }
        }


        } else if (e.keyCode == 32){
            e.preventDefault();
        }
      

});


document.addEventListener("keyup", (e) => {
        if (e.repeat) { return };
       
        if (!keyMap[e.key] && e.keyCode != 32  && e.keyCode != 8 && e.keyCode != 13 && e.keyCode != 219 && e.keyCode != 221 && e.keyCode != 220 ) { return };
              
       
        if ((e.keyCode >= 48 && e.keyCode <= 90))  {             

             if (sustClicked){
                pianO.triggerRelease(Tone.Frequency(keyMap[e.key] + parseInt(transValue), "midi").toNote());    
            }
         
         

         if (!$('.piano-menu__search-box').hasClass('active') && $('.piano-menu__search').hasClass('active') && !$('.piano-menu__song').hasClass('active')) {
            $('.piano-menu__played').addClass('active').siblings().removeClass('active');
        }
		 
		 if (!$('.piano-menu__search-box').hasClass('active')){
             
             if (!noteModified) {
                animateKey(keyMap[e.key]);   
                let next =  keyMap[e.key]+1;
               
                if ($("#key_" + next).hasClass('pressed')) {
                    animateKey(keyMap[next])

                }
                
             } else if (noteModified){
                animateKey(keyMap[e.key]);                
             }
		 }
         
       

         if ($('.piano-menu__played').hasClass('active')){                
            
    
            $('#piano-chord').html(Tone.Frequency(keyMap[e.key], "midi").toNote());
            $('#piano-key').html(e.key);
            $('#piano-key-history').append('<span>'+e.key+'</span>');            
            var scrollHistory = document.getElementById('piano-key-history').lastChild;
            scrollHistory.parentNode.scrollTop = scrollHistory.offsetTop - scrollHistory.parentNode.offsetTop;	
             
          }

        } else if ((e.key == "|" || e.key == '[' || e.key == ']' || e.keyCode == 32 ) && $('.piano-menu__played').hasClass('active')){ 
            
            
                e.preventDefault();
                $('#piano-key-history').append('<span>'+e.key+'</span>'); 

        } else if (e.keyCode == 13){
            e.preventDefault();
            $('#piano-key-history').append("\n").append('<br>');
             
			
        } else if (e.keyCode == 8){
            e.preventDefault();
            console.log('))')
            $('#piano-key-history').children().last().remove();

        } else {
            return;
        }
    
         /*   if(Tone.Frequency(keyMap[e.key], "midi").toNote() !== 'undefined-Infinity') {
                
                $('#piano-chord').html(Tone.Frequency(keyMap[e.key], "midi").toNote());
                $('#piano-key').html(e.key);
                $('#piano-key-history').append(e.key);
            }
            */
        
        if ($('.piano-menu__song').hasClass('active')) {
            $('.piano-menu__song-start').addClass('hidden');
        }       

        setTimeout(() => {     
          delete keysPressed[e.key];  
           // keysPressed = {}           
            
        }, 100);
      
        setTimeout(() => {
            
            
            if (Object.keys(keysPressed).length > 0) {return}
            
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

        }, 150);
       

});

/*

$('#Keyboard rect').on("touchstart", (e) => {
    keyNow = e.target.id.split('_')[1];
    console.log(e.originalEvent.target);

    pianO.triggerAttack(Tone.Frequency(parseInt(keyNow) + parseInt(transValue), "midi").toNote());      

    animateKey(keyNow);
    $('#logg').append(e.touches.length + " ");
    
    e.preventDefault();
    e.stopPropagation();
    return false;

});

$('#Keyboard rect').on("touchend", (e) => {
    keyNow = e.target.id.split('_')[1];
    
    animateKey(keyNow);
    $('#logg').append(e);
    
    e.preventDefault();

});
*/


$('.piano-menu__played-back').click(function() {
    $('.piano-menu__search').addClass('active').siblings().removeClass('active');
    $('#piano-key-history').html('');
});

$('.piano-menu__song-start').on('click', function() {
    $(this).addClass('hidden');
    
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
        buttons.resize(1200, 150);
        Tone.context.lookAhead = 0.1;
    } else {
       // buttons.resize(1000, 150);
        Tone.context.lookAhead = 0;
    }
}*/


/* Setting IDs for keys*/

//reordering the obj to set the ids
var keyIds = Object.values(keyMap).sort(function(a, b){return a-b});
var keyNames = Object.values(Object.fromEntries(Object.entries(keyMap).map(([k, v]) => ([v, k]))));

var sliderDiv = $('.slider');
var pianoDiv = document.getElementById('piano-body');

window.onload = function(){
    
    var keyB = document.querySelectorAll('rect');
    var keySpan = document.querySelector("#Keyboard").getElementsByTagName('span');

    var noteKeys = ['c','c#','d','d#','e','f', 'f#','g','g#','a','a#','b'];    
    var octaveCount = 6;

    var allKeys = [];

    for (var k=0;k<octaveCount; k++){        
        for (var z=0; z<noteKeys.length; z++){
           
            allKeys.push(noteKeys[z]+""+(k+1));
        }
    }

    for (var i=0; i < keyB.length; i++){
        var key = keyB[i];
        var span = keySpan[i];     
        
        if (key){
            key.setAttribute('id', 'key_'+ keyIds[i]);
              //    $('<label>'+ keyIds[i] +'<label>').appendTo(labelTarget[i]).css('position: absolute');
            if (key.getAttribute('fill') === "url('#grad-black')") {
               key.classList.add('key-black');
               span.classList.add('key-span-black');
               span.id = 'span_b_' + keyIds[i];
              $('<label class="keyassist keylabel-b assikeys">'+keyNames[i-1]+'<br>+<br>⇧' +'<label>').css({'opacity': '0'}).appendTo(span);
              $('<label class="keyassist keylabel-b assinotes rotate-text">'+allKeys[i] +'<label>').css({'opacity': '0'}).appendTo(span);

            } else {

              key.classList.add('key-white');
              span.classList.add('key-span-white');
              span.id = 'span_w_' + keyIds[i];
              $('<label class="keyassist keylabel-w assikeys">'+keyNames[i]+'<label>').css({'opacity': '0'}).appendTo(span);
              $('<label class="keyassist keylabel-w assinotes">'+allKeys[i]+'<label>').css({'opacity': '0'}).appendTo(span);

            }                
        }                   
    }

    // open search box
   $('.piano-menu__search-box').click(function() {
       if ($('.piano-menu__search input').val()) {
           $('.piano-menu__search-results').addClass('active');
       }
       $(this).addClass('active')
   })
   // close search box if clicked outside of search box
   $(document).on('click', function(e) {
       if ($(e.target)[0] !== $('.piano-menu__search-box')[0] && $(e.target)[0] !== $('.piano-menu__search-box input')[0]) {
           $('.piano-menu__search-box, .piano-menu__search-results').removeClass('active');
       }
   })
   $('.piano-menu__top .close').click(function() {
       $('.piano-menu__search').addClass('active').siblings().removeClass('active');
       $('.piano-menu__song-start').removeClass('hidden');
   })
   
   $('.piano-menu__search input').on('input', function() {
       // if search input !== 0 then reveal the search results
       if ($(this).val()) {
           $(this).next().addClass('active');
       } else {
           $(this).next().removeClass('active');
       }
   })
   
       // PICK A SONG FROM SEARCH
     
       
   $('.stats-toggle').click(function () {
       $(this).toggleClass('active');
       $('.piano-menu__song-stats').toggleClass('invisible');
   })

    $('.piano-menu__bottom-btn').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('assist-btn')) {

            if (!$(this).hasClass('opened')) {
                $('.submenu').removeClass('active');
                
                if($('.submenu.dragged').length) {
                    setTimeout(function() {
                        var classAttr = $('.submenu.dragged').attr('class').split(' ')[1];
                        var menu = $('.' + classAttr).removeClass('dragged').attr('style', '').detach();
                        $('a[data-menu="' + classAttr + '"]').after(menu);
                    }, 400);
                }

                $(this).addClass('opened').parent().siblings().find('.piano-menu__bottom-btn').removeClass('opened');
                $(this).next().addClass('active');
            } else {  
                $(this).removeClass('opened');
                $('.submenu').removeClass('active');

                var classAttr = $(this).attr('data-menu');
                var that = $(this);
                setTimeout(function() {
                    that.after($('.' + classAttr).removeClass('dragged').attr('style', ''));
                }, 400);
            }
        }
        
    })

    $('.record__start').click(function() {
        $('.record-btn').addClass('active recording');
        $(this).removeClass('active').siblings().addClass('active');

        startRecordingNew();
    })
    $('.record__stop').click(function() {
        $('.record-btn').removeClass('recording').addClass('opened');
        $('.record__stopped').addClass('active').siblings().removeClass('active');
        if($(this).parent().hasClass('record__initial')){
            $(this).removeClass('active');
        } else {
            $(this).removeClass('active').siblings().addClass('active');
        }

        console.log('stopped')
        stopRecording();
    })


    

     $('.record__play-btn').click(function(e) {
        $(this).toggleClass('played');
        var audio = document.getElementById('audio_record');

       
        $('#record').attr('step', '0.1');
        $('#record').attr('max', audio.duration);

        if (audio.currentTime == audio.duration){
            clearInterval(playTimer);
        }       
        
        if (!$(this).hasClass('played')){
            audio.pause();
            clearInterval(playTimer);
            
        } else {
            audio.play();
            playTimer = setInterval(() => {                
                $('#record').val(audio.currentTime);                
                $('.record__time').children().first().html(convertTime(audio.currentTime));
            }, 10);
        }
     });

     $('#record').on('input', function(e) {
        var audio = document.getElementById('audio_record');
        audio.currentTime = $('#record').val()
         $('.record__time').children().first().val($('#record').val());
     });

     $('.assist-btn').click(function() {
        if ($(this).hasClass('assist-notes')) {
            $(this).removeClass('active').removeClass('assist-notes');
            $('.assikeys').css({'opacity': '0', 'transition': '.3s'});
            $('.assinotes').css({'opacity': '0', 'transition': '.3s'});
        } else if (!$(this).hasClass('active')) {
            $(this).addClass('active').addClass('assist-keys');
            $('.assikeys').css({'opacity': '1', 'transition': '.3s'});
        } else if ($(this).hasClass('assist-keys')){
            $(this).addClass('assist-notes').removeClass('assist-keys');
            $('.assikeys').css({'opacity': '0', 'transition': '.0s'});
            $('.assinotes').css({'opacity': '1', 'transition': '.3s'});
        }
    });

    
        if ($(window).width() <= 1024){
            $('.assist-btn').trigger('click');
        }
    

   

     var dragBlocks = document.querySelectorAll('.submenu');
     dragBlocks.forEach((el) => {
         if(!isTouchDevice) {
            el.onmousedown = function(event) {
              if (event.target.classList.contains('submenu')) {
                let shiftX = event.clientX - el.getBoundingClientRect().left;
                let shiftY = event.clientY - el.getBoundingClientRect().top;

                $(el).addClass('dragged');
                el.style.position = 'absolute';
                el.style.zIndex = 1000;
                el.style.transition = '0s';
                document.body.append(el);

                moveAt(event.pageX, event.pageY);

                // moves the dragBlock at (pageX, pageY) coordinates
                // taking initial shifts into account
                function moveAt(pageX, pageY) {
                  el.style.left = pageX - shiftX + 'px';
                  el.style.top = pageY - shiftY + 'px';
                }

                function onMouseMove(event) {
                  moveAt(event.pageX, event.pageY);
                }

                // move the dragBlock on mousemove
                document.addEventListener('mousemove', onMouseMove);

                // drop the dragBlock, remove unneeded handlers
                el.onmouseup = function() {
                  document.removeEventListener('mousemove', onMouseMove);
                  el.onmouseup = null;
                  el.style.transition = '0.4s';
                };

              }
              
            };
            el.ondragstart = function() {
              return false;
            };
         } else {
            
            // touchstart, touchmove, touchcancel, and touchend
            el.ontouchstart = function(event) {
              if (event.target.classList.contains('submenu')) {
                let shiftX = event.changedTouches[0].clientX - el.getBoundingClientRect().left;
                let shiftY = event.changedTouches[0].clientY - el.getBoundingClientRect().top;

                $(el).addClass('dragged');
                el.style.position = 'absolute';
                el.style.zIndex = 1000;
                el.style.transition = '0s';
                document.body.append(el);

                moveAt(event.changedTouches[0].pageX, event.changedTouches[0].pageY);

                // moves the dragBlock at (pageX, pageY) coordinates
                // taking initial shifts into account
                function moveAt(pageX, pageY) {
                  el.style.left = pageX - shiftX + 'px';
                  el.style.top = pageY - shiftY + 'px';
                }

                function onMouseMove(event) {
                  moveAt(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
                }

                // move the dragBlock on mousemove
                document.addEventListener('touchmove', onMouseMove);

                // drop the dragBlock, remove unneeded handlers
                el.ontouchend = function() {
                  document.removeEventListener('touchmove', onMouseMove);
                  el.onmouseup = null;
                  el.style.transition = '0.4s';
                };

              }
              
            };
            el.ondragstart = function() {
              return false;
            };
         }
    
        

        
    });
     $('.hamburger').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.piano-menu__bottom, .submenu').removeClass('active'); 
            $('.piano-menu__bottom-btn').removeClass('opened');            
        } else {
            $(this).addClass('active');
            $('.piano-menu__bottom').addClass('active');
        }
     })

    $('.metronome__sign').click(function () {
        if ($(this).hasClass('plus')) {
            $('.metronome input').val(+$('.metronome input').val() + 1);
        } else {
            $('.metronome input').val($('.metronome input').val() - 1);
        }
        $('.metronome input').trigger('change');
    })

    var tickStart, tickEnd;
    $('.metronome input').change(function() {
        $('.metronome__bpm').html($(this).val());
        updateTicker();
    })

    $('.metronome__play').click(function() {
        if (!$(this).hasClass('played')) {
            $(this).addClass('played');
            $('.metronome-btn').addClass('active');

            var metronomeValue = $('.metronome input').val();
            var interval = 1000 / (metronomeValue / 60);

            metroPlay(interval/1000);

            tickStart = setInterval(function () {
                
                $('.metronome__ticker').css({'opacity': '1', 'transform': 'scale(1.25)'})
            }, interval/2)
            tickEnd = setInterval(function () {
                
                $('.metronome__ticker').css({'opacity': '0', 'transform': 'scale(1)'})
            }, interval)
            
        } else {
            $(this).removeClass('played');
            $('.metronome-btn').removeClass('active');
            clearInterval(tickStart);
            clearInterval(tickEnd);
            metroStop();
        }
        
    })
    function updateTicker() {
        clearInterval(tickStart);
        clearInterval(tickEnd);

        if ($('.metronome__play').hasClass('played')){
            $('.metronome__play').removeClass('played');
        }

        var metronomeValue = $('.metronome input').val();
        var interval = 1000 / (metronomeValue / 60);

        tickStart = setInterval(function () {
            $('.metronome__ticker').css({'opacity': '1', 'transform': 'scale(1.25)'})
        }, interval/2)
        tickEnd = setInterval(function () {
            $('.metronome__ticker').css({'opacity': '0', 'transform': 'scale(1)'})
        }, interval)
    }


    $('.transpose__sign').click(function(e) {
        transValue = $('.transpose__value span').html();
        if ($(this).hasClass('increment')) {
            if (transValue < 10) transValue++;
        } else if (transValue > -10) {
            transValue--;
        }

        if (transValue > 0 && transValue <= 10) {
            transValue = '+' + +transValue;
        }
        $('.transpose__value span').html(transValue);
        checkSoundModification();
        return transValue;
    });
    $('.type__current').click(function(e) {
        $(this).parents('.type').toggleClass('active');
    });
    $('.type__custom li').click(function(e) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.type').removeClass('active');
        $(this).parents('.type').find('option').eq($(this).index()).prop('selected', true);
        $(this).parents('.type').find('.type__current').html($(this).parents('.type').find('option:selected').html());

        if ($('#piano-type option:selected').val() !== 'CLASSICAL PIANO') {
            pianO = pianO2;
            switchClicked = true;
        } else {
            pianO = pianO1;
            switchClicked = false;
        }
        
        
        checkSoundModification();
    });
    
    $('.sound input').change(function() {
        checkSoundModification();
    });
    $('.sustain input').change(function () {
        if ($(this).is(':checked')) {
            sustClicked = false;
            pianO.release = 10;
        } else {
            sustClicked = true;        
            pianO.release = 2;
        }
    })
    function checkSoundModification() {
        if (!$('.sustain input').prop('checked') || $('.transpose__value span').html() !== '0' || $('.type option:selected').val() !== 'CLASSICAL PIANO') {
            $('.sound-btn').addClass('active');
        } else {
            $('.sound-btn').removeClass('active');
        }
    }
    $(document).on('click', '.submenu .close', function(){
        $('.submenu').removeClass('active');
        $('.piano-menu__bottom a').removeClass('opened');

        var that = $(this);
        setTimeout(function() {
            var classAttr = that.parent().attr('class').split(' ')[1];
            var menu = that.parent().removeClass('dragged').attr('style', '').detach();
            $('a[data-menu="' + classAttr + '"]').after(menu);
        }, 400);
    })
}



function copyToClipboard(str) {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
     };    

$('.piano-menu__played-copy').on('click', function() {
    var str = document.getElementById('piano-key-history').textContent;

    copyToClipboard(str);
})

$('.song-hamburger').click(function () {
    $('.piano-menu__song-menu').addClass('active');
})
$('.close-song-menu').click(function () {
    $('.piano-menu__song-menu').removeClass('active');
})


