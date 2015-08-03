/**
 * Created by Justin on 7/8/2015.
 */
/* global $: false, console: false */
$(document).ready(function() {
    'use strict';
    function makeLinkFromHeadline(str) {

        //delete non word and non space characters
        str = str.replace(/([^\w\s])/g, '');

        //get the individual words
        var words = str.match(/(\w+)/g);

        //fill the out string with those words separated by dashes
        var out = '';
        for (var i = 0, l = words.length - 1; i < l; i++) {
            out += words[i] + '-';
        }
        out += words[words.length - 1];//no dash for the last one

        return 'http://www.freecodecamp.com/news/' + out.toLowerCase();
    }
    function makeTileDiv(data){

        var image = data.image;
        var headline = data.headline;
        if (!image) {//grab a default image link if none
            image = 'resources/placeholder.png';
        }
        //div.append('<img class="story-thumbnail" src="'+image+'">');
        //div.append('<div class="dark-overlay"></div>');
        var div = $('<div class="story"></div>');
        var articleLink = $('<a href="'+ data.link +'"></a>');
        var storyInner  = $('<div class="story-inner"></div>');
        var storyThumbnail = $('<img class="story-thumbnail" src="'+ image +'">');
        var commentsLink = $('<a href="'+ makeLinkFromHeadline(headline)+ '"></a>');
        var commentsIcon = $('<div class="comment-box"><span class="fontawesome-comments"></span></div>');
        var textOverlay  = $('<h3 class="text-overlay">'+ headline+ '</h3>');

        div.append(articleLink);
        articleLink.append(storyInner);
        storyInner.append(storyThumbnail);
        storyInner.append(textOverlay);
        storyInner.append(commentsLink);
        commentsLink.append(commentsIcon);
        /*
        div.append('<a href="'+
            data.link+
            '"><div class="story-inner"><img class="story-thumbnail" src="'+image+'"><a href="'+
            makeLinkFromHeadline(headline)+
            '"><i class="comments"></i></i></a></a><h3 class="text-overlay">'+
            headline+
            '</h3></div></a>');
            */
        //div.append('<h3 class="text-overlay">'+'text!'+'</h3>');
        return div;
    }
    $.ajax({url: 'http://www.freecodecamp.com/stories/hotStories',
        type: 'GET'
    })
        .success(function(data){
            for (var i = 0; i < data.length; i=i+1) {

                console.log(data[i]);
                $('#stories').append(makeTileDiv(data[i]));

            }
        });


});