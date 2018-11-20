/**
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           佛祖保佑       永无霸葛
           心外无法       法外无心
**/

// 路由设置
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: 'dashboard/login'
  },
  {
    path: '/overview',
    //meta: { title: '首页', icon: 'fa fa-home' },
    component: 'dashboard/overview'
  },
  {
    path: '/operation',
    //meta: { title: '运营', icon: 'fa fa-line-chart' },
    component: 'dashboard/operation'
  },
  /*{
    path: '/questions',
    meta: { title: '题库', icon: 'fa fa-edit' },
    component: 'dashboard/questions'
  },
  {
    path: '/medical',
    meta: { title: '临床知识库', icon: 'fa fa-bed' },
    component: 'dashboard/medical'
  },
  {
    path: '/mooc',
    meta: { title: '慕课', icon: 'fa fa-bar-chart' },
    component: 'dashboard/mooc'
  },
  {
    path: '/newexam',
    meta: { title: '考试', icon: 'fa fa-map-o' },
    component: 'dashboard/newexam'
  },
  {
    path: '/pmph',
    meta: { title: '官网', icon: 'fa fa-file-text-o' },
    component: 'dashboard/pmph'
  },
  {
    path: '/shop',
    meta: { title: '商城', icon: 'fa fa-shopping-cart' },
    component: 'dashboard/shop'
  },
  {
    path: '/zzfw',
    meta: { title: '增值服务', icon: 'fa fa-clipboard' },
    component: 'dashboard/zzfw'
  },*/
  {
    path: '/derived',
    meta: { title: '导出报表', icon: 'fa fa-file-excel-o' },
    component: 'dashboard/derived'
  },
  {
    path: '/404',
    component: 'error/notFound404'
  }
]
window.routes = routes

export default routes
