const path = require('path');
// port pre heroku 
var PORT = process.env.PORT || 3000 ;

const express = require('express');
const bodyParser = require('body-parser');
//
// inports
const loginRoutes = require('./routes/login');
const mainMenuRoutes = require('./routes/mainMenu');
const registerRoutes = require('./routes/register');
const scoreRoutes = require('./routes/score');
const settingsRoutes = require('./routes/settings');
const newGameRoutes = require('./routes/newGame');
const game= require('./routes/game');
const db = require('./util/database');

const app = express();
//pre generovanie html 
app.set('view engine','ejs');
//kde su views 
app.set('views','views');
// it will take html too
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
/*
db.execute('SELECT * FROM registered_user ')
.then(result=> {
    console.log(result[0],result[1]);
})
.catch( err =>{
    console.log(err);
});
*/
app.get('/game',(req,res,next)=>{
    res.render('index.html');
})
app.use(loginRoutes);
app.use(mainMenuRoutes);
app.use(registerRoutes);
app.use(scoreRoutes);
app.use(settingsRoutes);
app.use(newGameRoutes);





app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});
})
 var server = app.listen(PORT);

// hra 
//socket list
var  SOCKET_LIST={};
var Entity=require('./model/Entity');

var Wall=(x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    // bude zaberat viac ako jeden pixel,
    self.weight;
    self.update=()=>{
       
    }
    Wall.list[self.id]=self;
    
    initPack.wall.push({
        id:self.id,
        x:self.x,
        y:self.y,
    })
    return self;

};
Wall.list={};

var Box=(x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    self.toRemove=false;
    self.update=()=>{
    }
   
    Box.list[self.id]=self;
    initPack.box.push({
        id:self.id,
        x:self.x,
        y:self.y,
    })
    console.log(initPack);
    return self;

};
Box.list={};
Box.update=()=>{
    
    var pack =[];
    
  for (var i in Box.list){
      var box= Box.list[i];
      box.update();
      if(box.toRemove){
          delete Box.list[i];
          removePack.box.push(bomb.id);
      }
      
     pack.push({
        id:box.id,
        x:box.x,
        y:box.y,
      // do bomby sa prida cislo kolko ich bolo pouzitych
     })
  }
  return pack;
}

//bomba


var Bomb=(id,x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    self.timer =2;
    self.toRemove=false;
    self.playerId=id;
    self.radius=60;
    self.blastHeight=10;
    var super_update = self.update;
    // 

    self.update=()=>{
  
        if (self.timer++>100)
        {
            for(var i in Player.list)
            {
                
                var p = Player.list[i];
               /* if(Wall.list !={}){
                    console.log('ctt robim');
                    for(var j in Wall.list)
                    {   var w= Wall.list[i];
                        console.log('co tu robim');
                        if(
                            (
                                    //player P<-Bomb->P
                                    (p.x>self.x-self.radius & p.x<self.x+self.radius )
                                    &(
                                        (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight )
                                    )
                                    //wall betwen them
                                &(  // not P W <-B->W P
                                (w.x<p.x-self.x-self.radius & w.x> p.x-self.x+self.radius)
                                & 
                                (w.y<p.y-self.y-self.blastHeight & w.y> p.y-self.y+self.blastHeight) 
                                ) 
                            )
                            ||
                            (
                                    //player
                                    (p.y>self.y-self.radius & p.y<self.y+self.radius )
                                    &(
                                        (p.x>self.x-self.blastHeight & p.x<self.x+self.blastHeight )
                                    )
                                    //wall betwen them
                                &(
                                (w.y<p.y-self.y-self.radius & w.y> p.y-self.y+self.radius)
                                & 
                                (w.x<p.x-self.x-self.blastHeight & w.x> p.x-self.x+self.blastHeight) 
                                ) 
                        )
                        ){
                            //remove box
                            Player.list[i].toRemove=true;
                            var droper= Player.list[self.platerId];
                            if(droper);
                                droper.score++
                        }
                    }
                }*/
               // else{
                        if(
                            (
                                    //player P<-Bomb->P
                                    (p.x>self.x-self.radius & p.x<self.x+self.radius )
                                    &(
                                        (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight )
                                    )
                                    //wall betwen them
                                
                            )
                            ||
                            (
                                    //player
                                    (p.y>self.y-self.radius & p.y<self.y+self.radius )
                                    &(
                                        (p.x>self.x-self.blastHeight & p.x<self.x+self.blastHeight )
                                    )
                                    //wall betwen them
                                
                        )
                        ){
                            Player.list[i].toRemove=true;
                                var droper= Player.list[self.playerId];
                                if(droper);
                                    droper.score+=1;


                        }


                //}
            }
            /*
        for(var i in Box.list)
        {
            var p = Box.list[i];
            if(self.getDistance(p)<32){
                //remove box
                Box.list[i].toRemove=true;
                
        
            }
        }*/
        self.toRemove=true;  
                  
           

        }
             
            
            
        super_update();
       
    }
    Bomb.list[self.id]=self;
    initPack.bomb.push({
        id:self.id,
        x:self.x,
        y:self.y,
    })
    return self;
}
Bomb.list = {};
Bomb.update=()=>{
    
    var pack =[];
    
  for (var i in Bomb.list){
      var bomb= Bomb.list[i];
      bomb.update();
      if(bomb.toRemove){
          delete Bomb.list[i];
          removePack.bomb.push(bomb.id);
      }
     pack.push({
        id:bomb.id,
        x:bomb.x,
        y:bomb.y,
      // do bomby sa prida cislo kolko ich bolo pouzitych
     })
  }
  return pack;
}
//



// player construcctor

var Player =(id)=>{
    var self = Entity();
        self.id=id,
        // it will be changed to player login name later
        self.number=""+Math.floor(10*Math.random()),
        // controls
        self.pressingRight=false;
        self.pressingLeft=false;
        self.pressingUp=false;
        self.pressingDown=false;
        self.pressingSpace=false;
        self.maxSpd=10;
        self.score=0;
    
    // updating position 
    var super_update=self.update;
    self.update=()=>{
        self.updateSpdn();
        super_update();
       
        if(self.pressingSpace){
            Bomb(self.id,self.x,self.y);
        }
    
    }
   

    self.updateSpdn=()=>{
        if(self.pressingRight)
            self.spdX +=self.maxSpd;
       else if(self.pressingLeft)
            self.spdX -=self.maxSpd;
            else 
            self.spdX=0;
        if(self.pressingUp)
            self.spdY -=self.maxSpd;
        else if(self.pressingDown)
        self.spdY +=self.maxSpd;
        else 
        self.spdY=0;
    }
    self.getInitPack=function(){
       return {
            id:self.id,
            x:self.x,
            y:self.y,
            number:self.number,
            score:self.score
        }
    }
    Player.list[self.id]=self;
    initPack.player.push({
        id:self.id,
        x:self.x,
        y:self.y,
        number:self.number,
        score:self.score
    })
    return self;
}
Player.list={};
// on player conection + controll
//calls player constructor
Player.onConnect=(socket)=>{
    var map={ "box":[  {"x":258,"y":368} ], "wall":[{"x":258,"y":368},{"x":288,"y":388} ] }    
           
    for(i in map.box){
        Box(map.box[i].x,map.box[i].y)
        
    }
    for(i in map.wall){
      Wall(map.wall[i].x,map.wall[i].y)
      
     }
    var player=Player(socket.id);
    socket.on('keyPress',(data)=>{
        if(data.inputId === 'left')
            player.pressingLeft=data.state;
        if(data.inputId === 'right')
            player.pressingRight=data.state;
        if(data.inputId === 'up')
            player.pressingUp=data.state;
        if(data.inputId === 'down')
            player.pressingDown=data.state;
        if(data.inputId === 'space')
            player.pressingSpace=data.state;
        
    });
    var players =[]
    for(var i in Player.list){
        players.push({
            id:Player.list[i].id,
            x:Player.list[i].x,
            y:Player.list[i].y,
            number:Player.list[i].number,
            score:Player.list[i].score
        })
    }
    var bombs=[];
    for(var i in Bomb.list){
        bombs.push({
            id:Bomb.list[i].id,
            x:Bomb.list[i].x,
            y:Bomb.list[i].y,
        })
    }
    socket.emit('init',{
        player:players,
        bomb:bombs
    })
};
Player.onDisconect=(socket)=>{
     delete Player.list[socket.id];
     removePack.player.push(socket.id);
}
Player.update=()=>{
    var pack =[];
    // change player status
   
  for (var i in Player.list){
      var player= Player.list[i];
      player.update();
      if(player.toRemove){
        delete Player.list[i];
        removePack.player.push(player.id);
    }
    //upd pack
     pack.push({
      id:player.id,
      x:player.x,
      y:player.y,
      score:player.score
     
     })
  }
  return pack;
}
//
      

  var io = require('socket.io').listen(server);
  // call fcion for new conection 
  io.sockets.on('connection',function(socket){
      // creating socket id
      socket.id= Math.random();
      //adding it to the list
      SOCKET_LIST[socket.id]=socket;
        Player.onConnect(socket);
           

        
    
      
      
//disxonext
      socket.on('disconnect',()=>{
          delete SOCKET_LIST[socket.id];
         Player.onDisconect(socket);
      })
  
     
  });
// beh hry 
  var initPack={box:[],wall:[],player:[],bomb:[]};
  var removePack={player:[],bomb:[],box:[]};


  setInterval(function(){
      var pack = {
            player:Player.update(),
            bomb:Bomb.update(),
            box:Box.update()
      };
  
    // send it to every socket conected
    for(var i in SOCKET_LIST){
        var socket= SOCKET_LIST[i];
        socket.emit('init',initPack);
        socket.emit('update',pack);
        socket.emit('remove',removePack);
        
    }
    initPack.player=[];
    initPack.bomb=[];
    initPack.box=[];
    initPack.wall=[]
    removePack.player=[];
    removePack.bomb=[];
    removePack.box=[];
  },1000/25);
  
  
  
