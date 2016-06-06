import LoginController from './login_controller';

var moduleName='registerApp.controllers';

angular
    .module(moduleName, [])
    .controller('registerApp.loginController', LoginController);

export default moduleName;