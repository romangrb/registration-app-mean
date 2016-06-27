import LoginService from './login_service';

var moduleName='registerApp.services';

angular
    .module(moduleName, [])
    .service('registerApp.loginService', LoginService);

export default moduleName;