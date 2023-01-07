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

window.onload=function () {
    document.getElementsByTagName('body')[0].style.visibility = 'visible';
    document.getElementsByTagName('loading')[0].remove();
    auth();
}
var page = {
    ok: function () {
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
