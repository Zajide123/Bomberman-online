const path = require('path');
// port pre heroku 
var PORT = process.env.PORT || 3000 ;

const express = require('express');
const bodyParser = require('body-parser');
const session=require('express-session');
var MSSQLStore = require('connect-mssql')(session);

//
// inports
//#region Imports
const loginRoutes = require('./routes/login');
const mainMenuRoutes = require('./routes/mainMenu');
const registerRoutes = require('./routes/register');
const scoreRoutes = require('./routes/score');
const settingsRoutes = require('./routes/settings');
const newGameRoutes = require('./routes/newGame');
const game= require('./routes/game');
const db = require('./util/database');
//#endregion
//#region Routes and Stuf
const app = express();
//pre generovanie html 
app.set('view engine','ejs');
//kde su views 
app.set('views','views');
app.set('trust proxy',1);

// conf 
var config = {
    server: 'eu-cdbr-west-03.cleardb.net',
    user :'b81dd870c779dc',
    database:'heroku_809879640b9cbc4',
    password: '7a8a865a'

    
    
}


 
// it will take html too


app.use(session({
    secret:'supersecret',
    resave:false,
    saveUninitialized:false,
  
}));
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/views')));

/*
db.execute('SELECT * FROM registered_user ')
.then(result=> {
    console.log(result[0],result[1]);
})
.catch( err =>{
    console.log(err);
});
*/

app.use(loginRoutes);
app.use(mainMenuRoutes);
app.use(registerRoutes);
app.use(scoreRoutes);
app.use(settingsRoutes);
app.use(newGameRoutes);
app.use(game)


var player_count=0;

app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle:'Page Not Found'});
})
 var server = app.listen(PORT);

// hra 
//socket list
//#endregion
var  SOCKET_LIST={};
var Entity=require('./models/Entity');

//#region Wall
var Wall=(x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    self.toRemove=false
    // bude zaberat viac ako jeden pixel,
    self.weight;
    
    var super_update = self.update;
    self.update=()=>{
        super_update ();
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
//#endregion
//#region Box
var Box=(x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    self.toRemove=false;
    
    var super_update = self.update;
    self.update=()=>{
        super_update();
    }
   
    Box.list[self.id]=self;
    initPack.box.push({
        id:self.id,
        x:self.x,
        y:self.y,
    })
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
          removePack.box.push(box.id);
      }
      
     pack.push({
        id:box.id,
        x:box.x,
        y:box.y,
     })
  }
  return pack;
}
//#endregion
//bomba

//#region Bomba
var Bomb=(id,x,y)=>{
    var self= Entity();
    self.x=x;
    self.y=y;
    self.id= Math.random();
    self.timer =0;
    self.toRemove=false;
    self.playerId=id;
    self.radius=51;
    self.blastHeight=8.5;
    self.isWalkable=true;
    var super_update = self.update;
    // 

    self.update=()=>{
        
        if(self.timer >40){
            self.isWalkable=false;
        }
        if (self.timer++>100)
        {
        var DestroyPackL=[];
        var DestroyPackR=[];
        var DestroyPackU=[];
        var DestroyPackD=[];
            for (var i in Player.list){
                var p = Player.list[i];
                // x->
               if (((p.x>self.x & p.x<self.x+self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight ) )) DestroyPackR.push(p);
               // <-x
               else  if (((p.x<self.x & p.x>self.x-self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight  ) )) DestroyPackL.push(p);
                // up
                else  if (((p.y<self.y & p.y>self.y-self.radius) & (p.x>self.x-self.blastHeight & p.x<self.y+self.blastHeight  ) )) DestroyPackU.push(p);
                // down
                else if (((p.y>self.y & p.y<self.y+self.radius) & (p.x>self.x-self.blastHeight & p.x<self.y+self.blastHeight  ) )) DestroyPackD.push(p);
            }
            for (var i in Box.list){
                var p = Box.list[i];
                // x->
               if (((p.x>self.x & p.x<self.x+self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight  ) )) DestroyPackR.push(p);
               // <-x
               else  if (((p.x<self.x & p.x>self.x-self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight ) )) DestroyPackL.push(p);
                // up
                else  if (((p.y<self.y & p.y>self.y-self.radius) & (p.x>self.x-self.blastHeight & p.x<self.y+self.blastHeight  ) )) DestroyPackU.push(p);
                // down
                else if (((p.y>self.y & p.y<self.y+self.radius) & (p.x>self.x-self.blastHeight & p.x<self.y+self.blastHeight  ) )) DestroyPackD.push(p);
            }
            for (var i in Wall.list){
                var p = Wall.list[i];
                // x->
               if (((p.x>self.x & p.x<self.x+self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight  ) )) DestroyPackR.push(p);
               // <-x
               else  if (((p.x<self.x & p.x>self.x-self.radius) & (p.y>self.y-self.blastHeight & p.y<self.y+self.blastHeight  ) )) DestroyPackL.push(p);
                // up
                else  if (((p.y<self.y & p.y>self.y-self.radius) & (p.x>self.x-self.blastHeight & p.x<self.x-self.blastHeight ) )) DestroyPackU.push(p);
                // down
                else if (((p.y>self.y & p.y<self.y+self.radius) & (p.x>self.x-self.blastHeight & p.x<self.x-self.blastHeight ) )) DestroyPackD.push(p);
            }
        //for box 
            var toDestroyR;
            var toDestroyL;
            var toDestroyU;
            var toDestroyD;
            var toDestroyRC=0;
            var toDestroyLC=0;
            var toDestroyUC=0;
            var toDestroyDC=0;

            if(DestroyPackR[0])
            {
                toDestroyR=DestroyPackR[0];
                for(i=0;i<DestroyPackR.length-1;i++)
            {toDestroyRC++
                
                    if (toDestroyR.x>DestroyPackR[i].x);
                    else
                    toDestroyR=DestroyPackR[i];
                
                 
            }
            toDestroyR.toRemove=true;  
            console.log( 'R')
            }
            if(DestroyPackL[0])
            {
                toDestroyL=DestroyPackL[0];
                for(i=0;i<DestroyPackL.length-1;i++)
            {
                toDestroyLC++
                    if (toDestroyL.x<DestroyPackL[i].x)
                    ;
               else 
               toDestroyL=DestroyPackL[i];
                
                   
                   
                
              
            }
                
            toDestroyL.toRemove=true;
            console.log( 'L');
            }
            if(DestroyPackU[0])
            {
                toDestroyU=DestroyPackU[0];
                for(i=0;i<DestroyPackU.length-1;i++)
            {toDestroyUC++
                
                    if (toDestroyU.y<DestroyPackU[i].y)
                    ;
                   else toDestroyU=DestroyPackU[i];
                
            }
            toDestroyU.toRemove=true;
            console.log( 'U')
            }
            if(DestroyPackD[0])
            {

                toDestroyD=DestroyPackD[0];
                for(i=0;i<DestroyPackD.length-1;i++)
                {toDestroyDC++
                    
                        if (toDestroyD.y>DestroyPackD[i].y)
                    ;
                    else toDestroyD=DestroyPackD[i];
                }
                console.log( 'D')
                toDestroyD.toRemove=true;
            }


            
            
          
        

        

            if(toDestroyR)
            {
                
                
            }
            if(toDestroyL)
            {
                
                
            }
            if(toDestroyU)
            {
                
                 
            }
            if(toDestroyD)
            {
                
             
            }

            
    
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
//#endregion

//#region Player
// player construcctor

var Player =(id,x,y)=>{
    var self = Entity();
        self.id=id,
        self.x=x,
        self.y=y,
        // it will be changed to player login name later
        self.number=""+Math.floor(10*Math.random()),
        // controls
        self.pressingRight=false;
        self.pressingLeft=false;
        self.pressingUp=false;
        self.pressingDown=false;
        self.pressingSpace=false;
        self.maxSpd=4;
        self.score=0;
        self.moving=false;
    
    // updating position 
    
    self.updatePositionPlayer=()=>{
        
        var newX=self.x + self.spdX;
        var newY=self.y + self.spdY;
        var canMoveX=true;
        var canMoveY=true;
        
        
        
            
              for(var z in Wall.list )
            {
                var i=Wall.list[z]
                
                if (newX>=i.x-18 &newX<=i.x+18  & newY>=i.y-18 &newY<=i.y+18  )
                {
                    canMoveX=false;
                    canMoveY=false
                    return;
                }
            }
        
      
        
            
            for(var z in Box.list)
        {
            
            var i=Box.list[z]
            if (newX>=i.x-18 &newX<=i.x+18  & newY>=i.y-18 &newY<=i.y+18 )
            {
                canMoveX=false;
                canMoveY=false
                return;
            }
        }
        
        
      
            
            for(var z in Bomb.list)
            {
                var i=Bomb.list[z]
                if (newX>=i.x-5 &newX<=i.x+5  & newY>=i.y-5 &newY<=i.y+5 & (!i.isWalkable))
                {
                    canMoveX=false;
                    canMoveY=false
                    return;
                }
            }
        

        if(canMoveX)
        {
            if(newX>0 & newX<500) 
            self.x=newX;
        }
        if(canMoveY)
       {   if(newY>0 & newY<500) 
           self.y=newY;}
        
    }
    var super_update=self.update;

    self.update=()=>{
        self.updateSpdn();
        super_update();
        self.updatePositionPlayer();
       
        if(self.pressingSpace){
            Bomb(self.id,self.x,self.y);
            console.log('bomba')
        }
    
    }
   

    self.updateSpdn=()=>{
        if(self.pressingRight)
        {
            self.spdX =+self.maxSpd;
            self.moving=true;}
       else if(self.pressingLeft){
            self.spdX =-self.maxSpd;self.moving=true;}
            else {
            self.spdX=0;self.moving=false;}
        if(self.pressingUp){
            self.spdY =-self.maxSpd;self.moving=true;}
        else if(self.pressingDown){
        self.spdY =+self.maxSpd;self.moving=true;}
        else {
        self.spdY=0;self.moving=false;}
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
player_x=[9,9,491,491]

player_y=[48,412,443,48]
map={
    "box":[
        {"x":30,"y":17},{"x":67,"y":17},{"x":130,"y":17},{"x":167,"y":17},{"x":230,"y":17},{"x":267,"y":17},{"x":330,"y":17},{"x":367,"y":17},{"x":430,"y":17},{"x":460,"y":17},
        {"x":30,"y":150},{"x":67,"y":150},{"x":130,"y":150},{"x":167,"y":150},{"x":230,"y":150},{"x":267,"y":150},{"x":330,"y":150},{"x":367,"y":150},{"x":430,"y":150},{"x":460,"y":150},
        {"x":30,"y":250},{"x":67,"y":250},{"x":130,"y":250},{"x":167,"y":250},{"x":230,"y":250},{"x":267,"y":250},{"x":330,"y":250},{"x":367,"y":250},{"x":430,"y":250},{"x":460,"y":250},
        {"x":30,"y":350},{"x":67,"y":350},{"x":130,"y":350},{"x":167,"y":350},{"x":230,"y":350},{"x":267,"y":350},{"x":330,"y":350},{"x":367,"y":350},{"x":430,"y":350},{"x":460,"y":350},
        {"x":30,"y":483},{"x":67,"y":483},{"x":130,"y":483},{"x":167,"y":483},{"x":230,"y":483},{"x":267,"y":483},{"x":330,"y":483},{"x":367,"y":483},{"x":430,"y":483},{"x":460,"y":483},
        {"x":67,"y":48},{"x":100,"y":48},{"x":130,"y":48},{"x":167,"y":48},{"x":200,"y":48},{"x":230,"y":48},{"x":267,"y":48},{"x":300,"y":48},{"x":330,"y":48},{"x":367,"y":48},{"x":430,"y":48},
        {"x":30,"y":79},{"x":67,"y":79},{"x":100,"y":79},{"x":130,"y":79},{"x":167,"y":79},{"x":200,"y":79},{"x":230,"y":79},{"x":267,"y":79},{"x":300,"y":79},{"x":330,"y":79},{"x":367,"y":79},{"x":430,"y":79},{"x":460,"y":79},
        {"x":9,"y":110},{"x":30,"y":110},{"x":67,"y":110},{"x":100,"y":110},{"x":130,"y":110},{"x":167,"y":110},{"x":200,"y":110},{"x":230,"y":110},{"x":267,"y":110},{"x":300,"y":110},{"x":330,"y":110},{"x":367,"y":110},{"x":430,"y":110},{"x":460,"y":110},{"x":491,"y":110},
        {"x":9,"y":181},{"x":30,"y":181},{"x":67,"y":181},{"x":100,"y":181},{"x":130,"y":181},{"x":167,"y":181},{"x":200,"y":181},{"x":230,"y":181},{"x":267,"y":181},{"x":300,"y":181},{"x":330,"y":181},{"x":367,"y":181},{"x":430,"y":181},{"x":460,"y":181},{"x":491,"y":181},
        {"x":9,"y":212},{"x":30,"y":212},{"x":67,"y":212},{"x":100,"y":212},{"x":130,"y":212},{"x":167,"y":212},{"x":200,"y":212},{"x":230,"y":212},{"x":267,"y":212},{"x":300,"y":212},{"x":330,"y":212},{"x":367,"y":212},{"x":430,"y":212},{"x":460,"y":212},{"x":491,"y":212},
        {"x":9,"y":281},{"x":30,"y":281},{"x":67,"y":281},{"x":100,"y":281},{"x":130,"y":281},{"x":167,"y":281},{"x":200,"y":281},{"x":230,"y":281},{"x":267,"y":281},{"x":300,"y":281},{"x":330,"y":281},{"x":367,"y":281},{"x":430,"y":281},{"x":460,"y":281},{"x":491,"y":281},
        {"x":9,"y":312},{"x":30,"y":312},{"x":67,"y":312},{"x":100,"y":312},{"x":130,"y":312},{"x":167,"y":312},{"x":200,"y":312},{"x":230,"y":312},{"x":267,"y":312},{"x":300,"y":312},{"x":330,"y":312},{"x":367,"y":312},{"x":430,"y":312},{"x":460,"y":312},{"x":491,"y":312},
        {"x":9,"y":381},{"x":30,"y":381},{"x":67,"y":381},{"x":100,"y":381},{"x":130,"y":381},{"x":167,"y":381},{"x":200,"y":381},{"x":230,"y":381},{"x":267,"y":381},{"x":300,"y":381},{"x":330,"y":381},{"x":367,"y":381},{"x":430,"y":381},{"x":460,"y":381},{"x":491,"y":381},
        {"x":67,"y":412},{"x":100,"y":412},{"x":130,"y":412},{"x":167,"y":412},{"x":200,"y":412},{"x":230,"y":412},{"x":267,"y":412},{"x":300,"y":412},{"x":330,"y":412},{"x":367,"y":412},{"x":430,"y":412},{"x":460,"y":412},
        {"x":30,"y":443},{"x":67,"y":443},{"x":100,"y":443},{"x":130,"y":443},{"x":167,"y":443},{"x":200,"y":443},{"x":230,"y":443},{"x":267,"y":443},{"x":300,"y":443},{"x":330,"y":443},{"x":367,"y":443},{"x":430,"y":443},
        
    ],
    "wall":[
        {"x":9,"y":17},{"x":100,"y":17},{"x":200,"y":17},{"x":300,"y":17},{"x":491,"y":17},
        {"x":9,"y":150},{"x":100,"y":150},{"x":200,"y":150},{"x":300,"y":150},{"x":491,"y":150},
        {"x":9,"y":250},{"x":100,"y":250},{"x":200,"y":250},{"x":300,"y":250},{"x":491,"y":250},
        {"x":9,"y":350},{"x":100,"y":350},{"x":200,"y":350},{"x":300,"y":350},{"x":491,"y":350},
        {"x":9,"y":483},{"x":100,"y":483},{"x":200,"y":483},{"x":300,"y":483},{"x":491,"y":483},
]
}



Player.onConnect=(socket)=>{
    

   x= player_x[player_count-1]
   y= player_y[player_count-1]
    var player=Player(socket.id,x,y);
console.log(player_count)
   if(player_count==1){
        for(i in map.box){
            Box(map.box[i].x,map.box[i].y)
        }
        for(i in map.wall){
            Wall(map.wall[i].x,map.wall[i].y)
        }
    }
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
    var boxs=[];
    for(var i in Box.list){
        boxs.push({
            id:Box.list[i].id,
            x:Box.list[i].x,
            y:Box.list[i].y,
        })
    }
    var walls=[];
    for(var i in Wall.list){
        walls.push({
            id:Wall.list[i].id,
            x:Wall.list[i].x,
            y:Wall.list[i].y,
        })
    }
    socket.emit('init',{
        player:players,
        bomb:bombs,
        box:boxs,
        wall:walls
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
//#endregion
      
//Hra
//#region Hra
  var io = require('socket.io').listen(server);
  
  // call fcion for new conection 
  io.sockets.on('connection',function(socket){
      // creating socket id
      player_count++
      socket.id= Math.random();
      //adding it to the list
      SOCKET_LIST[socket.id]=socket;
        Player.onConnect(socket);
           

    
      
      
//disxonext
      socket.on('disconnect',()=>{
          delete SOCKET_LIST[socket.id];
         Player.onDisconect(socket);
         player_count--;
         if(player_count==0);
         console.log(player_count)
         for(i in Box.list) {
            var p = Box.list[i];
            p.toRemove=true;
         }
      })
  
     
  });
// beh hry 
  var initPack={player:[],bomb:[],box:[],wall:[]};
  var removePack={player:[],bomb:[],box:[]};


  setInterval(function(){
   
      var pack = {
            player:Player.update(),
            bomb:Bomb.update(),
            box:Box.update(),
            wall:initPack.wall
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
  
  //#endregion
  
