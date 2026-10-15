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

//Controla el pico del pajaro
let picoAbierto = false;
let tiempoPico = 0;

//Comida del pajaro
let gusano = true;
let manzana = true;
let hoja = true;

//Posicion de la comida
let gx = 350;
let gy = 100;

let mx = 650;
let my = 400;

let hx = 400;
let hy = 680;

//Controla cada cuanto aparece comida
let tiempoComida = 0;

//Posicion horizontal del primer enemigo
let ex1 = 100;
//Posicion vertical del primer enemigo
let ey1 = 200;
//Velocidad del primer enemigo
let vel1 = 2;
let velY1 = 2;

//Posicion horizontal del segundo enemigo
let ex2 = 650;
//Posicion vertical del segundo enemigo
let ey2 = 550;
//Velocidad del segundo enemigo
let vel2 = 2;
let velY2 = 2;

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(125);

  //Comprueba si el juego termino
  if(juegoTerminado == true){
    background(0);
    fill("red");
    textAlign(CENTER);
    textSize(70);
    text("GAME OVER", width / 2, height / 2);
    return;
  }

  //Cuenta el tiempo para generar comida
  tiempoComida++;

  //Aparece comida nueva cada 3 segundos aproximadamente
  if(tiempoComida >= 180){

    //Genera un gusano en una posicion aleatoria
    gx = random(40, width - 40);
    gy = random(60, height - 40);
    gusano = true;

    //Genera una manzana en una posicion aleatoria
    mx = random(40, width - 40);
    my = random(60, height - 40);
    manzana = true;

    //Genera una hoja en una posicion aleatoria
    hx = random(40, width - 40);
    hy = random(60, height - 40);
    hoja = true;

    //Reinicia el contador
    tiempoComida = 0;
  }

  //Cuenta el tiempo de la animacion de las alas
  tiempoAlas++;

  //Comprueba si es momento de cambiar las alas
  if(tiempoAlas >= 10){
    alasArriba = !alasArriba;
    tiempoAlas = 0;
  }

  //Abre y cierra el pico
  tiempoPico++;

  if(tiempoPico >= 12){
    picoAbierto = !picoAbierto;
    tiempoPico = 0;
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
    if(!chocaBloque(x, y - desp)){
      y -= desp;
    }
  }

  //Mueve el pajaro hacia abajo
  if(keyIsDown(DOWN_ARROW)){
    if(!chocaBloque(x, y + desp)){
      y += desp;
    }
  }

  //Mueve el pajaro hacia la izquierda
  if(keyIsDown(LEFT_ARROW)){
    if(!chocaBloque(x - desp, y)){
      x -= desp;
    }
  }

  //Mueve el pajaro hacia la derecha
  if(keyIsDown(RIGHT_ARROW)){
    if(!chocaBloque(x + desp, y)){
      x += desp;
    }
  }

  //Evita que el pajaro salga de la pantalla
  x = constrain(x, 25, width - 25);
  y = constrain(y, 25, height - 25);

  //Primer obstaculo
  fill("sienna");
  rect(width * 0.16, height * 0.19, 100, 35);

  //Segundo obstaculo
  fill("sienna");
  rect(width * 0.60, height * 0.38, 100, 35);

  //Tercer obstaculo
  fill("sienna");
  rect(width * 0.31, height * 0.65, 100, 35);

  //Dibuja el gusano
  if(gusano == true){
    textSize(35);
    textAlign(CENTER);
    text("🐛", gx, gy);

    //Comprueba si el pajaro come el gusano
    if(abs(x - gx) < 35 && abs(y - gy) < 35){
      gusano = false;
      picoAbierto = true;
      tiempoPico = 0;
    }
  }

  //Dibuja la manzana
  if(manzana == true){
    textSize(35);
    textAlign(CENTER);
    text("🍎", mx, my);

    //Comprueba si el pajaro come la manzana
    if(abs(x - mx) < 35 && abs(y - my) < 35){
      manzana = false;
      picoAbierto = true;
      tiempoPico = 0;
    }
  }

  //Dibuja la hoja
  if(hoja == true){
    textSize(35);
    textAlign(CENTER);
    text("🍃", hx, hy);

    //Comprueba si el pajaro come la hoja
    if(abs(x - hx) < 35 && abs(y - hy) < 35){
      hoja = false;
      picoAbierto = true;
      tiempoPico = 0;
    }
  }

  //Mueve el primer enemigo horizontalmente
  ex1 += vel1;

  if(ex1 >= width - 40 || ex1 <= 40){
    vel1 *= -1;
  }

  //Mueve el primer enemigo verticalmente
  ey1 += velY1;

  if(ey1 >= height - 40 || ey1 <= 40){
    velY1 *= -1;
  }

  //Mueve el segundo enemigo horizontalmente
  ex2 += vel2;

  if(ex2 >= width - 40 || ex2 <= 40){
    vel2 *= -1;
  }

  //Mueve el segundo enemigo verticalmente
  ey2 += velY2;

  if(ey2 >= height - 40 || ey2 <= 40){
    velY2 *= -1;
  }

  //Dibuja el primer enemigo
  dibujaEnemigo(ex1, ey1);

  //Dibuja al segundo enemigo
  dibujaEnemigo(ex2, ey2);

  //Comprueba si el pajaro toca el primer enemigo
  if(colision(x - 20, y - 20, 40, 40,
  ex1 - 17, ey1 - 15, 34, 30)){
    if(proteccion == 0){
      vidas--;
      proteccion = 60;
    }
  }

  //Comprueba si el pajaro toca el segundo enemigo
  if(colision(x - 20, y - 20, 40, 40,
  ex2 - 17, ey2 - 15, 34, 30)){
    if(proteccion == 0){
      vidas--;
      proteccion = 60;
    }
  }

  //Dibuja el pajaro y lo hace parpadear despues de un golpe
  if(proteccion == 0 || frameCount % 10 < 5){
    dibujaPajaro(x, y);
  }

  //Color para el contador
  fill("pink");
  textAlign(LEFT);
  textSize(25);
  text("Vidas: " + vidas, 20, 35);

  //Comprueba si las vidas llegaron a cero
  if(vidas <= 0){
    juegoTerminado = true;
  }
}

//Dibuja el pajaro
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

  noStroke();

  //Contorno negro del cuerpo
  fill("black");
  rect(-27, -15, 8, 24);
  rect(-19, -23, 27, 8);
  rect(-11, -31, 27, 8);
  rect(5, -23, 16, 8);
  rect(13, -15, 8, 24);
  rect(5, 9, 16, 8);
  rect(-11, 17, 24, 8);
  rect(-19, 9, 8, 8);
  rect(-27, 1, 8, 8);

  //Cuerpo amarillo
  fill("yellow");
  rect(-19, -15, 8, 24);
  rect(-11, -23, 19, 8);
  rect(-3, -31, 8, 8);
  rect(5, -15, 8, 24);
  rect(-11, 9, 24, 8);
  rect(-19, 1, 8, 8);
  rect(-11, -7, 24, 16);

  //Parte naranja del cuerpo
  fill("orange");
  rect(5, 1, 8, 8);
  rect(-3, 9, 16, 8);

  //Ojo blanco con contorno negro
  fill("black");
  rect(0, -25, 24, 24);

  fill("white");
  rect(5, -20, 14, 14);

  //Pupila
  fill("black");
  rect(13, -16, 6, 10);

  //Ala animada
  fill("black");

  if(alasArriba == true){
    rect(-19, 0, 19, 16);
    fill("orange");
    rect(-11, 4, 11, 8);
  }else{
    rect(-19, 5, 19, 16);
    fill("orange");
    rect(-11, 9, 11, 8);
  }

  //Pico negro
  fill("black");

  if(picoAbierto == true){
    //Pico abierto
    rect(13, -5, 16, 8);
    rect(21, 3, 16, 8);
    rect(29, 11, 8, 8);

    //Parte superior del pico
    fill("orange");
    rect(16, -2, 16, 3);

    //Parte inferior del pico
    fill("orangered");
    rect(24, 6, 11, 3);
  }else{
    //Pico cerrado
    rect(13, -5, 24, 16);
    fill("orange");
    rect(16, -2, 19, 8);
  }

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
  if(colision(nx - 20, ny - 20, 40, 40,
  width * 0.16, height * 0.19, 100, 35)){
    return true;
  }

  //Comprueba la colision con el segundo bloque
  if(colision(nx - 20, ny - 20, 40, 40,
  width * 0.60, height * 0.38, 100, 35)){
    return true;
  }

  //Comprueba la colision con el tercer bloque
  if(colision(nx - 20, ny - 20, 40, 40,
  width * 0.31, height * 0.65, 100, 35)){
    return true;
  }

  return false;
}

//Comprueba si dos rectangulos se tocan
function colision(ax, ay, aw, ah, bx, by, bw, bh){
  return ax < bx + bw && ax + aw > bx &&
  ay < by + bh && ay + ah > by;
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

//Ajusta el juego cuando cambia el tamaño de la ventana
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}