import { default as controllersModuleName } from './controllers/app_controllers';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'templates/login.html',
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
        controllersModuleName
    ])
    .config(config);

export default moduleName;