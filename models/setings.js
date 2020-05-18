const db= require('../util/database');


module.exports=class setings{
    constructor(user_id,music,sounds){
        this.user_id=user_id;
        this.music=music;
        this.sounds=sounds;
      
        db.execute('INSERT INTO setings(user_id, volume, sounds)VALUES(?, ?, ?)',[user_id,music,sounds])

        
    }
    
    static findById(id){
      return  db.execute('SELECT * FROM setings where user_id = ?',[id]);
        
    }
    static update(user_id,music,sounds){
        db.execute('UPDATE setings SET  volume=?,sounds=? WHERE user_id=?;',[music,sounds,user_id])
      }

    
}