const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js",
        publicPath: '/'
    },
    target: "web",
    devServer: {
        port: "3000",
        contentBase: ["./public"],
        open: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ["*",".js",".jsx",".ts",".tsx",".json",".css",".jpg",".jpeg","png"],
        alias: {
            process: "process/browser"
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" 
                }
            },
            // for TypeScript
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            // for css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //for images
            {
                test: /\.(jpg|png)$/,
                use: 
                    {
                        loader: 'file-loader',
                    }
            },
        ]
    }
}