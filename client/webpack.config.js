const path = require('path');

module.exports = {
    mode: 'development',
    entry: '/src/scripts/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: 'ts-loader'
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}