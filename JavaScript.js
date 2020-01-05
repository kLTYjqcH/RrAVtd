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
        case '/aesencrypt':
                var content = "aes:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.bake(query.msg,[{"op":"AES Encrypt","args":[{"option":"UTF8","string":"czamdkxqxzcjzeeg"},{"option":"UTF8","string":"czamdkxqxzcjzeeg"},"CBC","Raw","Hex"]}]);
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
        case '/aesdecrypt':
            var content = "aes:"
            var query = url_parts.query;
            if(query.msg != undefined){
                var query_obj =
                content = chef.bake(query.msg,[{"op":"AES Decrypt","args":[{"option":"UTF8","string":"vad5jvt52k59rspx"},{"option":"UTF8","string":"v96cjgvvmgawhft6"},"CBC","Hex","Raw",{"option":"Hex","string":""}]}]);
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
        case '/aesbase':
            var content = "aes:"
            var query = url_parts.query;
            if(query.msg != undefined){
                var query_obj =
                content = chef.bake(query.msg,[{"op":"AES Encrypt","args":[{"option":"UTF8","string":query.key},{"option":"UTF8","string":query.iv},"CBC","Raw","Raw"]},{"op":"To Base64","args":["A-Za-z0-9+/="]}]);
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

        case '/baseaes':
            var content = "aes:"
            var query = url_parts.query;
            if(query.msg != undefined){
                var query_obj =
                content = chef.bake(query.msg,[{"op":"From Base64","args":["A-Za-z0-9+/=",true]},{"op":"AES Decrypt","args":[{"option":"UTF8","string":query.key},{"option":"UTF8","string":query.iv},"CBC","Raw","Raw",{"option":"Hex","string":""}]}]);
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

            case '/urlencode':
                var content = "aes:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.bake(query.msg,[{"op":"URL Encode","args":[true]}]);
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

                case '/urldecode':
                    var content = "aes:"
                    var query = url_parts.query;
                    if(query.msg != undefined){
                        var query_obj =
                        content = chef.bake(query.msg,[{"op":"URL Decode","args":[]}]);
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

