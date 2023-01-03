$("#date_search").click(function(){
    $("#search_submit").trigger("click");
});
$("#key_search").click(function(){
    $("#search_submit").trigger("click")
});

// function clickTitle(){
//     this.prop('value', 'true');
//     $("div[value=true]").css('background-color', 'background-color: rgb(246, 142, 142);')
// }

$(document).ready(function () {
    $('#borrowingTitle').click(function(){
        $('#borrowingTitle').val('true');
        $('#borrowedTitle').val('false');
    })

    $('#borrowedTitle').click(function(){
        $('#borrowingTitle').val('false');
        $('#borrowedTitle').val('true');
    })
});
