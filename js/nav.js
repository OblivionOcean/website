setInterval(console.log = function () {
}, 3000);

function print_err(err, dom) {
    dom.innerHTML = `
<style>
    .error {
        width: 100%;
        border-style: dashed;
        border-color: red;
        border-radius: 5px;
        color: red;
    }
    .error>h3, .error>p{
        margin-left: 5px;
        margin-top: 5px;
    }
</style>
<div class="error">
    <h3>报错了!!</h3>
    <p>` + err + `</p>
</div>`
}

var page = {
    ok: function () {
        let data = new Date();
        if (data.getFullYear() == 2022) {
            Copyrigh_time = data.getFullYear();
        } else {
            Copyrigh_time = '2022-' + data.getFullYear();
        }
        document.getElementsByTagName('body')[0].style.display = 'block';
        document.getElementsByTagName('body')[0].innerHTML = `<cover style="display: none;">
    <login>
        <svg class="btn--close" onclick="document.getElementsByTagName('cover')[0].style.display='none';"
             t="1662250512559" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3129"
             width="200" height="200" style="">
            <path d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z"
                  p-id="3130"></path>
        </svg>
        <h2 style="
    margin: 30px;
    margin-bottom: 10px;
">登录</h2>
        <p style="
    margin-left: 30px;
">没有账户？<a href="/logon">点击注册</a></p><input class="form-control" type="email" id="login-email" placeholder="用户ID/邮箱">
        <input class="form-control" type="password" id="login-password" placeholder="密码">
        <button onclick="login();">登录</button>
    </login>
</cover>
<header class="header">
    <i class="fas fa-ellipsis-h" id="ellipsis" onclick="nav();"></i>
    <div class="nav" id="nav">
        <a class="botton" href="/">
            <i class="fa fa-home"> 主页</i>
        </a>
        <a class="botton" href="/blog/">
            <i class="fas fa-blog"> 博客</i>
        </a>
    </div>
    <div class="user">
        <a onclick="document.getElementsByTagName('cover')[0].style.display='block';" class="login-btn">登录</a>
        <img class="head" src="/img/logo.jpg" style="display: none;" onclick="user_nav();" />
    </div>
    <div class="user-nav" id="user-nav">
        <a class="botton" href="/my">
            <i class="fas fa-user"> 个人主页</i>
        </a>
        <a class="botton" href="javascript:logout()">
            <i class="fas fa-sign-out-alt"> 退出</i>
        </a>
    </div>
</header>` + document.getElementsByTagName('body')[0].innerHTML + `<footer>
    <div style="text-align: left;">
        <h4>加入我们</h4>
        <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=JYWF6elu">QQ群申请</a>
        <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=JYWF6elu">填写表单</a>
    </div>
    <div class="share-box">
        <a href="mailto:talkto@oblivionocean.top">
            <img src="/img/mail.svg">
        </a>
    </div>
</footer><div style="background-color: #00335e;width: 100%;padding: 0.5em;">
    <p style="text-align: center;color: white;margin: auto;">Copyright ©
           ${Copyrigh_time}
        玄云海 版权所有
    </p>
</div>`;
        auth();
    }
}

function nav() {
    if (document.getElementById('nav').style) {
        if (document.getElementById('nav').style.display == 'inline-block') {
            document.getElementById('nav').style.display = 'none';
        } else {
            document.getElementById('nav').style.display = 'inline-block';
            document.getElementById('user-nav').style.display = 'none';
        }
    }
}

window.onresize = function () {
    if (document.getElementById('nav').style.display && document.getElementById('nav').style.top == '70px') {
        document.getElementById('nav').style.display = 'inline-block';
    }
};

function user_nav() {
    if (document.getElementById('user-nav').style) {
        if (document.getElementById('user-nav').style.display == 'inline-block') {
            document.getElementById('user-nav').style.display = 'none';
        } else {
            document.getElementById('user-nav').style.display = 'inline-block';
            if (document.getElementById('nav').style.top == '70px') {
                document.getElementById('nav').style.display = 'none';
            }
        }
    }
}