const notyf = new Notyf({position: {x: 'right', y: 'top',}});

function auth() {
    fetch('https://core.oblivionocean.top/user/auth', {credentials: "include"}).then(function (response) {
        response.json().then(function (json) {
            if (json.status === true) {
                document.getElementsByClassName('head')[0].style.display = 'block';
                if (json.data.avatar) {
                    document.getElementsByClassName('head')[0].src = json.data.avatar;
                }
            }
        })
    })
}

function login() {
    fetch('https://core.oblivionocean.top/user/login?id=' + document.getElementById('login-email').value + '&password=' + document.getElementById('login-password').value, {credentials: "include"}).then(function (response) {
        response.json().then(function (json) {
            if (json.status === true) {
                alert(json.msg);
                location.reload();
            } else {
                alert(json.msg);
            }
        });
    });
}


function logout() {
    document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.oblivionocean.top";
    location.reload();
}

