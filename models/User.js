const db= require('../util/database');


module.exports=class user{
    constructor(login,password){
        this.user_id
      this.login=login;
      this.password=password;
        db.execute('INSERT INTO registered_user(login, password) VALUES(?, ?)',[login,password])
    }
    
    static findByLogin(login){
      return  db.execute('SELECT * FROM registered_user where login = ?',[login]);
        
    }
    
}