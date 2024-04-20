const path = require('path')

module.exports = {
    entry: {
        home: './src/scripts/dist/home.js'
    },
    output: {
        filename: 'home.js',
        path: path.resolve(__dirname, 'dist')
    }
}