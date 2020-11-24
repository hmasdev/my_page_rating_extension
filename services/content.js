
// for each search result
$('.rc').each(function(i,e){ 
    let url = $(e).find('a').attr('href'); // expect that it is unique
    
    chrome.storage.local.get([url], function(items){
        if (url in items){
            // extract score and comment
            let score = items[url].score;
            let comment = items[url].comment;
            // make table
            $('<table></table>', {id:`your-evaluation${ i }`, class:'table table-condensed'}).appendTo($(e));
            $('<tr></tr>', {id:`your-evaluation-score-row${i}`}).appendTo(`#your-evaluation${i}`);
            $('<td></td>', {text:'Your Score: '}).appendTo(`#your-evaluation-score-row${i}`);
            $('<td></td>').raty({
                half: false,
                number: 5,
                score: score,
                readOnly: true,
                starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
                starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
            }).appendTo(`#your-evaluation-score-row${i}`);
            $('<tr></tr>', {id:`your-evaluation-comment-row${i}`}).appendTo(`#your-evaluation${i}`);
            $('<td></td>', {text:'Your Comment: '}).appendTo(`#your-evaluation-comment-row${i}`);
            $('<td></td>', {text:comment}).appendTo(`#your-evaluation-comment-row${i}`);
        }
        else{
            // score or comment not found
            // make table
            $('<table></table>', {id:`your-evaluation${ i }`, class:'table table-condensed'}).appendTo($(e));
            $('<tr></tr>', {id:`your-evaluation-score-row${i}`}).appendTo(`#your-evaluation${i}`);
            $('<td></td>', {text:'Your Score: '}).appendTo(`#your-evaluation-score-row${i}`);
            $('<td></td>', {text:'You have not evaluated.'}).appendTo(`#your-evaluation-score-row${i}`);
            $('<tr></tr>', {id:`your-evaluation-comment-row${i}`}).appendTo(`#your-evaluation${i}`);
            $('<td></td>', {text:'Your Comment: '}).appendTo(`#your-evaluation-comment-row${i}`);
            $('<td></td>', {text:'-'}).appendTo(`#your-evaluation-comment-row${i}`);
        }
    });

    return true;
});