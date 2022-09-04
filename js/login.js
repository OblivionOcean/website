var notyf = new Notyf();
fetch('https://core.oblivionocean.top/user/auth').then(function (response) {
    response.json().then(function (json) {
        if (json.status === true) {
            document.getElementsByClassName('head').style.display = 'block';
            if (json.avatar) {
                document.getElementsByClassName('head').src = json.avatar;
            }
        }
    })
})

function login() {
    fetch('https://core.oblivionocean.top/user/login?id='+document.getElementById('login-email').value+'&password='+document.getElementById('login-password').value).then(function (response) {
        response.json().then(function (json) {
            if (json.status === true) {
                notyf.success(json.msg);
                location.reload();
            } else {
                notyf.error(json.msg);
            }
        });
    });
}