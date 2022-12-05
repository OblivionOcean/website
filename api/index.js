const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
    res.cookie = function (id, value, json = {path: '/', maxAge: null, expires: null, domain: null}) {
        if (json.maxAge) {
            json.maxAge = '; max-age=' + json.maxAge;
        } else {
            json.maxAge = '';
        }
        if (json.expires) {
            json.expires = '; expires=' + json.expires;
        } else {
            json.expires = '';
        }
        if (json.domain) {
            json.domain = '; domain=' + json.domain;
        } else {
            json.domain = '';
        }
        if (!json.path) {
            json.path = '/';
        }
        this.setHeader('set-cookie', id + '=' + value + '; path=' + json.path + json.maxAge + json.expires + json.domain);
    }
    res.clearCookie = function (id, path = '/') {
        this.setHeader('set-cookie', id + '=; maxAge=0; path=' + path);
    }
    req.url = url.parse(req.url)
    res.getQueryVariable = function (variable, err) {
        if (req.url.query) {
            var vars = req.url.query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        }
        return (err);
    }

    function cookie2json() {
        req.cookie = {}
        if (req.headers.cookie && req.headers.cookie.indexOf('=') != -1) {
            if (req.headers.cookie.indexOf('; ') != -1) {
                var x = req.headers.cookie.split("; ");
            } else {
                var x = [req.headers.cookie];
            }
            for (let i = 0; i < x.length; i++) {
                req.cookie[x[i].split('=')[0]] = x[i].split('=')[1];
            }
        }
    }

    cookie2json()
    if (req.url.pathname[-1]!='/') {
        req.url.pathname+= '/';
    }
    if (req.url.pathname.indexOf('/') >= 0) {
        path = req.url.pathname.split('/')
        if (path.length < 4) {
            res.writeHead(307, {
                'Location': '/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
            })
            res.end()
        } else if (path.length >= 4) {
            if (path[2] == 'blog') {
                let reg = new RegExp(/(^-?[0-9][0-9]*(.[0-9]+)?)$/)
                if (reg.test(path[3])) {
                    res.writeHead(307, {
                        'Location': '/blog/post.html?pid=' + path[3],
                        'Content-Type': 'multipart/form-data',
                        'X-Atlassian-Token': 'no-check'
                    })
                    res.end()
                    return 0
                }
                res.writeHead(307, {
                    'Location': '/blog/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
                })
                res.end()
            } else if (path[2] == 'user') {
                let reg = new RegExp(/(^-?[0-9][0-9]*(.[0-9]+)?)$/)
                if (reg.test(path[3])) {
                    res.writeHead(307, {
                        'Location': '/user/user.html?uid=' + path[3],
                        'Content-Type': 'multipart/form-data',
                        'X-Atlassian-Token': 'no-check'
                    })
                    res.end()
                    return 0
                }
                res.writeHead(307, {
                    'Location': '/user/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
                })
                res.end()
            } else if (path[2] == 'project') {
                let reg = new RegExp(/(^-?[0-9][0-9]*(.[0-9]+)?)$/)
                if (reg.test(path[3])) {
                    res.writeHead(307, {
                        'Location': '/project/project.html?pid=' + path[3],
                        'Content-Type': 'multipart/form-data',
                        'X-Atlassian-Token': 'no-check'
                    })
                    res.end()
                    return 0
                }
                res.writeHead(307, {
                    'Location': '/project/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
                })
                res.end()
            } else {
                res.writeHead(307, {
                    'Location': '/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
                })
                res.end()
            }
        }
    } else {
        res.writeHead(307, {
            'Location': '/', 'Content-Type': 'multipart/form-data', 'X-Atlassian-Token': 'no-check'
        })
        res.end()
    }


}).listen(80);
