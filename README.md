### EBusiness
#### 从0打造电商平台

##### 本项目采取nginx做代理，并未采用devServer的proxy
```
npm run dev 启动本项目
npm start 启动后端接口(apiServer项目)服务
MySQL Installer - Community启动MySQL数据库
redis-server.exe redis.windows.conf 进入redis安装目录，运行redis服务
start nginx 进入nginx目录启动nginx，nginx端口8080
```
访问
```
http://localhost:8080/view/login.html
```

也可通过devServer proxy

