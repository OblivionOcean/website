document.addEventListener("DOMContentLoaded", function () {
    var A = document.querySelectorAll("img");
    for (i in A) A[i].setAttribute && A[i].src != "" && (A[i].setAttribute("lazyload", A[i].src), A[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC");
    lazyload()
    document.addEventListener("scroll", lazyload)
})
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded")
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

document.addEventListener("DOMContentLoaded", function () {
    var A = document.querySelectorAll("a.jumpload[ptype]")
    for (let i = 0; i < A.length; i++) {
        A[i].onclick = function (e) {
            var pageInfo = document.querySelector("meta[name=\"ptype\"]").getAttribute("content")
            var ptype = this.getAttribute("ptype")
            if (ptype == "post") {
                fetch(A[i].getAttribute("href")).then(function (r) {
                    r.text().then(function(b) {
                        let domparser = new DOMParser();
                        var doc = domparser.parseFromString(b, "text/html");
                        if (pageInfo == "home") {
                            let oldDoc = document.getElementsByClassName("slogan")[0]
                            oldDoc.classList.add("headimg")
                            oldDoc.classList.remove("slogan")
                            oldDoc.innerHTML = doc.getElementsByClassName("headimg")[0].innerHTML
                            let oldDoc2 = document.getElementsByClassName("show")[0]
                            oldDoc2.classList.add("post")
                            oldDoc2.classList.remove("show")
                            oldDoc2.innerHTML = doc.getElementsByClassName("post")[0].innerHTML
                        } else {
                            document.getElementsByClassName("headimg")[0].innerHTML = doc.getElementsByClassName("headimg")[0].innerHTML
                            document.getElementsByClassName("post")[0].innerHTML = doc.getElementsByClassName("post")[0].innerHTML
                        }
                        document.title = doc.title
                        document.querySelector("meta[name=\"ptype\"]").setAttribute("content", doc.querySelector("meta[name=\"ptype\"]").getAttribute("content"))
                    }).catch(function(e) {console.log(e);window.location.href == A[i].getAttribute("href")})
                }).catch(function(e) {console.log(e);window.location.href = A[i].getAttribute("href")})
            }
            if (ptype == "home") {
                fetch(A[i].getAttribute("href")).then(function (r) {
                    r.text().then(function(b) {
                        let domparser = new DOMParser();
                        var doc = domparser.parseFromString(b, "text/html");
                        if (pageInfo == "post") {
                            let oldDoc = document.getElementsByClassName("headimg")[0]
                            oldDoc.classList.add("slogan")
                            oldDoc.classList.remove("headimg")
                            oldDoc.innerHTML = doc.getElementsByClassName("slogan")[0].innerHTML
                            let oldDoc2 = document.getElementsByClassName("post")[0]
                            oldDoc2.classList.add("show")
                            oldDoc2.classList.remove("post")
                            oldDoc2.innerHTML = doc.getElementsByClassName("show")[0].innerHTML
                        } else {
                            document.getElementsByClassName("slogan")[0].innerHTML = doc.getElementsByClassName("slogan")[0].innerHTML
                            document.getElementsByClassName("show")[0].innerHTML = doc.getElementsByClassName("show")[0].innerHTML
                        }
                        document.title = doc.title
                        document.querySelector("meta[name=\"ptype\"]").setAttribute("content", doc.querySelector("meta[name=\"ptype\"]").getAttribute("content"))
                    }).catch(function(e) {console.log(e);window.location.href == A[i].getAttribute("href")})
                }).catch(function(e) {console.log(e);window.location.href = A[i].getAttribute("href")})
            }
            history.pushState({}, "", A[i].getAttribute("href"))
            let e2 = new CustomEvent("DOMContentLoaded",{});
            document.dispatchEvent(e2),
            window.dispatchEvent(e2)
            return false
        }
    }
})

function showAnimation() {
    if (window.screen.width <= 645) {
        document.querySelector(".show>.animation").style.display = "none";
        if (document.querySelector(".show>.first>.content").getBoundingClientRect().top < document.documentElement.clientHeight) {
            document.querySelector(".show>.first>.content>.screenshot").style.transition = "transform 2s"
            document.querySelector(".show>.first>.content>.screenshot").style.transform = "translate(0px,0px)"
        } else {
            document.querySelector(".show>.first>.content>.screenshot").style.transition = "transform 0s"
            document.querySelector(".show>.first>.content>.screenshot").style.transform = "translate(0px,300px)"
        }
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
}

// 滚动
document.addEventListener('scroll', showAnimation)
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

document.addEventListener("resize", showAnimation)