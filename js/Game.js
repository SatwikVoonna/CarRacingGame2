class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    Player1 = createSprite(100,200);
    Player1.addImage("Player1",Player1_img);
    Player2 = createSprite(300,200);
    Player2.addImage("Player2",Player2_img);
    Player3 = createSprite(500,200);
    Player3.addImage("Player3",Player3_img);
    Player4 = createSprite(700,200);
    Player4.addImage("Player4",Player4_img);
    Players = [Player1, Player2, Payer3, Player4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(battleGround, 0,displayHeight,displayWidth, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 245;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4300){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateCarsAtEnd(player.rank);
      fill("white");
      textSize(25);
      text("Your Rank:" + player.rank,displayWidth/2 - 50, y-12);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
