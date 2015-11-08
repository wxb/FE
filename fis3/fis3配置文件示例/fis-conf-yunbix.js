// 基础配置

const APP = ''; // APP的名称，根据项目的实际情况来制定

//本地环境
const lc_root = ''; //本地网站目录
const lc_url = '/';

//QA环境
const qa_tpl_receiver = 'http://xxx.xxx.xxx.xxx:port/i/receiver.php';
const qa_img_receiver = 'http://xxx.xxx.xxx.xxx:port/i/receiver.php';

const qa_tpldir = '/dir/' + APP;
const qa_cdn = 'http://xxx.xxx.xxx.xxx:8099/';
const qa_webroot = APP;
const qa_url = '/' + APP;
const qa_imgdir = '/webroot/' + APP;

////////////////////////////////////
////////////////////////////////////
// 以下配置为当前目录的基本配置
// 一般情况下不用更改
// 注意：每个类别都需要独立配置才行

// 默认基础配置
//fis.set('project.ignore', );
fis
 .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.css', {
    optimizer: fis.plugin('clean-css')
  });

// 开发环境配置
fis.media('dev')
  //TPL JSON
  .match('*.{tpl,json}', {
    deploy: fis.plugin('local-deliver', {
      to: lc_root + APP
    })
  })
  .match('*.{woff,ttf,woff2,otf,eot,svg,png,jpg,gif,css,js,swf}', {
    deploy: fis.plugin('local-deliver', {
      to: lc_root + APP + '\\static'
    }),
    url: lc_url + APP + '/static$0',
  })
  .match('**', {
    useHash: false
  });

// 联调环境配置
fis
  .media('qa')
  .match('**', {
    useHash: true,
    domain: qa_cdn
  })
  .match('*.tpl', {
    deploy: fis.plugin('http-push', {
      receiver: qa_tpl_receiver,
      to: qa_tpldir
    }),
    useHash: false
  })
  .match('*.{woff,ttf,woff2,otf,eot,svg,png,jpg,gif,css,js,swf}', {
    deploy: fis.plugin('http-push', {
      receiver: qa_img_receiver,
      to: qa_imgdir + '/static'
    }),
    url: APP + '/static$0'
  })