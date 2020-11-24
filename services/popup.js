
window.onload = function(){
    // add input by stars
    $("#stars").raty({
        half: false,
        number: 5,
        score: 0, 
        readOnly: false,
        starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
        starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
    });

    // submission
    $("#submit_button").on("click", function(){
        chrome.tabs.getSelected(null, function(tab){
            // get values
            //// Input
            var score = $("#stars").data("raty").score();
            var comment = $("#comment").val();
            console.log("score = ${ score }, comment= ${ comment }.");
            //// Current URL and title
            var url = tab.url;
            var title = tab.title;
            console.log("url = ${ url }, title= ${  title }.");

            // save
            chrome.storage.local.set(
                {
                    [url]: {
                        title: title,
                        score: score, 
                        comment: comment,
                    }
                }, 
                function(){
                    $("#submit_result").text('Succeeded in evaluation');
                    $("#submit_result").addClass('alert alert-success');
                }
            );
        });
    });

    // show button
    $("#show_button").on("click", function(){
        chrome.tabs.create({
            url: "services/table.html",
            active: true,
        }, function(){});
    });
}