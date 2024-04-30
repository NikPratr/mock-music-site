const path = require('path')

module.exports = {
    entry: {
        home: './dist/client/src/scripts/home.js',
        browse: './dist/client/src/scripts/browse.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}