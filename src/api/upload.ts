import { safe64 } from '@/utils/upload';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';
// import * as createHmac from 'create-hmac';
import { HttpService } from './request';
// import * as qiniu from '@/lib/qiniu/index.js';
const httpService = new HttpService();
const useRequest = httpService.useRequest;

const methods = {
  buckets: 'https://rs.qbox.me/buckets', //空间列表
  domains: 'https://api.qiniu.com/v6/domain/list', //空间对应的域名列表(授权空间域名返回为空)
  count: 'https://api.qiniu.com/v6/count', //统计文件数量(标准存储)
  count_line: 'https://api.qiniu.com/v6/count_line', //统计文件数量(低频存储)
  space: 'https://api.qiniu.com/v6/space', //统计文件空间(低频存储)
  space_line: 'https://api.qiniu.com/v6/space_line', //统计文件空间(低频存储)
};
const config = {
  ACCESS_KEY: 'S9pRCZiUr0GZHL9w0ecDTUscG4MiRstcowEueM_D',
  SECRET_KEY: 'DdcpudMbZQIYEd8eaQz1Otuq8zOBzJrEKWXoUohy',
  bucketName: 'merlin90',
};

export const getBuckets = () => {
  return useRequest<any[]>({
    url: methods.buckets,
    timeout: 10000,
    method: 'get',
  });
};

// export const getQiNiuToken = () => {
//   console.log('🚀 ~ file: upload.ts ~ line 31 ~ getQiNiuToken ~ qiniu', qiniu);

//   return new qiniu.auth.digest.Mac(config.ACCESS_KEY, config.SECRET_KEY);
// };
function base64UrlSafeEncode(target: string): string {
  return target.replace(/\//g, '_').replace(/\+/g, '-');
}

export function getQiNiuToken() {
  const putPolicy = JSON.stringify({ scope: config.bucketName, deadline: new Date().getTime() });
  const encodedPutPolicy = base64UrlSafeEncode(Base64.encode(putPolicy));

  const hmacEncoder = HmacSHA1(encodedPutPolicy, config.SECRET_KEY);
  // .update(encodedPutPolicy)
  // .finalize();
  console.log('🚀 ~ file: upload.ts ~ line 43 ~ getQiNiuToken ~ hmacEncoder', hmacEncoder);

  console.log(
    '🚀 ~ file: upload.ts ~ line 46 ~ getQiNiuToken ~ encodedPutPolicy',
    encodedPutPolicy,
  );
  const encoded_signed = hmacEncoder.toString(CryptoJS.enc.Base64);
  safe64(encoded_signed);
  //   const sign = base64UrlSafeEncode(hmacEncoder.update(encodedPutPolicy).digest('base64'));
  const token = `${config.ACCESS_KEY}:${safe64(encoded_signed)}:${encodedPutPolicy}`;
  return token;
}
