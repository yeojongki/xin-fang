/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { router } from 'umi';
import { HttpErrorResponse } from '@xf/common/src/interfaces/http.interface';
import { getStorageToken } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: {
  response: Response;
  data: HttpErrorResponse;
  message?: string;
}): Response => {
  const { response } = error;

  // 网络异常
  if (!response) {
    notification.error({
      message: '服务器发生错误',
      description: '请检查你的网络或刷新重试',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: '/api',
  errorHandler,
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  const newOptions = options;
  // add token to header
  const token = getStorageToken();
  if (token) {
    newOptions.headers = {
      ...newOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    url,
    options: { ...newOptions, interceptors: true },
  };
});

request.interceptors.response.use(async response => {
  const { url, status } = response;
  const data: HttpErrorResponse = await response.clone().json();
  if (data && data.errno === 0) return response;

  // 自定义错误
  if (data && data.message !== undefined) {
    const { message, errno, error } = data;
    notification.error({
      message: `${message} ${error}`,
      description: errno ? `errno: ${errno}` : '',
    });

    // match exception routes
    if (status === 401) {
      const { search } = window.location;
      const href = encodeURIComponent(window.location.href);
      // 判断 search 避免在当前页面刷新 url 会重复添加 search
      router.replace(`/exception/401${search || `?redirect=${href}`}`);
    }
    if (status === 403) {
      router.push('/exception/403');
    }
    if (status === 404) {
      router.push('/exception/404');
    }
    if (status === 500) {
      router.push('/exception/500');
    }
    return Promise.reject(new Error(data.message || 'Error'));
  }

  // 未知错误
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  return response;
});

export default request;
