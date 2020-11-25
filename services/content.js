
// for each search result
$('.rc').each(function(i,e){ 
    let url = $(e).find('a').attr('href'); // expect that it is unique
    
    chrome.storage.local.get([url], function(items){
        if (url in items){
            // extract score and comment
            let score = items[url].score;
            let comment = items[url].comment;
            // make table
            $('<table></table>', {id:`your-rating${ i }`, class:'table table-condensed'}).appendTo($(e));
            $('<tr></tr>', {id:`your-score-row${i}`}).appendTo(`#your-rating${i}`);
            $('<td></td>', {text:'Your Score: '}).appendTo(`#your-score-row${i}`);
            $('<td></td>').raty({
                half: false,
                number: 5,
                score: score,
                readOnly: true,
                starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
                starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
            }).appendTo(`#your-score-row${i}`);
            $('<tr></tr>', {id:`your-comment-row${i}`}).appendTo(`#your-rating${i}`);
            $('<td></td>', {text:'Your Comment: '}).appendTo(`#your-comment-row${i}`);
            $('<td></td>', {text:comment}).appendTo(`#your-comment-row${i}`);
        }
        else{
            // score or comment not found
            // make table
            $('<table></table>', {id:`your-rating${ i }`, class:'table table-condensed'}).appendTo($(e));
            $('<tr></tr>', {id:`your-score-row${i}`}).appendTo(`#your-rating${i}`);
            $('<td></td>', {text:'Your Score: '}).appendTo(`#your-score-row${i}`);
            $('<td></td>', {text:'You have not evaluated.'}).appendTo(`#your-score-row${i}`);
            $('<tr></tr>', {id:`your-comment-row${i}`}).appendTo(`#your-rating${i}`);
            $('<td></td>', {text:'Your Comment: '}).appendTo(`#your-comment-row${i}`);
            $('<td></td>', {text:'-'}).appendTo(`#your-comment-row${i}`);
        }
    });

    return true;
});