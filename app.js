document.addEventListener("DOMC ontentLoaded", function () {
    var A = document.querySelectorAll("img");
    for (i in A) A[i].setAttribute && A[i].src != "" && (A[i].setAttribute("lazyload", A[i].src), A[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC");
    lazyload()
    document.addEventListener("scroll", lazyload)
})
document.addEventListener("DOMContentLoaded", function () {
    var A = document.querySelectorAll("img[bsrc]")
    for (let i = 0; i < A.length; i++) {
        fetch(A[i].getAttribute("bsrc")).then(function (r) {
            A[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC"
            r.blob().then(function (b) {
                A[i].src = URL.createObjectURL(b)
            }).catch(function () {
                A[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC"
            })
        }).catch(function () {
            A[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC"
        });
    }
})
// 滚动
document.addEventListener('scroll', function (event) {
    if (document.documentElement.clientWidth <= 640) {
        return
    }
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (document.querySelector(".show>.second>.content").getBoundingClientRect().top < 0) {
        document.querySelector(".show>.animation").style.display = "none"; return
    }
    if (document.querySelector(".show>.second>.content").getBoundingClientRect().top > 70) {
        if (document.querySelector(".show>.first>.content").getBoundingClientRect().top > 70) {
            document.querySelector(".show>.animation").style.display = "none"
            document.querySelector(".show>.animation").removeAttribute("show")
            if (document.querySelector(".show>.first>.content").getBoundingClientRect().top < document.documentElement.clientHeight) {
                document.querySelector(".show>.first>.content>.screenshot").style.transition = "transform 2s"
                document.querySelector(".show>.first>.content>.screenshot").style.transform = "translate(0px,0px)"
            } else {
                document.querySelector(".show>.first>.content>.screenshot").style.transition = "transform 0s"
                document.querySelector(".show>.first>.content>.screenshot").style.transform = "translate(0px,300px)"
            }
        } else {
            document.querySelector(".show>.animation").style.display = "block"
            if (document.querySelector(".show>.animation").getAttribute("show") != "1") {
                document.querySelector(".show>.animation").setAttribute("show", "1")
                document.querySelector(".show>.animation").innerHTML = document.querySelector(".show>.first").innerHTML
            }
            document.querySelector(".show>.animation").style.background = "#F8FAFF"
        }
    } else {
        document.querySelector(".show>.animation").style.display = "block"
        if (document.querySelector(".show>.animation").getAttribute("show") != "2") {
            document.querySelector(".show>.animation").setAttribute("show", "2")
            document.querySelector(".show>.animation").innerHTML = document.querySelector(".show>.second").innerHTML
        }
        document.querySelector(".show>.animation").style.background = "#fff"
    }
})
function lazyload() {
    var viewHeight = document.documentElement.clientHeight;
    var eles = document.querySelectorAll('img[lazyload]');
    Array.prototype.forEach.call(eles, function (item, index) {
        var rect;
        if (item.getAttribute('lazyload') === "") return;
        rect = item.getBoundingClientRect();// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
        if (rect.bottom >= 0 && rect.top < viewHeight) {
            !function () {
                var img = new Image();
                img.src = item.getAttribute('lazyload');
                img.onload = function () {
                    item.src = img.src;
                }
                img.onerror = function () {
                    item.setAttribute("lazyload", img.src);
                }
                item.removeAttribute("lazyload");
            }()
        }
    })
}