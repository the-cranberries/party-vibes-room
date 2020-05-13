module.exports = {
    mode: 'development',
    entry: [
        '@babel/polyfill', // enables async-await
        './client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}