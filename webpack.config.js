const path = require('path')

module.exports = {
    entry: {
        home: './src/scripts/dist/home.js',
        browse: './src/scripts/dist/browse.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}