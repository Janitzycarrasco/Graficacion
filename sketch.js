//Posicion horizontal del pajaro
let x = 300
//Posicion vertical del pajaro
let y = 300
//Cantidad de pixeles que avanzara cuando se mueva 
let desp = 5 
//Guarda la direccion en la que se mueve el pajaro 
let direccion = ""

//Guardar vidas del jugador 
let vidas = 3;
//Indica si el juego termino 
let juegoTerminado = false;
//Controla las alas 
let alasArriba = true;
//Cuenta el timpo de la animacion 
let tiempoAlas = 0;
//Evita perder vidas seguidas al tocar un enemigo 
let proteccion = 0;

//Posicion horizontal del primer enemigo 
let ex1 = 100;
//Posicion vertical del primer enemigo 
let ey1 = 200;
//Velocidad del primer enemigo 
let vel1 = 2;

//Posicion horizontal del segundo enemigo 
let ex2 = 650;
//Posicion vertical del segundo enemigo 
let ey2 = 550;
//Velocidad del segundo enemigo 
let vel2 = 2;

function setup(){
  createCanvas(800, 800)
}

function draw(){
  background(125)
  //Comprueba si el juego termino 
  if(juegoTerminado == true){
    background(0);
    fill(red);
    //Centra el texto 
    textAling(CENTER);
    //Tamaño del texto
    textSize(70);
    //Muestra mensaje de game over
    text("GAME OVER", 400, 410);
    return;
  }
  //Cuenta el timpo de la animacion de las alas 
  tiempoAlas ++;

  //Comprueba si es momento de cambiar las alas 
  if(tiempoAlas >=10){
    //Cambia la posicion de las alas 
    alasArriba = !alasArriba;
    //Reinicia el contador de animacion 
    tiempoAlas = 0;
  }

  //Reduce el tiempo de proteccion despues de un golpe 
  if(proteccion > 0){
    proteccion--;
  }

  if(keyIsDown(UP_ARROW)){
    direccion = "arriba";
  }

  if(keyIsDown(DOWN_ARROW)){
    direccion = "abajo";
  }

  if(keyIsDown(LEFT_ARROW)){
    direccion = "izquierda";
  }

  if(keyIsDown(RIGHT_ARROW)){
    direccion = "derecha";
  }


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
  if(keyCode == DOWN_ARROW){
    direccion = "abajo"
  }
  if(keyCode == LEFT_ARROW){
    direccion = "izquierda"
  }
  if(keyCode == RIGHT_ARROW){
    direccion = "derecha"
    x += desp
  }

  //Efecto tunel 

  



}