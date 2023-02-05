const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // "^/api/QuizMaster/": {
      //   target: "http://10.20.5.27:7070",
      //   changeOrigin: true,
      //   pathRewrite: {"^/api": ""},
      // },
      // "^/api/DynamicContest": {
      //   target: "http://10.20.5.27:7071",
      //   changeOrigin: true,
      //   pathRewrite: {"^/api/DynamicContest": ""},
      // },
      // "^/api/contest/": {
      //   target: "http://10.20.5.46:9090",
      //   changeOrigin: true,
      //   pathRewrite: {"^/api": ""},
      // },
      "^/oauth/api/auth": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: {"^/api": ""},
      },
      "^/api/quizMaster" : {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        pathRewrite: {"^/api": ""},
      },
      "^/api/quizContest" :{
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        pathRewrite: {"^/api": ""},
      },
      "^/api/quizDynamic": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        pathRewrite: {"^/api": ""},
      },
      "^/api/kafka": {
        target: "http://10.20.5.34:8088",
        changeOrigin: true,
        pathRewrite: {"^/api": ""},
      }
    }
  }
})
