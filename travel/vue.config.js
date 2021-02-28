module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // data: '@import "~@/../src/css/global.sass'
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        hotOnly: false,
        proxy: {
            "/api": {
                target: "http://localhost:2000/",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map',
        externals: {
            AMap: "AMap"
        }
    },
    // globals: {
    //     BMap: true,
    //     BMAP_NAVIGATION_CONTROL_SMALL: true,
    //     BMAP_ANCHOR_TOP_RIGHT: true,
    //     BMAP_NORMAL_MAP: true,
    //     BMAP_HYBRID_MAP: true,
    //     BMAP_ANCHOR_TOP_LEFT: true,
    //     BMAP_NAVIGATION_CONTROL_LARGE: true,
    //     BMAP_ANIMATION_BOUNCE: true,
    //     ...
    // }

}