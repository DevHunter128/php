import { spawn, SpawnOptions } from 'child_process';
import {
  getPhpDir,
  normalizeEvent,
  transformFromAwsRequest,
  transformToAwsResponse,
  isDev,
  getUserDir
} from './helpers';

function query({ filename, body }: PhpInput): Promise<PhpOutput> {
  console.log(`🐘 Spawning: PHP CLI ${filename}`);

  // php spawn options
  const options: SpawnOptions = {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: process.env
  };

  // now vs now-dev
  if (!isDev()) {
    options.env!.PATH = `${getPhpDir()}:${process.env.PATH}`;
    options.cwd = getPhpDir();
  } else {
    options.cwd = getUserDir();
  }

  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];

    const php = spawn(
      'php',
      ['-c', 'php.ini', filename],
      options,
    );

    // Output
    php.stdout.on('data', data => {
      chunks.push(data);
    });

    // Logging
    php.stderr.on('data', data => {
      console.error(`🐘 PHP CLI stderr`, data.toString());
    });

    // PHP script execution end
    php.on('close', (code, signal) => {
      if (code !== 0) {
        console.log(`🐘 PHP CLI process closed code ${code} and signal ${signal}`);
      }

      resolve({
        statusCode: 200,
        headers: {},
        body: Buffer.concat(chunks)
      });
    });

    php.on('error', err => {
      console.error('🐘 PHP CLI errored', err);
      resolve({
        body: Buffer.from(`🐘 PHP CLI process errored ${err}`),
        headers: {},
        statusCode: 500
      });
    });

    // Writes the body into the PHP stdin
    php.stdin.write(body || '');
    php.stdin.end();
  })
}

async function launcher(event: Event): Promise<AwsResponse> {
  const awsRequest = normalizeEvent(event);
  const input = await transformFromAwsRequest(awsRequest);
  const output = await query(input);
  return transformToAwsResponse(output);
}

exports.launcher = launcher;

// (async function () {
//   const response = await launcher({
//       Action: "test",
//       httpMethod: "GET",
//       body: "",
//       path: "/",
//       host: "https://zeit.co",
//       headers: {
//           'HOST': 'zeit.co'
//       },
//       encoding: null,
//   });

//   console.log(response);
// })();
