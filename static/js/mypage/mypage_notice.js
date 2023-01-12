const checkboxes = document.getElementsById('noticeLabel');

function allYes(){
    $("input[name=cbox]").prop("checked", true);
}

function allNo(){
    $("input[name=cbox]").prop("checked", false);
}

