const notyf = new Notyf({position: {x: 'right', y: 'top',}});

function auth() {
    fetch('https://core.oblivionocean.top/user/auth', {credentials: "include"}).then(function (response) {
        response.json().then(function (json) {
            if (json.status === true) {
                myconsole.success('成功获取用户数据');
                document.getElementsByClassName('head')[0].style.display = 'block';
                if (json.data.avatar) {
                    document.getElementsByClassName('head')[0].src = json.data.avatar;
                }
            } else {
                myconsole.error('获取用户数据失败，但是请求成功');
            }
        }).catch(function (err) {
            myconsole.error('请求成功，但用户数据解析失败');
        })
    }).catch(function (err) {
        myconsole.error('用户数据获取失败');
    })
}

function login() {
    fetch('https://core.oblivionocean.top/user/login', {
        method: 'POST',
        body: JSON.stringify({
            id: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        mode:'cors',
        credentials: "include"
    }).then(function (response) {
        response.json().then(function (json) {
            if (json.status === true) {
                myconsole.success('成功登录');
                alert(json.msg);
                location.reload();
            } else {
                myconsole.error('登录失败，但是请求成功');
                alert(json.msg);
            }
        }).catch(function (){
            myconsole.error('数据解析失败，但是请求成功');
        });
    }).catch(function (){
        myconsole.error('登录失败，请求失败');
    });
}


function logout() {
    document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.oblivionocean.top";
    myconsole.success('已经清理Cookie')
    location.reload();
}

