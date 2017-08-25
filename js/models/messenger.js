let messenger = (()=>{
    function showInfo(text) {
        let infoBox = $('#infoBox');
        infoBox.click(e => $(e.target).hide());
        infoBox.text(text).show();

        setTimeout(function () {
            infoBox.fadeOut();
        },3000);
    }

    function showError(text) {
        let errorBox = $('#errorBox');
        errorBox.click(e => $(e.target).hide());
        errorBox.text(text).show();

        setTimeout(function () {
            errorBox.fadeOut()
        },3000);

    }

    return {
        showInfo,
        showError
    }
    
})();