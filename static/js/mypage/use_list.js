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


// $(document).ready(function () {
//         $('#titleClickTrue').css('background-color', '#3D8361');
//         $('#titleClickFalse').css('background-color', 'white');
// });
