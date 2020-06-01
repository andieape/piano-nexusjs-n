var pageReferrer = document.referrer;

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

    $("#song-search").select2({
        placeholder: 'Select an option',
        width: '200px'
    });
   

    $("#song-search").on('change', function(){

        var songId = $('#song-search option:selected').attr("value");      
        renderSong(songId);
         

    });  
    


    function renderSong(songId) {  

            $.getJSON('https://devv.virtualpiano.net/wp-json/wp/v2/posts/'+songId, function(response){        

                var stArr = response.content.rendered.split('<p class')[0].replace(/<br>/g, " \n ").replace(/<p>/g, " \n ").replace(/<\/p>/g, "").replace(/ /g, "  ").split(" ");
                      
                $('#song-info').empty();
                $('#song-pattern').empty();
                console.log(stArr)
        
                for (let k=0; k<stArr.length; k++){

                   let letter = stArr[k];
                   let letterNext = stArr[k+1];

                    if(k == stArr.length-1) {
                        letterNext = 'none';
                    } else {
                        letterNext = stArr[k+1];
                    }
                   
                    if (letter == '\n'){
        
                        $('#song-pattern').append('<br>');
        
                    } else if (letter.length > 1 && letter[0] != '[') {
        
                        var letArr = letter.split('');
                        
                        for (let lettr of letArr){
                            if (lettr != "\n") {
                            $('#song-pattern').append('<span>'+lettr+'</span>');
                            }
                        }
                    } else if (letterNext.length == 0 && letter.length == 1 && letter != '|') {
                        $('#song-pattern').append('<span>' + letter+'</span>');
                        $('#song-pattern').append('<span class="pause">.</span>');
                    } else if (letter.length == 0){                        
                    
                    } else if (letter.length > 1 && letter[letter.length-1] == ']'){    
                        
                   
                    $('#song-pattern').append(letter[0]);
                    $('#song-pattern').append('<span class="chord">'+letter.slice(1, letter.length-1)+'</span>');
                    
                    $('#song-pattern').append(letter[letter.length-1]);
                    $('#song-pattern').append('<span class="pause">.</span>');
        
                    } else if (letter == '|'){
                        $('#song-pattern').append('<span class="skip">'+letter+'</span>');
                        $('#song-pattern').append('<span class="pause">.</span>');
                    } else {  
        
                        $('#song-pattern').append('<span>'+letter+'</span>');
                        
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