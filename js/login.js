const notyf = new Notyf({position: {x: 'right',y: 'top',}});
fetch('https://core.oblivionocean.top/user/auth',{credentials: "include"}).then(function (response) {
    response.json().then(function (json) {
        if (json.status === true) {
            document.getElementsByClassName('head')[0].style.display = 'block';
            if (json.avatar) {
                document.getElementsByClassName('head')[0].src = json.avatar;
            }
        }
    })
})

function login() {
    fetch('https://core.oblivionocean.top/user/login?id='+document.getElementById('login-email').value+'&password='+document.getElementById('login-password').value,{credentials: "include"}).then(function (response) {
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
