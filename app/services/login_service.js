
class LoginService {
    
    constructor($http){
      
       this.http = $http
       this.urlBase = '/'
       this.name = ''
       this.name.ID = ''
       
    }
    
    getUser(){
        return this.http.get(this.urlBase)
    }
    getUserById(id){
        return this.http.get(this.urlBase + '/' + id)
    }
    insertUser(name) {
        return this.http.post(this.urlBase, name)
    }
    updateUser(cust) {
        return this.http.put(this.urlBase + '/' + this.name.ID, this.name)
    }
    deleteUser(id) {
        return this.http.delete(this.urlBase + '/' + id)
    }
    
}

export default LoginService;
