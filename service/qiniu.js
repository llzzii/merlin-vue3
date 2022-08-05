const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const Bodyparse = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = new Router();
let qiniu = require('qiniu');
app.use(
  Bodyparse({
    jsonLimit: '10M',
    formLimit: '10M',
    textLimit: '10M',
  }),
); // 处理post请求
app.use(cors()); // 允许跨域

// const accessKey = "";   //
// const secretKey = "";
// const bucket = "";

const accessKey = 'S9pRCZiUr0GZHL9w0ecDTUscG4MiRstcowEueM_D'; // 七牛账号
const secretKey = 'DdcpudMbZQIYEd8eaQz1Otuq8zOBzJrEKWXoUohy';
let bucket = 'merlin90';
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
let imageUrl = 'http://upload-z2.qiniup.com'; // 你要上传的域名
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const imgdomain = 'http://rfzdamvd3.hd-bkt.clouddn.com'; //创建bucket是七牛自动分配的域名
let options = {
  scope: bucket,
};
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);
let option = { limit: 20 };
// 获取前端上传七牛云所属需要的token
router.get('/gettoken', async (ctx, next) => {
  console.log('mac', mac);
  let options = {
    scope: bucket,
    expires: 3600 * 24,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  if (uploadToken) {
    ctx.body = {
      code: 0,
      token: uploadToken,
    };
  } else {
    ctx.body = 'error';
  }
  await next();
});
//拿到数据返给前端
router.get('/imglist', async (ctx, next) => {
  await getQiniuImg(bucket, option).then((res, reject) => {
    // res.
    ctx.body = {
      code: 0,
      data: res,
    };
  });
  await next();
});

/**
 * @param {}
 *
 * */
//获取七牛云上的资源列表的方法封装
function getQiniuImg(bucket, limit) {
  return new Promise((resolve, reject) => {
    bucketManager.listPrefix(bucket, limit, function (respErr, respBody, respInfo) {
      if (respBody.error) {
        respErr = { error: respBody.error, status: respBody.status };
      }
      if (respBody) {
        resolve(respBody);
      } else {
        reject(respInfo);
      }
    });
  });
}
app.use(async (ctx, next) => {
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(1000);
