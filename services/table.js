
window.onload = function(){

    chrome.storage.local.get(null, function(items){
        Object.keys(items).forEach(function(key, idx){
            // extract value
            let val = items[key]; // this is array

            // make table
            //// make row
            $("<tr></tr>", {id:`row${ idx }`}).appendTo("#records");
            
            //// operation cell
            $("<td></td>", {id:`operation${ idx }`}).appendTo(`#row${ idx }`);
            $("<button>", {
                type: "button",
                text: "EDIT",
                class: "btn btn-outline-primary",
                id: `editbutton${ idx }`,
                "data-toggle":"modal",
                "data-target":"#edit-modal",
            }).appendTo(`#operation${ idx }`);
            $("<button>", {
                type: "button",
                text: "DELETE",
                class: "btn btn-outline-danger",
                id: `deletebutton${ idx }`
            }).appendTo(`#operation${ idx }`);
            
            //// title, score, comment
            $("<td></td>", {text:val.title, id:`title${ idx }`}).appendTo(`#row${ idx }`);
            $("<td></td>", {id:`score${ idx }`}).raty({
                half: false,
                number: 5,
                score: val.score, 
                readOnly: true,
                starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
                starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
            }).appendTo(`#row${ idx }`);
            $("<td></td>", {text:val.comment, id:`comment${ idx }`}).appendTo(`#row${ idx }`);
            
            //// URL (= key )
            $("<td></td>", {text: key, id:`url${ idx }`}).appendTo(`#row${ idx }`);
            
            // button click listener
            //// delete
            $(`#deletebutton${ idx }`).on("click", function(){
                let idx = $(this).attr('id').replace(/[^0-9]/g, '');
                chrome.storage.local.remove($(`#url${ idx }`).text());
                $(`#row${ idx }`).remove();
            });
            //// edit
            $(`#editbutton${ idx }`).on('click', function(){
                // extract idx
                let idx = $(this).attr('id').replace(/[^0-9]/g, '');
                
                // extract current information
                let url = $(`#url${ idx }`).text();
                let title = $(`#title${ idx }`).text();
                let prevStar = $(`#score${ idx }`).data('raty').score();
                let prevComment = $(`#comment${ idx }`).text();
                
                // form
                $("#modal-url-in-header").text(url);
                $("#stars-form").raty({
                    half: false,
                    number: 5,
                    score: prevStar, 
                    readOnly: false,
                    starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
                    starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
                });
                $("#comment-form").val(prevComment);

                // update button action
                let end = function(){
                    $("#stars-form").empty();
                    $("#modal-url-in-header").empty();
                }
                $("#submit-button").off('click');
                $("#cancel-button").off('click');
                $("#submit-button").on('click', function(){
                    // extract values
                    let score = $(`#stars-form`).data('raty').score()
                    let comment = $(`#comment-form`).val()

                    // update data storage
                    chrome.storage.local.set({
                        [url]: {
                            title: title,
                            score: score, 
                            comment: comment,
                        }
                    });

                    // update page
                    $(`#url${ idx }`).text(url);
                    $(`#title${ idx }`).text(title);
                    $(`#score${ idx }`).empty();
                    $(`#score${ idx }`).raty({
                        half: false,
                        number: 5,
                        score: score, 
                        readOnly: true,
                        starOn: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-on.png?raw=true",
                        starOff: "https://github.com/wbotelhos/raty/blob/master/lib/images/star-off.png?raw=true"
                    });
                    $(`#comment${ idx }`).text(comment);

                    // end
                    end();
                });
                $("#cancel-button").on('click', function(){
                    end();
                });

            });
        });
    });
}