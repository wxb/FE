# Fis3 在 release 时注意事项

## to 服务器目标目录读写权限

在我们配置fis-conf.js 时，对于 `to` 发不到服务器或测试环境下的 **目标目录** 一点要保证 **读写** 权限

```

 fis.match('*', {
   deploy: fis.plugin('http-push', {
     receiver: 'http://iweb.com/fuelphp/receiver.php',
     to: '/usr/local/nginx/www/fuelphp' // 注意这个是指的是测试机器的路径，而非本地机器
   })
 })
 
```

检查目录 `ls -l ` 权限，添加写权限 `chmod -R a+w fuelphp`

