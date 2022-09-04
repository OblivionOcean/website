var limit={
    header: function (a=false) {
        if (a) {
            document.getElementsByTagName('header')[0].style.display = 'block';
        } else {
            document.getElementsByTagName('header')[0].style.display = 'none';
        }
    },
    dev: function () {
        this.header(true);
    },
    ok: function () {
        document.getElementsByTagName('body')[0].style.display = 'block';
    }
}

limit.header();

function nav() {
    if (document.getElementById('nav').style.display == 'inline-block') {
        document.getElementById('nav').style.display = 'none';
    } else {
        document.getElementById('nav').style.display = 'inline-block';
    }
}
window.onresize=function(){
    if (document.getElementById('nav').style.top == '70px') {
        document.getElementById('nav').style.display = 'inline-block';
    }
};


limit.ok();
limit.dev();