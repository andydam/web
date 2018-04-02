const http = require('http');
const process = require('process');
const fs = require('fs');
const path = require('path');
const url = require('url');

const defaultFileExtensions = ['html', 'htm'];

const checkPath = (filePath) =>
  new Promise((resolve) =>
    fs.stat(filePath, (err, stats) => {
      if (err) return resolve(0);
      if (stats.isFile()) resolve(1);
      if (stats.isDirectory()) resolve(2);
    }),
  );

const readFile = (requestPath, response) => {
  const file = fs.createReadStream(requestPath);

  file.on('error', () => {
    response.writeHead(500, 'Internal Server Error');
    response.end();
  });

  file.pipe(response);
};

const staticServer = (inputPath, fileExtensions = defaultFileExtensions) => {
  const folderPath = path.join(process.cwd(), inputPath);

  const responseHandler = async function responseHandler(request, response) {
    if (request instanceof http.IncomingMessage) {
      if (request.method === 'GET') {
        const requestUrl = url.parse(request.url);

        if (/([\.\.]){2}/g.test(requestUrl.pathname)) {
          response.writeHead(403, 'Forbidden');
          response.end();
        } else {
          const requestPath = path.join(folderPath, requestUrl.pathname);
          const fileStatus = await checkPath(requestPath);

          switch (fileStatus) {
            case 0:
              response.writeHead(404, 'Not Found');
              response.end();
              break;
            case 1:
              readFile(requestPath, response);
              break;
            case 2:
              const indexPaths = fileExtensions.map((ext) =>
                path.join(requestPath, `index.${ext}`),
              );
              let found = false;

              for (let i = 0; i < indexPaths.length; i += 1) {
                if ((await checkPath(indexPaths[i])) === 1) {
                  found = true;
                  readFile(indexPaths[i], response);
                  break;
                }
              }

              if (!found && !response.finished) {
                response.writeHead(404, 'Not Found');
                response.end();
              }
              break;
            default:
              response.writeHead(500, 'Internal Server Error');
              response.end();
          }
        }
      } else {
        response.writeHead(403, 'Forbidden');
        response.end();
      }
    } else {
      throw new SyntaxError(
        'static is only supposed to be used as a http request listeners!',
      );
    }
  };

  responseHandler.isStatic = true;

  return responseHandler;
};

module.exports = staticServer;
