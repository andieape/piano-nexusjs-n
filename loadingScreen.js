var loadScr = {};



loadScr.start = function(){


    
    let noteImg = '<lottie-player class="lottie-p" src="https://assets2.lottiefiles.com/packages/lf20_pSoQ1j.json" mode="bounce" background="transparent" loop autoplay></lottie-player>';
    
    let noteNames = ['D#', 'C#', 'F', 'A#', 'B', 'D', 'G#', 'F#'];
    let noteN = '';

    let noteName = '<div id="noteN"></div>';
    
   // $('#loading-scr').append('');
   
    $('.load-wrap').append(noteImg);
    $('.load-wrap').append(noteName);  

    
    let noteP = $('.lottie-p');
    let logoP = $('#loading-logo');
    let notenameP = $('#noteN');
    noteP.attr('speed', '3');
    noteP.css({'width': '100px', 'height': '120px', 'display':'inline-block', 'margin-top': '10px'});
    logoP.css({'transition' : 'all 1.5s ease-out', 'display': 'block', 'height':'100px', 'opacity':'0'});
    notenameP.css({
        'display': 'inline-block',
        'min-width': '50px',     
        'font-size': '2rem',
        'margin': '0px',
        'position': 'relative',
        'color': 'white',
        'top': '-55px',
        'font-family': 'Georgia, "Times New Roman", Times, serif'
        
    });

    notenameP.text('C');
   
    

    setInterval(() => {

        notenameP.fadeIn(700);
        noteN = noteNames[Math.floor(Math.random() * noteNames.length)];
       
        notenameP.text(noteN);       
        notenameP.fadeOut(700);
    }, 700);      


    setTimeout(() => {
        logoP.css({'opacity':'1'})
    }, 1000);

    $('#loading-scr').show();
};

loadScr.stop = function(){
    $('#loading-scr').hide();
    $('#piano-content').css('visibility','visible');
}
