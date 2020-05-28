$(document).ready(function(){

    $("#search-input").on('input', function(e){
        console.log($('.song-item'));
        var searchString = $("#search-input").val();
        $('#search-result').empty();
        if (searchString.length >= 3){
            console.log(searchString);
            $.getJSON("https://devv.virtualpiano.net/wp-json/wp/v2/posts?search="+searchString, function(data){
                var songs = data;
                if (songs.length > 0){
                    $('#search-result').empty();
                

                for (song of songs){
                    console.log(song.categories[0]);
        
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
        console.log(data);
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
    
    function renderSong(songId){

        
        $.getJSON('https://devv.virtualpiano.net/wp-json/wp/v2/posts/'+songId, function(response){        
       // var songText = response.content.rendered.replace(/ /g, '').replace(/<br>/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "").split("").slice(1);
       var songText = response.content.rendered.split('<p class')[0].replace(/ /g, '').replace(/<br>/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "").split("").slice(1);
       
       console.log(response.content.rendered.split('<p class')[0])     
        $('#song-info').empty();
        $('#song-pattern').empty();
        

        for (let letter of songText){
           
            if (letter == '\n'){
                $('#song-pattern').append('<br>');
            } else if (letter == '[' || letter == ']' || letter == '|') {
                $('#song-pattern').append('<span class="skip">'+letter+'</span>');
            } else {
                $('#song-pattern').append('<span>'+letter+'</span>');
            }
        }
        
        
     
        $('.song_wrapper').show();
        

      $('#song-info').html(response.title.rendered);

      pianoPlay();

    });
}

//var pageReferrer = document.referrer;
var pageReferrer = document.referrer;
if (pageReferrer.length > 0) {    

    console.log(window.location.href.split('post-')[1]);
    var songIdRef = window.location.href.split('post-')[1];
    renderSong(songIdRef);
    $('.piano-menu__song').addClass('active');
    
}

})