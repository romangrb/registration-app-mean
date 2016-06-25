
class LoginController {
  constructor(){
    
    this.username = '';
    this.password = '';
    
    this.login = function(){
        this.getAccount();
    };
  }
  getAccount() {
    console.log(this.username, 123);
  }
}

export default LoginController;