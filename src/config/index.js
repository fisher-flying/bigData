/* global localStorage */

let pathName = window.location.pathname.substring(1)
let contextPath = pathName === '' || pathName === undefined ? '' : pathName.substring(0, pathName.indexOf('/'))
let localURL = localStorage.serverURL || 'http://localhost/'
if (window.NODE_ENV !== 'dev' && window.location.host !== 'localhost:3000') {
  if (contextPath === '') {
    localURL = window.location.protocol + '//' + window.location.host + '/'
  } else {
    localURL = window.location.protocol + '//' + window.location.host + '/' + contextPath + '/'
  }
}
const serverURL = localURL

// window.siteURL='http://192.168.33.147:9099/api/'
// window.siteFrontURL='http://192.168.33.147:9091/api/'
// window.siteURL='http://192.168.33.149:9099/api/'
// window.siteFrontURL='http://192.168.33.149:9091/api/'  // 前台渲染页面和单个报表工程
window.siteURL='http://rds.ipmph.com/admin/api/'
window.siteFrontURL='http://rds.ipmph.com/report/api/'  // 前台渲染页面和单个报表工程


export default {
  serverURL: serverURL,
  axios: {
    baseURL: serverURL,
    timeout: 20000,
    headers: {
      post: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    withCredentials: true
  }
}
