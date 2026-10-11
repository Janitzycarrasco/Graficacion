//Posicion horizontal del pajaro
let x = 300
//Posicion vertical del pajaro
let y = 300
//Cantidad de pixeles que avanzara cuando se mueva 
let desp = 5 
//Guarda la direccion en la que se mueve el pajaro 
let direccion = ""

function setup(){
  createCanvas(800, 800)
}

function draw(){
  background(125)
  //Llama la funcion que dibuja al pajaro en las coordenadas x, y 
  dibujaPajaro(x, y)
}

//Dibuja al pajaro usando las posiciones recibidas 
function dibujaPajaro(px, py){
  //Pajaro, color 
  fill("yellow")
  /*Dibujo arco de 100 pixeles 
  px y py indican su posicion*/ 
  arc(px, py, 100, 100, QUARTER_PI, TWO_PI-QUARTER_PI, PIE)

  //Ojo
  fill("blue")
  circle(px - 17, py - 20, 15)

  //Alas 
  fill("gold")
  ellipse(px - 15, py + 20, 35, 20)
  ellipse(px + 15, py + 20, 35, 20)

  //Pico 
  fill("orange")
  triangle(px + 25, py - 5, px + 55, py + 5, px + 25, py + 15)
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    direccion = "arriba"
  }
  if(keyCode == DOW_ARROW){
    direccion = "abajo"
  }
  if(keyCode == LEFT_ARROW){
    direccion = "izquierda"
  }
  if(keyCode == RIGTH_ARROW){
    direccion = "derecha"
    x += desp
  }

  //Efecto tunel 
  



}