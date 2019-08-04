type Headers = { [k: string]: string | string[] | undefined };

interface Files {
    [filePath: string]: import('@now/build-utils').File;
}

interface MetaOptions {
    meta: import('@now/build-utils').Meta;
}

interface AwsRequest {
    method: string,
    path: string,
    host: string,
    headers: Headers,
    body: string,
}

interface AwsResponse {
    statusCode: number,
    headers: Headers,
    body: string,
    encoding?: string
}

interface Event {
    Action: string,
    body: string,
    httpMethod: string,
    path: string,
    host: string,
    headers: Headers,
    encoding: string | undefined | null,
}

interface InvokedEvent {
    method: string,
    path: string,
    host: string,
    headers: Headers,
    encoding: string | undefined | null,
}

interface CgiInput {
    filename: string,
    path: string,
    host: string,
    method: string,
    headers: Headers,
}

interface PhpInput {
    filename: string,
    path: string,
    uri: string,
    host: string,
    method: string,
    headers: Headers,
    body: string,
}

interface PhpOutput {
    statusCode: number,
    headers: Headers,
    body: Buffer,
}

interface CgiHeaders {
    [k: string]: string,
}

interface CgiRequest {
    env: Env,
}

interface Env {
    [k: string]: any,
}
