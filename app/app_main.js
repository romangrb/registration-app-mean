import { default as controllersModuleName } from './controllers/app_controllers';
import { default as servicesModuleName } from './services/app_services';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'templates/login.html',
      controller:'registerApp.loginController',
      controllerAs:'vm'
    })
    .when('/register',{
      templateUrl:'templates/register.html',
      controller:'registerApp.loginController',
      controllerAs:'vm'
    })
    .when('/remind',{
      templateUrl:'templates/remind_password.html',
      controller:'registerApp.loginController',
      controllerAs:'vm'
    })
    .otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

var moduleName = 'registerApp';

angular
    .module(moduleName, [
        'ngRoute',
        servicesModuleName,
        controllersModuleName
    ])
    .config(config);

export default moduleName;