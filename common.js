var isTouchDevice = (('ontouchstart' in window)
         || (navigator.MaxTouchPoints > 0)
         || (navigator.msMaxTouchPoints > 0));
 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
   || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
  isTouchDevice = true;
 } else {
  isTouchDevice = false;
 }


loadScr.start();

//    var la = new Tone.BufferSource(baseUrl);

Tone.Buffer.on('load', function() {
    loadScr.stop();
    console.log('ready');  
     document.querySelector(".piano-menu__search").classList.add('active');  
});

window.onload = NProgress.done();


$('.loading').addClass('loading-progress');
setTimeout(function() {
    $('.loading').addClass('loaded');
}, 3000)


// create Nexus UI //
Nexus.colors.accent = "transparent";
Nexus.colors.light = "url('#grad-white')";
Nexus.colors.dark = "url('#grad-black')";
Nexus.colors.mediumLight = "transparent";


var buttons = new Nexus.Piano('#Keyboard', {
    'size': [1262, 212],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 24,
    'highNote': 85
});

// var buttons = new Nexus.Piano('#Keyboard', {
//     'size': [1766, 212],
//     'mode': 'button', // 'button', 'toggle', or 'impulse'
//     'lowNote': 24,
//     'highNote': 85
// });
$(window).resize(function(){
    if ($(window).width() <= 1300) {
        buttons.resize(1766, 244);
    } else {
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
    'baseUrl' : '../wp-content/themes/generatepress_child/js-dev/samples/piano/',
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
    'baseUrl' : '../wp-content/themes/generatepress_child/js-dev/samples/new samples/',
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
// var vol2 = new Tone.Volume(-10);

var vol = vol1;

pianO1.chain(vol, Tone.Master);
pianO2.chain(vol, Tone.Master);



var keyMap = {
    '1': 24,'!': 25,'2': 26,'@': 27,'3': 28,'4': 29,'$': 30,'5': 31,'%': 32,'6': 33,'^': 34,'7': 35,'8': 36,'*': 37,'9': 38,'(': 39,'0': 40,'q': 41,'Q': 42,'w': 43,'W': 44,'e': 45,'E': 46,'r': 47,'t': 48,'T': 49,'y': 50,'Y': 51,'u': 52,'i': 53,'I': 54,'o': 55,'O': 56,'p': 57,'P': 58,'a': 59,'s': 60,'S': 61,'d': 62,'D': 63,'f': 64,'g': 65,'G': 66,'h': 67,'H': 68,'j': 69,'J': 70,'k': 71,'l': 72,'L': 73,'z': 74,'Z': 75,'x': 76,'c': 77,'C': 78,'v': 79,'V': 80,'b': 81,'B': 82,'n': 83,'m': 84
    };


    /*Press key animation TEMPORARY*/

// var pressed = false;

function animateKey(id) {
    if (document.getElementById(id).classList.contains("pressed")) {
        document.getElementById(id).classList.remove("pressed");
        document.getElementById(id).parentElement.parentElement.classList.remove('span-pressed');
        
    } else {
        document.getElementById(id).classList.add("pressed");
        document.getElementById(id).parentElement.parentElement.classList.add('span-pressed');
    }

    
}


buttons.on('change', function(note) {    
    
    if (note.state === true) {        
        
        pianO.triggerAttack(Tone.Frequency(note.note, "midi").toNote());
        
    } else if (note.state === false) {
        if (sustClicked){
            pianO.triggerRelease(Tone.Frequency(note.note, "midi").toNote());    
        }    
            
        
    }
});


function playInput(buttons){
document.addEventListener("keydown", (e) => {      
    if (e.repeat) { return };
    if ($('.piano-menu__search-box').hasClass('active')) { return };

       if (e.keyCode >= 48 && e.keyCode <= 90)  {

            animateKey('key_'+ keyMap[e.key]);
            pianO.triggerAttack(Tone.Frequency(keyMap[e.key], "midi").toNote());  

        } else if (e.keyCode == 32){
            e.preventDefault();
        }
});

document.addEventListener("keyup", (e) => {      
          
   
    if (e.keyCode >= 48 && e.keyCode <= 90)  { 
        if (!$('.piano-menu__search-box').hasClass('active') && $('.piano-menu__search').hasClass('active')) {
            $('.piano-menu__played').addClass('active').siblings().removeClass('active');
        } 
        // if (sustClicked){
            pianO.triggerRelease(Tone.Frequency(keyMap[e.key], "midi").toNote());    
        //}
     
         // pressed = false;  
         animateKey('key_'+ keyMap[e.key]);

        $('#piano-chord').html(Tone.Frequency(keyMap[e.key], "midi").toNote());
        $('#piano-key').html(e.key);
        $('#piano-key-history').append(e.key);        

    } else if (e.keyCode == 32){
        e.preventDefault();
        $('#piano-key-history').append(" "); 
    } else if (e.keyCode == 13){
        e.preventDefault();
        $('#piano-key-history').append("<br>"); 
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
});

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
        
       // console.log(Tone.Frequency(keyMap[i], "midi").toNote())
        
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


    /* RESIZE PIANO ON MOBILE */
    // var screenWidth = innerWidth;
    // var screenHeight = innerHeight;   


    // if (screenWidth == 768 && screenWidth < screenHeight){
    //     buttons.resize(1800, 240);
    //     sliderDiv.scrollLeft((buttons.width/36)*10 + 3);

    // }
    // else if (screenWidth <= 813 && screenWidth < screenHeight){
    //     buttons.resize(1700, 240);
    //     sliderDiv.scrollLeft((buttons.width/36)*14 + 3);
    //     console.log('resized!');
    // } else if (screenWidth <= 813 && screenWidth > screenHeight){
    //     buttons.resize(1800, 200);
    //     sliderDiv.scrollLeft((buttons.width/36)*10 + 3);
    //     pianoDiv.scrollIntoView();
    //     console.log('resized! mm');
    // }
  

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
        if (!$(this).hasClass('record-btn') && !$(this).hasClass('assist-btn')) {

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

    $('.record-btn').click(function(e) {
        if ($(this).hasClass('recording')) {

            $('.submenu').removeClass('active');
            if($('.submenu.dragged').length) {
                setTimeout(function() {
                    var classAttr = $('.submenu.dragged').attr('class').split(' ')[1];
                    var menu = $('.' + classAttr).removeClass('dragged').attr('style', '').detach();
                    $('a[data-menu="' + classAttr + '"]').after(menu);
                }, 400);
            }

            $(this).removeClass('recording').addClass('opened');
            $(this).next().addClass('active')
            console.log('stopped')
            stopRecording();

        } else if ($('.record').hasClass('active')) {
            $(this).removeClass('opened active');
            $(this).next().removeClass('active');
            
        } else {
            $(this).addClass('active recording');
            startRecordingNew();
        }
    });
    
    $('.record .close').click(function() {
        $('.record-btn').removeClass('opened active');
        $('.record').removeClass('active');
    })

     $('.record__play-btn').click(function(e) {
        $(this).toggleClass('played');
        var audio = document.getElementById('audio_record');

        setInterval(() => {
            $('#record').val(audio.currentTime);
        }, 10);
        $('#record').attr('step', '0.1');
        $('#record').attr('max', audio.duration);

        if (audio.currentTime == audio.duration){
            clearInterval();
        }
       
        
        if (!$(this).hasClass('played')){
            audio.pause();
            clearInterval();
        } else {
            audio.play();
        }
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
                console.log(event.changedTouches[0].pageX);
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
                    console.log(event.changedTouches[0].pageX);
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

  

    $('.metronome__play').click(function() {
        $(this).toggleClass('played');
        $('.metronome-btn').toggleClass('active');
    })

    $('.transpose__sign').click(function(e) {
        var value = $('.transpose__value span').html();
        if ($(this).hasClass('increment')) {
            if (value < 5) value++;
        } else if (value > -5) {
            value--;
        }

        if (value > 0 && value <= 5) {
            value = '+' + +value;
        }
        $('.transpose__value span').html(value);
        checkSoundModification();
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
            console.log('grand piano');
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
            console.log('sustain off')
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


var buttonSingle = document.getElementById('Keyboard').firstElementChild.childNodes;

for (var button of buttonSingle){
    button.addEventListener("touchstart", function (e) {
       
        e.currentTarget.classList.add('span-pressed');
    });
    button.addEventListener("touchmove", function (e) {
        
        var location = e.changedTouches[0];       
        var targetNow = document.elementFromPoint(location.clientX, location.clientY);
        targetNow.classList.add('span-pressed');
        location.target.classList.remove('span-pressed');     

    });

    button.addEventListener("touchend", function (e) {
        
        e.currentTarget.classList.remove('span-pressed'); 
     
    });


    
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
    var str = document.getElementById('piano-key-history').innerHTML;
    copyToClipboard(str);
})
