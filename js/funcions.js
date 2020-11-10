const buttomStart = document.getElementById("buttomStart");
const timer = document.getElementById("timer");
const red = document.getElementById("red");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

const MAX_LEVEL = 10;


class Game {
  constructor() {
    /*Timer*/
    this.counter = 0;
    this.showCounter = this.showCounter.bind(this);
    this.secuenceByLevel = this.secuenceByLevel.bind(this);
    this.colorChanger = this.colorChanger.bind(this);

    /*Game*/
    this.level = 1;
    this.numericSequence = Array(10).fill(0);

    /*Colores*/
    this.colors = {
      red,
      green,
      yellow,
      blue
    };
  }

  initialize() {
    buttomStart.classList.add("--hide");
    this.sequenceInitializer();
    this.timeCounterId = setInterval(this.showCounter, 1000);
    this.colorTimer = setTimeout(this.secuenceByLevel, 2000);
  }

  sequenceInitializer() {
    for(let i=0; i<this.numericSequence.length; i++){
      this.numericSequence[i] = Math.floor(Math.random() * 4);
    }
  }

  showCounter() {
    this.counter++;
    timer.innerHTML = this.counter+" secs";
  }

  secuenceByLevel() {
    let secuence = Array(this.level);
    console.log("Nivel: "+this.level);
    for (let i = 0; i < this.level; i++) {
      secuence[i] = this.numericSequence[i];
    }
    console.log(secuence);
    this.colorChanger(secuence);
    // if(this.level<MAX_LEVEL) {
    //   this.level++;
    //   setTimeout(this.secuenceByLevel, 2000);
    // }
    // else {
    //   clearInterval(this.colorTimer);
    // }
  }

  colorChanger(secuence) {
    let counter = 0;
    let newThis = this;
    let colorChangerTimer = setInterval(function () {
      if(counter < secuence.length) {
        let color = newThis.numberToColor(secuence[counter]);
        let darkColor = "--dark-"+color;
        let lightColor = "--light-"+color;
        newThis.colorElement(color).classList.remove(darkColor);
        newThis.colorElement(color).classList.add(lightColor);
        counter++;
      }
      else {
        console.log("Se limpio el tiempo");
        clearInterval(colorChangerTimer);
      }
    },1000, newThis);
  }

  colorElement(color) {
    switch (color) {
      case "red":
        return this.colors.red;
    
      case "green":
        return this.colors.green;

      case "yellow":
        return this.colors.yellow;

      case "blue":
        return this.colors.blue;
    }
  }

  numberToColor(number) {
    switch (number) {
      case 0:
        return "red";
    
      case 1:
        return "green";

      case 2:
        return "yellow";

      case 3:
        return "blue";
    }
  }
}


function createGame() {
  let game = new Game;
  game.initialize();
}