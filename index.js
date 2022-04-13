#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

const port = 8080;
const paths = ['about', 'contact-me', 'index'];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // remove the leading '/' from the requested url to work with it more easily
  let path = req.url.slice(1);

  if (path === '') {
    path = 'index';
  }
  if (paths.some((p) => p === path)) {
    fs.readFile(`${path}.html`, (err, data) => {
      if (err) throw err;
      res.write(data);
      return res.end();
    })
  } else {
    fs.readFile('404.html', (err, data) => {
      if (err) throw err;
      res.write(data);
      return res.end();
    })
  }
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});