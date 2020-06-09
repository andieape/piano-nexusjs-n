var pageReferrer = document.referrer;
var stArr;

$(document).ready(function(){

    $("#search-input").on('input', function(e){
       
        var searchString = $("#search-input").val();
        $('#search-result').empty();
        if (searchString.length >= 3){
            $.getJSON("https://devv.virtualpiano.net/wp-json/wp/v2/posts?search="+searchString, function(data){
                var songs = data;
                if (songs.length > 0){
                    $('#search-result').empty();
                

                for (song of songs){
        
                    if (song.categories[0] === 2){                    

                    $('#search-result').append('<li class="song-item" value='+song.id+'>'+song.title.rendered+'</li>');
                }
                   }
                } else {
                    $('#search-result').empty();
                    $('#search-result').append('<span>nothing found</span>');
                }
            })
        
        } else {
            $('#search-result').append('<span>continue typing...</span>');
        }
    });
    // PICK A SONG FROM SEARCH
    $('#search-result').on('click', 'li', function(e) {
      
        $('.piano-menu__song').addClass('active').siblings().removeClass('active');

       renderSong(e.currentTarget.value);
        
    })
    

        
//        $('.piano-menu__song').addClass('active').siblings().removeClass('active');
    



    $.getJSON('https://devv.virtualpiano.net/wp-json/wp/v2/posts', function(data){
        var songs = data;

        for (song of songs){
            console.log(song.categories[0]);

            if (song.categories[0] === 2){
            $("#song-search").append("<option class='song-item' value="+song.id+">"+song.title.rendered+"</option>");
            }
           }

    });

   

    


    function renderSong(songId) {  

            $.getJSON('https://devv.virtualpiano.net/wp-json/wp/v2/posts/'+songId, function(response){        
                stArr = response.content.rendered.split('<p class')[0].replace(/  /g, ' ').replace(/\n/g, "").replace(/<br>/g, " \n ").replace(/<p>/g, " -par- ").replace(/<\/p>/g, "").replace(/\s+(?=[^[\]]*\])/g, '.').replace(/  /g, " ").split(" ");
                stArr.splice(0, 4);    
                
                var dArr =  response.content.rendered.split('<p class')[0].replace(/  /g, ' ').replace(/\n/g, "").replace(/<br>/g, " \n ").replace(/<p>/g, " -par- ").replace(/<\/p>/g, "").replace(/\s+(?=[^[\]]*\])/g, '.').replace(/([^-\]\|\s]{1})(\s)/g, '$1. ').replace(/  /g, " ").split(" ");
                dArr.splice(0, 2);

                console.log(dArr);
                $('#song-info').empty();
                $('#song-pattern').empty();
               

                console.log(dArr)
                console.log(stArr[stArr.length-1])

                for (let k=0; k<dArr.length; k++) {
                    let letter = dArr[k];
                    let letterNext = dArr[k+1];
                    let letterPrev = dArr[k-1];
                    let songPattern = $('#song-pattern');

                    k == stArr.length-1 ? letterNext = 'none' : letterNext = stArr[k+1];

                   

                    if (letter == '\n'){

                        songPattern.append('<br>');
                    } else if (letter.length < dArr.length-1 && letter == '-par-'){
                        songPattern.append('<br>');
                        let kk = 0;
                        while (kk < 10){
                            songPattern.append('<span class="pause par">.</span>');
                            kk++
                        }
                        songPattern.append('<br>');

                    }  else if (dArr[k].length > 1 && letter[letter.length-1] == ']' && letter[2] == '.'){

                        let chordGliss = dArr[k].slice(1, letter.length-1).split('');
                       
                        songPattern.append(letter[0]);
                        
                        songPattern.append('<span class="chord-gliss"></span>'); 
                        console.log(chordGliss);
                        let z = 0;

                        do  {

                            let gliss = chordGliss[z];
                            console.log(gliss);
                            if (gliss != '.'){
                                $('.chord-gliss').append('<span class="gliss">'+gliss+'</span>'); 
                            } else {
                                $('.chord-gliss').append(gliss); 
                            }
                            z++
                        } while (z<chordGliss.length)
                        
                                     
                        songPattern.append(letter[letter.length-1]);
                        songPattern.append('<span class="pause">.</span>');

                    } else if (letter.length > 1 && letter[0] == '[') {   
                        
                        if ( k != 0 && letterPrev[0] == '[') {
                            songPattern.append('<span class="pause"></span>')
                                        .append(letter[0])
                                        .append('<span class="chord">'+letter.slice(1, letter.length-1)+'</span>')                  
                                        .append(letter[letter.length-1])
                                        .append('<span class="pause">.</span>');
                                        
                        } else {
                            songPattern.append(letter[0])
                                        .append('<span class="chord">'+letter.slice(1, letter.length-1)+'</span>')                  
                                        .append(letter[letter.length-1])
                                        .append('<span class="pause">.</span>');
                        }

                    } else if (letter.length == 0 && letter == " "){
                        songPattern.append('<span class=pause>.</span>')
                        
                    } else if (letter.length == 2 && letter[1] == '.') {

                        songPattern.append('<span>' + letter[0] + '</span>');
                        songPattern.append('<span class="pause">' + letter[1] + '</span>');

                    } else if (letter.length > 1 && letter[0] != '[' ){
                        let letArr = letter.split('');
                        
                        for (let lettr of letArr){
                           
                            if (lettr != "\n" && lettr != '.') {
                                
                              songPattern.append('<span>'+lettr+'</span>');
                            
                            } else if (lettr == '.'){
                                songPattern.append('<span class=pause>' + lettr + '</span>')
                            }
                        }
                    } else if (letter.length > 1 && letter[letter.length-1] == ']' && letter[2] == '.'){

                        let chordGliss = letter.slice(1, letter.length-1).split('');

                        songPattern.append(letter[0]);
                        
                        songPattern.append('<span class="chord-gliss"></span>');  
                        for (let gliss of chordGliss) {
                            if (gliss != '.'){
                                $('.chord-gliss').append('<span class="gliss">'+gliss+'</span>'); 
                            } else {
                                $('.chord-gliss').append(gliss); 
                            }
                        }                  
                        songPattern.append(letter[letter.length-1]);
                        songPattern.append('<span class="pause">.</span>');

                    } else if (letter == '|') {

                        songPattern.append('<span class="pause long"></span>')
                        songPattern.append(letter);
                        songPattern.append('<span class="pause">.</span>')
                        songPattern.append('<span class="pause"></span>')
                        songPattern.append('<span class="pause"></span>')                        
                        

                    } else {
                        songPattern.append('<span>' + letter + '</span>');
                    }

                }

             
              $('.song_wrapper').show();                
        
              $('#song-info').html(response.title.rendered); 
              count = 0;
              console.log(playBoo);
           if (!playBoo) {
        
                pianoPlay();       
          
            } else {          
                cleanUpSheet();         
            }   
             
              
            })        


        
  
          

}
   



//var pageReferrer = document.referrer;

if (pageReferrer.length > 0 && window.location.href.indexOf('song-') > 0) {    

    
    var songIdRef = window.location.href.split('post-')[1];
    renderSong(songIdRef);    
    
        $('.piano-menu__search').removeClass('active');
        $('.piano-menu__song').addClass('active');
        count = 0;
        pianoPlay();



    

    
}

})