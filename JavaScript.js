const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');


const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
const chef = require("cyberchef");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start. end:Ctl+C');


function getFromClient(request,respons){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){
        case '/':
                var content = "Indexpage:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content += query.msg;
                }
                var content = ejs.render(index_page, {
                    titleHead:"Index Head",
                    titleBody:"Index Body",
                    content:content,
                });
                respons.writeHead(200, {'Content-Type':'text/html'});
                respons.write(content);
                respons.end();
                break;
        case '/style.css':
                respons.writeHead(200, {'Content-Type':'text/css'});
                respons.write(style_css);
                respons.end();
                break;
        case '/frombase64':
                var content = "fromBase64:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.fromBase64(query.msg);
                }
                var content = ejs.render(index_page, {
                    titleHead:"Index Head",
                    titleBody:"Index Body",
                    content:content,
                });
                respons.writeHead(200, {'Content-Type':'text/html'});
                respons.write(content);
                respons.end();
                break;
        case '/tobase64':
                var content = "toBase64:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.toBase64(query.msg);
                }
                var content = ejs.render(index_page, {
                    titleHead:"Index Head",
                    titleBody:"Index Body",
                    content:content,
                });
                respons.writeHead(200, {'Content-Type':'text/html'});
                respons.write(content);
                respons.end();
                break;
        default:
                respons.writeHead(200, {'Content-Type':'text/plain'});
                respons.end('no page');
                break;


    }
        
        
    }

