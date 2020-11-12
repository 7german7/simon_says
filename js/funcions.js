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
    this.secuenceCounter = 0;
    this.secuenceByLevel = [];
    this.demoStatus = false;
    this.showCounter = this.showCounter.bind(this);
    this.secuenceByLevelGenerator = this.secuenceByLevelGenerator.bind(this);

    /*Game*/
    this.level = 1;
    this.numericSequence = Array(10).fill(0);
  }

  initialize() {
    buttomStart.classList.add("--hide");
    this.sequenceInitializer();
    this.timeCounterId = setInterval(this.showCounter, 1000);
    this.secuenceByLevelGenerator();
    this.startLevel();
  }

  startLevel() {
    this.startDemo();
    this.eventsCreator();
  }

  startDemo() {
    this.demoStatus = true;
    let demoTimer = setTimeout( () => {
      if (this.secuenceCounter < this.level) {
        console.log("Numero del color: "+this.secuenceByLevel[this.level].secuence[this.secuenceCounter]);
        let color = this.numberToColor(this.secuenceByLevel[this.level].secuence[this.secuenceCounter]);
        this.turnOn(color.element, "--light-"+color.name, "--dark-"+color.name);
        this.secuenceCounter++;
        this.startDemo();
      }
      else {
        this.secuenceCounter = 0;
        this.demoStatus = false;
        clearTimeout(demoTimer);
      }
    },1500);
  }

  changeColor() {
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

  secuenceByLevelGenerator() {
    let secuence = Array(this.level);
    for (let i = 0; i < this.level; i++) {
      secuence[i] = this.numericSequence[i];
    }

    this.secuenceByLevel[this.level] = {
      "level": this.level,
      "secuence": secuence
    };

    if(this.level<MAX_LEVEL) {
      this.level++;
      this.secuenceByLevelGenerator();
    }
    else {
      this.level = 1;
    }
  }

  eventsCreator() {
    red.addEventListener("click", () => this.checkSecuence(red, "--light-red", "--dark-red"));
    green.addEventListener("click", () => this.checkSecuence(green, "--light-green", "--dark-green"));
    yellow.addEventListener("click", () => this.checkSecuence(yellow, "--light-yellow", "--dark-yellow"));
    blue.addEventListener("click", () => this.checkSecuence(blue, "--light-blue", "--dark-blue"));
  }

  turnOn(element , colorOn, colorOff) {
    element.classList.add(colorOn);
    element.classList.remove(colorOff);
    setTimeout( function () {
      element.classList.remove(colorOn);
      element.classList.add(colorOff);
    },1000, element , colorOn, colorOff);
  }

  checkSecuence(element , colorOn, colorOff) {
    let colorClick = element.getAttribute("data-color");
    let colorSecuence = this.numberToColor(this.secuenceByLevel[this.level].secuence[this.secuenceCounter]);
    if(colorClick.toString()==colorSecuence.name.toString()) {
      this.secuenceCounter++;
      console.log("Bien");
      if(this.level==this.secuenceCounter) {
        if(this.level!=MAX_LEVEL) {
          console.log("Siguiente Nivel");
          this.level++;
          this.secuenceCounter = 0;
          this.startDemo();
        }
        else {
          clearInterval(this.timeCounterId);
          alert("Has ganado el juego");
          let response = confirm("¿Desea iniciar otra partida?");
          if(response) {
            document.location.reload();
          }
        }
      }
    }
    else {
      clearInterval(this.timeCounterId);
      alert("Has perdido");
      document.location.reload();
    }
    this.turnOn(element , colorOn, colorOff);
  }

  numberToColor(number) {
    switch (number) {
      case 0:
        return {
          "name": "red",
          "element": red
        };
    
      case 1:
        return {
          "name": "green",
          "element": green
        };

      case 2:
        return {
          "name": "yellow",
          "element": yellow
        };

      case 3:
        return {
          "name": "blue",
          "element": blue
        };
    }
  }
}

function createGame() {
  let game = new Game;
  game.initialize();
}