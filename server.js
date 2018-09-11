var http = require('http');
var fs = require('fs');
var path = require('path');
var readline = require('readline');

//This is the port number, if there are issues with the current port, change it.
var portno = 3000;

//this gets run when the page is visited
http.createServer(function (request, response) {
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'text/json'
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = mimeTypes[extname] || 'application/octet-stream';
    console.log(filePath)

    //reading requested files
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
                //console.log("eno")
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
                //console.log("error code")
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
            console.log("wrote" + contentType)
        }
    })

}).listen(portno);
console.log('Server running at http://127.0.0.1:' + portno); 