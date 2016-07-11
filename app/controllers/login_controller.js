
class LoginController {
  
  constructor($http){
    
    this.username = '32'
    this.password = ''
    
    this.login = function(){
        this.getAccount($http)
    };
  }
  
  getAccount(http) {
    
    let data = JSON.stringify({
        "username" : this.username,
        "password" : this.password
      })
    
    console.log(data);
    
    http.post('/login', data);
  }
}

export default LoginController;