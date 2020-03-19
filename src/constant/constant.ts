export const CORS = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

export const ENV = process.env;

export const optionsPublic = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

export const bodyParserOptions = {
    strict: false,
    limit: '10mb'
};

export const typeMessage = {
    group : "GROUP",
    user : "USER",
    system : "SYSTEM"
}