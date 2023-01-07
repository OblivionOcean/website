const ss = require('simplest-server')
const fetch = require('node-fetch')
ss.http({
    ':/blog/pid/.*':function (req, res) {
        res.end()
    },
    ':/.*': function (req, res) {
        ss.maps(req, res, {
            path: __dirname + '/website/', prefix: '/'
        }, {
            snippet: __dirname + '/snippet/', fetch: fetch, npm_cdn: 'https://npm.elemecdn.com/', gh_cdn: 'https://cdn.oblivionocean.top/gh/'
        })
    }, '404': function (req, res) {
        ss.ejs(req, res, 404,__dirname + '/website/404.ejs',{
            snippet: __dirname + '/snippet/', fetch: fetch, npm_cdn: 'https://npm.elemecdn.com/', gh_cdn: 'https://cdn.oblivionocean.top/gh/'
        })
    }
}).listen(90)
