const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./client/index.html",
    filename: "./backend/static/index.html",
    inject: "body"
});

common_rules = [
    {
        test: /\.css$/,
        use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
        ]
    },

    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ]
            }
        }
    },

    {
        test: /\.jsx?$/,
        exclude: /node_modules/,

        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ]
            }
        }
    }
]

util_exports = {
    name: "bootstrap bundle",
    mode: "production",
    entry: "./client/bootstrap.js",
    output: {
        path: path.resolve("backend/static"),
        filename: "bootstrap_bundle.js"
    },

    module: {
        rules: common_rules
    },
};

app_exports = {
    name: "app bundle",
    mode: "production",
    entry: "./client/index.js",
    output: {
        path: path.resolve("backend/static"),
        filename: "app_bundle.js"
    },

    module: {
        rules: common_rules
    },

    plugins: [HtmlWebpackPluginConfig]
};

module.exports = [
    util_exports, app_exports
];
