//Create variables here
var dog;
var dogImage, dogImage2;
var foodS,foodStock;
var database; 
var fedTime, lastFed;
var foodObj;  

function preload(){
  dogImage=loadImage("images/dogImg.png")
  dogImage2=loadImage("images/dogImg1.png")
}

function setup(){
  createCanvas(500,500);
  database = firebase.database(); 

  foodObj= new Food();

  foodStock=database.ref("food"); 
  foodStock.on("value",readStock);
  
  dog=createSprite(250,250,20,20);
  dog.scale=0.25;
  dog.addImage(dogImage);

  feed=createButton("Feed thee dog!!")
  feed.position(490,55)
  feed.mousePressed(feedDog)

  addFood=createButton("Add them Food")
  addFood.position(610,55)
  addFood.mousePressed(addFood)
}


function draw() {  
  background(46,139,87); 

  foodObj.display();



  
 drawSprite();
}


function readStock(data){
  
  foodS=data.val();
  foodObj.updateFoodStock (foodS)

}

function feedDog(){
  dog.addImage(dogImage2);
  if(foodObj.getFoodStock() <=0){
    foodObj.updateFoodStock (0)

  }
  else{
    foodObj.updateFoodStock (foodObj.getFoodStock()-1)

  }

}

function addFood(){

  foodS++
  database.ref("/").update({
    food : foods
  })

}




