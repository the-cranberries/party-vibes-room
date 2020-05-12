module.exports = {
    mode: 'development',
    entry: ['./client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            { exclude: /node_modules/, }
        ]
    }
}