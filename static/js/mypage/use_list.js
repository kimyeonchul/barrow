$("#date_search").click(function(){
    $("#search_submit").trigger("click");
});
$("#key_search").click(function(){
    $("#search_submit").trigger("click")
});

$('.borrowTitle').click(function(){
    if(this.id == 'titleTrue'){
        this.data('id', 'titleFalse');
    }else{
        this.data('id', 'titleTrue');
    }
})

// function changeUrl(){
//     var clicked = localStorage.getItem('clickTitle');
//     if(clicked == 'borrowedTitle'){
//         location.href=borrowedurl;
//         $('.borrowedTitle').css('background-color', 'green');
//     }else{
//         location.href=borrowingurl;
//         $('.borrowingTitle').css('background-color', 'green');
//     }
// }
//
// $(document).ready(function() {
//     $(document).on("click", "#borrowBox > div", function (event) {
//         localStorage.setItem('clickTitle', $(this).attr('class'));
//         changeUrl();
//     });
// });


// $(document).ready(function () {
//         $('#titleClickTrue').css('background-color', '#3D8361');
//         $('#titleClickFalse').css('background-color', 'white');
// });
