if (!$) {
    var $ = undefined;
}
var o3 = (() => {
    class OblivionOcean {
        version = "1.0.0";
        config = {
            appInfo: {
                appName: "OblivionOcean Website",
                appVersion: "1.0.0",
                appDescription: "OblivionOcean Website",
                appAuthor: "OblivionOcean",
            },
            debug: false,
            alertRewrite: false,
            jqSelector: true,
            whitePageCheck: {
                enbabled: true,
                skeletonProject: true, // 项目是否有骨架屏
                whiteBoxElements: ['html', 'body', '#app', '#root', '.app', '.root', 'main'], // 白屏检测的容器列表
                WaitTime: 5000, // 白屏检测等待时间
                checkInterval: 1000, // 白屏检测间隔时间
                prompt: true
            }
        }
        constructor() {
            if (this.config.jqSelector) {
                $ = (selector) => {
                    let elem = document.querySelector(selector);
                    if (elem) {
                        elem.$ = $;
                        return elem;
                    }
                    return undefined;
                };
            }
            document.addEventListener("DOMContentLoaded", () => {
                if (this.config.alertRewrite) {
                    window.alert = (...t) => {
                        console.log("[ALERT] ", ...t);
                    };
                }
            })
            window.addEventListener("load", () => {
                let timing = window.performance.timing
                let logStyle = ["font-weight:bold", "color: unset"];
                if (this.config.debug) {
                    logStyle.push("color: #ff0000;font-weight: bold");
                    logStyle.push("font-weight: none;color: unset");
                }
                for (let i = 0; i < 4; i++) {
                    logStyle.push("font-weight:bold");
                    logStyle.push("color: unset");
                }
                logStyle.push("font-weight:bold");
                console.log(`%c  ___  _     _ _       _              ___                       \n / _ \\| |__ | (_)_   _(_) ___  _ __  / _ \\  ___ ___  __ _ _ __  \n| | | | '_ \\| | \\ \\ / / |/ _ \\| '_ \\| | | |/ __/ _ \\/ _' | '_ \\ \n| |_| | |_) | | |\\ V /| | (_) | | | | |_| | (_|  __/ (_| | | | |\n \\___/|_.__/|_|_| \\_/ |_|\\___/|_| |_|\\___/ \\___\\___|\\__,_|_| |_|%c\n\nOblivionOcean Core JS ${this.version} ${this.config.debug ? "%cDEBUG MODE%c" : ""}\n————————————————————————————————————————\n%cAPP Name:%c${this.config.appInfo.appName}\n%cVersion:%c${this.config.appInfo.appVersion}\n%cDescription:%c${this.config.appInfo.appDescription}\n%cAuthor:%c${this.config.appInfo.appAuthor}\n%cPage loading took ${(new Date().getTime()) - timing.navigationStart}ms`, ...logStyle)

            })
        }

        debugger() {
            o3.config.debug = true;
            debugger
        }
    }
    return new OblivionOcean();
})()