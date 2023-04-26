$('#login-btn').on('click', () => {
    let req = {
        username: $('#typeEmailX-2').val(),
        password: $('#typePasswordX-2').val()
    };

    $.post('/login', req, (res) => {
        if (res === 'yes') {
            window.location.replace('/admin');
        }
        else {
            $('#login-res').html('<p class="text-center fs-3" style="color: red;">Wrong username and/or password.</p>');
        }
    });
});