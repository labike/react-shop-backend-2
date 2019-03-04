### React-Shop-Backend-2

new backend system, fix some bug, upgrade some syntax of ES5/6 

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

![goods-1](http://img.labike.xyz/goods-1.png)

![goods-2](http://img.labike.xyz/goods-2.png)

![goods-3](http://img.labike.xyz/goods-3.gif)

![goods-4](http://img.labike.xyz/goods-4.gif)

![goods-5](http://img.labike.xyz/goods-5.gif)

![goods-6](http://img.labike.xyz/goods-6.gif)

more  https://www.os4team.cn
