
class LoginController {
  
  constructor($http){
    
    this.username = ''
    this.password = ''
    
    this.login = function(){
        this.getAccount($http)
    };
  }
  
  getAccount(http) {
    
    http.get('/s');
    //console.log(this.username, 123);
  }
}

export default LoginController;