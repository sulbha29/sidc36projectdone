class Food {
    constructor(){
    this.foodStock=0
    this.lastFed
    this.image=loadImage('images/milk.png');
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock(){
      return this.foodStock;
    }

    getFedTime(lastFed){
      this.lastFed = lastFed
    }

  
    display(){
      background(46,139,87);
      fill(255,255,254);
      if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 50,30);
    }else if(lastFed==0){
        text("Last Feed : 12 AM",50,30);
    }else{
        text("Last Feed : "+ lastFed + " AM", 50,30);
    }
      var x=80,y=170;
      
      imageMode(CENTER);
   
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10===0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }


    livingroom(){
      background(tvimg,550,500)
    }
    garden(){
      background(gardenimg,550,500)
    }
    washroom(){
      background(washroomimg,550,500)
    }
  }


  