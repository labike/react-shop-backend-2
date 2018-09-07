### React-Shop-Backend-2

new backend system, it is simple, from https://github.com/labike/react-shop-backend, fix some bug

#### use

    git clone

    yarn install

#### change proxy

webpack.config.js

    proxy: {
        '/manage': {
            target: '{换成自己的接口}',
            changeOrigin: true
        },
        '/user/logout.do': {
            target: '{换成自己的接口}',
            changeOrigin: true
        }
    }

#### Dev

    yarn run dev

#### prod

    yarn run dist

#### interface style

    wait moment...

#### views

![goods-1](http://oo8hp4ueg.bkt.clouddn.com/goods-1.png)

![goods-2](http://oo8hp4ueg.bkt.clouddn.com/goods-2.png)

![goods-3](http://oo8hp4ueg.bkt.clouddn.com/goods-3.png)

![goods-4](http://oo8hp4ueg.bkt.clouddn.com/goods-4.png)

![goods-5](http://oo8hp4ueg.bkt.clouddn.com/goods-5.png)

![goods-6](http://oo8hp4ueg.bkt.clouddn.com/goods-6.gif)

more  https://www.os4team.cn
