<?php
/**
 * Template Name: VP DEV HTML5 OLD SAMPLES
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>
<html>




<head>
    

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
   
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./wp-content/themes/generatepress/js-dev/main.css">
 
 
  
    <title>Virtual Piano Demo</title>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes'  />



</head>

<body>
       <div id="particle-container"></div>
    <div id="content" style='visibility: hidden;'>
        
        <div class="container">
            <h1 class='noselect'> Piano Demo </h1>
            <h4>
            <button id='sustain-button' class='sustain-button'>Sustain</button>
            </h4>
            <br/>
      <div class='slider'>
            <div id="Keyboard"></div>
    </div>
    <svg>
        <defs>
            <linearGradient id="grad-white" x1="50%" y1="0%" x2="50%" y2="100%" >

                <stop offset="10%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                <stop offset="92%" style="stop-color:rgb(251,251,251);stop-opacity:1" />
                <stop offset="91%" style="stop-color:rgb(208,207,207);stop-opacity:1" />            
                <stop offset="97%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
            </linearGradient>
        
            <linearGradient id="grad-black" x1="50%" y1="0%" x2="50%" y2="100%" >
                <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
                <stop offset="10%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
                <stop offset="85%" style="stop-color:rgb(86,86,86);stop-opacity:1" />
                <stop offset="90%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
            </linearGradient>

            <linearGradient id='grad-white-hover' x1="50%" y1="0%" x2="50%" y2="100%" >
                
                <stop offset="10%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
                <stop offset="92%" style="stop-color:#e4e4e4;stop-opacity:1" />
                <stop offset="91%" style="stop-color:#d0cfcf;stop-opacity:1" />            
                <stop offset="97%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
            </linearGradient>


            <linearGradient id="grad-black-hover" x1="50%" y1="0%" x2="50%" y2="100%" >
                <stop offset="10%" style="stop-color:#313131;stop-opacity:1" />
                <stop offset="85%" style="stop-color:#3a3a3a;stop-opacity:1" />
                <stop offset="90%" style="stop-color:rgb(0,0,0);stop-opacity:1" />         
            </linearGradient>
        </defs>
     
      
    </svg>
</div>

      

    </div>
	<script type="text/javascript" src="/wp-content/themes/generatepress/js-dev/StartAudioContext.js"></script>
    <script type="text/javascript" src="/wp-content/themes/generatepress/js-dev/external-js/nprogress.js"></script> 
    <script type="text/javascript" src="/wp-content/themes/generatepress/js-dev/external-js/NexusUI.js"></script>
    <script type="text/javascript" src="/wp-content/themes/generatepress/js-dev/external-js/Tone.js" ></script>

    
    <script type="text/javascript" src="/wp-content/themes/generatepress/js-dev/mainv2.js" type="module"></script>




</body>

<!-- Responsive keyboard -->

<!-- End responsive keyboard -->




</html>
<?php

get_footer();