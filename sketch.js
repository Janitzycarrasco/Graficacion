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
//Cuenta el tiempo de la animacion
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
  createCanvas(800, 800);
}

function draw(){
  background(125);

  //Comprueba si el juego termino
  if(juegoTerminado == true){
    background(0);
    fill("red");
    //Centra el texto
    textAlign(CENTER);
    //Tamaño del texto
    textSize(70);
    //Muestra mensaje de game over
    text("GAME OVER", 400, 410);
    return;
  }

  //Cuenta el tiempo de la animacion de las alas
  tiempoAlas++;

  //Comprueba si es momento de cambiar las alas
  if(tiempoAlas >= 10){
    //Cambia la posicion de las alas
    alasArriba = !alasArriba;
    //Reinicia el contador de animacion
    tiempoAlas = 0;
  }

  //Reduce el tiempo de proteccion despues de un golpe
  if(proteccion > 0){
    proteccion--;
  }

  //Comprueba la direccion en la que se mueve el pajaro
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

  //Mueve el pajaro hacia arriba
  if(keyIsDown(UP_ARROW)){
    //Comprueba que no haya un bloque en el camino
    if(!chocaBloque(x, y - desp)){
      y -= desp;
    }
  }

  //Mueve el pajaro hacia abajo
  if(keyIsDown(DOWN_ARROW)){
    //Comprueba que no haya un bloque en el camino
    if(!chocaBloque(x, y + desp)){
      y += desp;
    }
  }

  //Mueve el pajaro hacia la izquierda
  if(keyIsDown(LEFT_ARROW)){
    //Comprueba que no haya un bloque en el camino
    if(!chocaBloque(x - desp, y)){
      x -= desp;
    }
  }

  //Mueve el pajaro hacia la derecha
  if(keyIsDown(RIGHT_ARROW)){
    //Comprueba que no haya un bloque en el camino
    if(!chocaBloque(x + desp, y)){
      x += desp;
    }
  }

  //Evita que el pajaro salga por los lados
  x = constrain(x, 25, 775);
  y = constrain(y, 25, 775);

  //Primer obstaculo
  fill("sienna");
  rect(130, 150, 100, 35);

  //Segundo obstaculo
  fill("sienna");
  rect(480, 300, 100, 35);

  //Tercer obstaculo
  fill("sienna");
  rect(250, 520, 100, 35);

  //Mueve el primer enemigo
  ex1 += vel1;

  //Cambia la direccion al llegar al borde
  if(ex1 >= 760 || ex1 <= 40){
    vel1 *= -1;
  }

  //Mueve el segundo enemigo
  ex2 += vel2;

  //Cambia la direccion al llegar al borde
  if(ex2 >= 760 || ex2 <= 40){
    vel2 *= -1;
  }

  //Dibuja el primer enemigo
  dibujaEnemigo(ex1, ey1);

  //Dibuja al segundo enemigo
  dibujaEnemigo(ex2, ey2);

  //Comprueba si el pajaro toca el primer enemigo
  if(colision(x - 20, y - 20, 40, 40, ex1 - 17, ey1 - 15, 34, 30)){
    //Comprueba si el jugador puede recibir otro golpe
    if(proteccion == 0){
      //Restar una vida
      vidas--;
      //Activa el tiempo de proteccion
      proteccion = 60;
    }
  }

  //Comprueba si el pajaro toca el segundo enemigo
  if(colision(x - 20, y - 20, 40, 40, ex2 - 17, ey2 - 15, 34, 30)){
    //Comprueba si el jugador puede recibir otro golpe
    if(proteccion == 0){
      //Restar una vida
      vidas--;
      //Activa el tiempo de proteccion
      proteccion = 60;
    }
  }

  //Dibuja el pajaro y lo hace parpadear despues de un golpe
  if(proteccion == 0 || frameCount % 10 < 5){
    //Dibuja el personaje en su posicion actual
    dibujaPajaro(x, y);
  }

  //Color para el contador
  fill("pink");
  textAlign(LEFT);
  textSize(25);
  //Muestra las vidas restantes
  text("Vidas: " + vidas, 20, 35);

  //Comprueba si las vidas llegaron a cero
  if(vidas <= 0){
    //Activa pantalla Game Over
    juegoTerminado = true;
  }
}

//Dibuja el pajaro usando las posiciones recibidas
function dibujaPajaro(px, py){
  push();
  translate(px, py);

  //Voltea el pajaro cuando mira hacia la izquierda
  if(direccion == "izquierda"){
    scale(-1, 1);
  }

  //Gira el pajaro cuando va hacia arriba
  if(direccion == "arriba"){
    rotate(-HALF_PI);
  }

  //Gira el pajaro cuando va hacia abajo
  if(direccion == "abajo"){
    rotate(HALF_PI);
  }

  //Color del cuerpo
  fill("yellow");

  //Cuerpo
  arc(0, 0, 100, 100, QUARTER_PI, TWO_PI - QUARTER_PI, PIE);

  //Color del ojo
  fill("blue");
  circle(-17, -20, 15);

  //Color de las alas
  fill("gold");

  //Comprueba si las alas estan levantadas
  if(alasArriba == true){
    //Dibuja el ala izquierda levantada
    ellipse(-15, 15, 35, 12);
    //Dibuja el ala derecha levantada
    ellipse(15, 15, 35, 12);
  }else{
    //Dibuja el ala izquierda bajada
    ellipse(-15, 25, 35, 20);
    //Dibuja el ala derecha bajada
    ellipse(15, 25, 35, 20);
  }

  //Pico
  fill("orange");
  triangle(25, -5, 55, 5, 25, 15);

  pop();
}

//Dibuja los enemigos
function dibujaEnemigo(ex, ey){
  //Cuerpo del enemigo
  fill("saddlebrown");
  ellipse(ex, ey, 34, 30);

  //Cara 
  fill("burlywood");
  ellipse(ex, ey + 5, 22, 15);

  //Ojos
  fill("white");
  circle(ex - 7, ey - 4, 9);
  circle(ex + 7, ey - 4, 9);

  //Pupilas
  fill("black");
  circle(ex - 7, ey - 4, 4);
  circle(ex + 7, ey - 4, 4);

  //Boca
  rect(ex - 8, ey + 8, 16, 3);
}

//Comprueba si el pajaro chocara contra un obstaculo
function chocaBloque(nx, ny){
  //Comprueba la colision con el primer bloque
  if(colision(nx - 20, ny - 20, 40, 40, 130, 150, 100, 35)){
    return true;
  }

  //Comprueba la colision con el segundo bloque
  if(colision(nx - 20, ny - 20, 40, 40, 480, 300, 100, 35)){
    return true;
  }

  //Comprueba la colision con el tercer bloque
  if(colision(nx - 20, ny - 20, 40, 40, 250, 520, 100, 35)){
    return true;
  }
  return false;
}

//Comprueba si dos rectangulos se tocan
function colision(ax, ay, aw, ah, bx, by, bw, bh){
  //Comprueba que los lados horizontales y verticales se crucen
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    direccion = "arriba";
  }

  if(keyCode == DOWN_ARROW){
    direccion = "abajo";
  }

  if(keyCode == LEFT_ARROW){
    direccion = "izquierda";
  }

  if(keyCode == RIGHT_ARROW){
    direccion = "derecha";
  }

  return false;
}