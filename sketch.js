//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogimg,happyDogimg
var lastFed,foodObj,FeedTime,addFood, currentTime
var gameState, readState
function preload()
{
  //load images here
  dogimg = loadImage("dog.png")
  happyDogimg = loadImage("happydog.png");
  gardenimg = loadImage("images/Garden.png");
  tvimg = loadImage("images/Living_Room.png")
  washroomimg = loadImage("images/Wash_Room.png")

}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog = createSprite(250,250,10,10)
  dog.addImage(dogimg)
  dog.scale = 0.1

  feed = createButton("Feed the dog")
  feed.position(550,95);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

foodStock = database.ref('Food');
foodStock.on("value",readStock);
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
readState = database.ref("gameState");
readState.on('value',function(data){
  gameState = data.val()

})
}


function draw() {  
  currentTime = hour()
  if(currentTime===(lastFed+1)){
    update('playing')

    foodObj.garden()
  }

else if(currentTime===(lastFed+2)){
  update('sleeping')
  foodObj.livingroom()
}

else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update('washroom')
  foodObj.washroom()
}
else {
  update('hungry')
  foodObj.display()
}

if(gameState!=='hungry'){
  feed.hide()
  addFood.hide()
  dog.remove()
}

else{
  feed.show()
  addFood.show()
  dog.addImage(dogimg)
}



  drawSprites();
}


function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDogimg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
database.ref('/').update({
  gameState:state
})
}


