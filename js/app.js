
angular.module('myApp', ['starter.controllers','ui.router','ui.bootstrap','ngFileUpload','oitozero.ngSweetAlert','ui.select', 'ngSanitize','myComponent','angularValidator'])

    .config(function ($stateProvider,$urlRouterProvider) {

  $stateProvider

  .state('temp', {
    url: '/temp',
    templateUrl: 'templates/temp.html',
    controller:'tempCon'
  })


  .state('temp.basic-info', {
    url: '/basic-info',
    views: {
      'slide-right': {
        templateUrl: 'templates/basic-info.html'
        // controller: 'DashCtrl'
      }
    }
  })

  .state('temp.info-maintain', {
      url: '/info-maintain',
      views: {
        'slide-right': {
          templateUrl: 'templates/info-maintain.html'
          // controller: 'ChatsCtrl'
        }
      }
    })
  .state('temp.system-manage', {
      url: '/system-manage',
      views: {
          'slide-right': {
              templateUrl: 'templates/system-manage.html'
              // controller: 'ChatsCtrl'
          }
      }
  })
      .state('temp.apply-info', {
          url: '/apply-info',
          views: {
              'slide-right': {
                  templateUrl: 'templates/apply-info.html',
                  controller:'applyInfo'
              }
          }

      })
      .state('temp.audit', {
          url: '/audit',
          views: {
              'slide-right': {
                  templateUrl: 'templates/audit.html',
                  controller:'audits'
              }
          }

      })
      .state('temp.test-ready', {
          url: '/test-ready',
          views: {
              'slide-right': {
                  templateUrl: 'templates/test-ready.html',
                  controller:'test-ready'
              }
          }

      })
      .state('temp.field-inspection', {
          url: '/field-inspection',
          views: {
              'slide-right': {
                  templateUrl: 'templates/field-inspection.html',
                  controller:'field-inspection'
              }
          }

      })
      .state('temp.inspection-report', {
          url: '/inspection-report',
          views: {
              'slide-right': {
                  templateUrl: 'templates/inspection-report.html',
                  controller:'inspection-report'
              }
          }

      })
      .state('temp.recheck', {
          url: '/recheck',
          views: {
              'slide-right': {
                  templateUrl: 'templates/recheck.html',
                  controller:'recheck'
              }
          }

      })
      .state('temp.certificate', {
          url: '/certificate',
          views: {
              'slide-right': {
                  templateUrl: 'templates/certificate.html',
                  controller:'certificateCtrl'
              }
          }

      })
      .state('temp.admin-management', {
          url: '/admin-management',
          views: {
              'slide-right': {
                  templateUrl: 'templates/admin-management.html',
                  controller:'admin-management'
              }
          }

      })

      .state('temp.role-management', {
          url: '/role-management',
          views: {
              'slide-right': {
                  templateUrl: 'templates/role-management.html',
                  controller:'roleManagement'
              }
          }

      })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:'login'
  });

        $urlRouterProvider.otherwise('login');
});
