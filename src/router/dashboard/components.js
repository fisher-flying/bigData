// 会被编译到本app.js中的组件
const components = {
  'error/notFound404': require('../../views/error/notFound404.vue').default,
  'dashboard/login': require('../../views/dashboard/login.vue').default,
  'dashboard/overview': require('../../views/dashboard/overview.vue').default,
  'dashboard/operation': require('../../views/dashboard/operations.vue').default,
  'dashboard/derived': require('../../views/dashboard/derived.vue').default
}
export default components
