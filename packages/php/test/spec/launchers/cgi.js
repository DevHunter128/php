
const cgi = require('./../../../dist/launchers/cgi');

test('create CGI request', () => {
  const request = {
    filename: "index.php",
    path: "/index.php",
    host: "https://zeit.co",
    method: "GET",
    headers: {}
  };
  const { env } = cgi.createCGIReq(request);

  expect(env).toHaveProperty("SERVER_ROOT", "/user");
  expect(env).toHaveProperty("DOCUMENT_ROOT", "/user");
  expect(env).toHaveProperty("SERVER_NAME", request.host);
  expect(env).toHaveProperty("SERVER_PORT", 443);
  expect(env).toHaveProperty("HTTPS", 'On');
  expect(env).toHaveProperty("REDIRECT_STATUS", 200);
  expect(env).toHaveProperty("SCRIPT_NAME", request.filename);
  expect(env).toHaveProperty("REQUEST_URI", request.path);
  expect(env).toHaveProperty("SCRIPT_FILENAME", request.filename);
  expect(env).toHaveProperty("PATH_TRANSLATED", request.filename);
  expect(env).toHaveProperty("REQUEST_METHOD", request.method);
  expect(env).toHaveProperty("QUERY_STRING", '');
  expect(env).toHaveProperty("GATEWAY_INTERFACE", 'CGI/1.1');
  expect(env).toHaveProperty("SERVER_PROTOCOL", 'HTTP/1.1');
  expect(env).toHaveProperty("SERVER_SOFTWARE", 'ZEIT Now PHP');
  expect(env).toHaveProperty("PATH", process.env.PATH);
  expect(env).toHaveProperty("LD_LIBRARY_PATH", process.env.LD_LIBRARY_PATH);
});
