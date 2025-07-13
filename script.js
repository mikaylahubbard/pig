//load Dom
const restart_btn= document.getElementById("restartButton");
const p1Score_p = document.getElementById("p1Score");
const p2Score_p = document.getElementById("p2Score");
const currentPlayer_p = document.getElementById("currentPlayer");
const die_img = document.getElementById("die");
const roll_btn = document.getElementById("rollButton");
const hold_btn = document.getElementById("holdButton");
const CurrentSum_p = document.getElementById("currentSum");
const currentPlayer_div = document.getElementById("currentPlayerDiv");

restart_btn.addEventListener('click',() => restartGame());

function restartGame() {

  //reenable buttons if coming from a win/freeze
  roll_btn.disabled = false;
  hold_btn.disabled = false;
 
  //set initial values
  var p1Score = 0;
  var p2Score = 0;
  var currentSum = 0;
  var winningNum = 100;

  //set the current player to p1
  let currentPlayer = 1;
  currentPlayer_div.classList.remove("light-pink")
  changeColor();

  //display initial values/setup
  p1Score_p.innerHTML = p1Score;
  p2Score_p.innerHTML = p2Score;
  currentPlayer_p.innerHTML = "Player: " + currentPlayer;
  CurrentSum_p.innerHTML = currentSum;
  die_img.src = "img/d0.jpg";
  restart_btn.innerHTML = "Restart Game";

  //allow die to be rolled
  //die_img.addEventListener('click',() => rollDie());
  //I took this out because I couldn't find a way to disable it when the game ends
  roll_btn.addEventListener('click',() => rollDie());
  hold_btn.addEventListener('click',() => hold());

  
 
  //switch the value of currentPlayer
  //instead of changing the name of it, maybe chage the class, so it can be on different sides
  function switchPlayer() {
    if (currentPlayer == 1) {
      currentPlayer = 2;

      
    }
    else if (currentPlayer == 2) {
      currentPlayer = 1;
    }
    currentPlayer_p.innerHTML = "Player: " + currentPlayer;
    changeColor();
  };

  function changeColor() {
    if (currentPlayer == 1) {
      currentPlayer_div.classList.remove("p2");
      currentPlayer_div.classList.add("p1");
    } else if (currentPlayer == 2){
      currentPlayer_div.classList.remove("p1");
      currentPlayer_div.classList.add("p2");
    }
  };


  function hold() {
    if (currentPlayer == 1) {
      p1Score += currentSum;
      p1Score_p.innerHTML = p1Score;
    }
    else if (currentPlayer == 2) {
      p2Score += currentSum;
      p2Score_p.innerHTML = p2Score;
    }
    switchPlayer();
    currentSum = 0;
    CurrentSum_p.innerHTML = currentSum;
    checkWins();
  };

  function rollOne() {
    switchPlayer();
    currentSum = 0;
    CurrentSum_p.innerHTML = currentSum;

  };

  //if a player reaches the winning number of points, they win
  function checkWins() {
    if (p1Score >= winningNum) {
      currentPlayer_p.innerHTML = "Player 1 WINS!"
      currentPlayer_div.classList.remove("p2");
      currentPlayer_div.classList.add("p1");
      freeze();
    }
    else if (p2Score >= winningNum) {
      currentPlayer_p.innerHTML = "Player 2 WINS!"
      currentPlayer_div.classList.remove("p1");
      currentPlayer_div.classList.add("p2");
      freeze();
    }
  };

  function freeze() {
    roll_btn.disabled = true;
    hold_btn.disabled = true;
  };


//Code for dice Roll

    //integer between 1 and 6
    function myRandom(upperValue, lowerValue) {
        upperValue++; //adds 1 so the top value is accurate
        return Math.floor(Math.random()*upperValue) + lowerValue;
      };
    
    function rollDie() { 
      var randomNum = myRandom(5,1);
        console.log(randomNum)
      var source;
      switch(randomNum) {
        case 0: 
        source = "img/d0.jpg";
        break;
        case 1: 
        source = "img/d1.jpg";
        break;
        case 2: 
        source= "img/d2.jpg";
        break;
        case 3: 
        source = "img/d3.jpg";
        break;
        case 4: 
        source = "img/d4.jpg";
        break;
        case 5: 
        source = "img/d5.jpg";
        break;
        case 6: 
        source = "img/d6.jpg";
        break;
        default:
        source = "img/d0.jpg";
      };
      if (randomNum != 1) {
        currentSum += randomNum;
        CurrentSum_p.innerHTML = currentSum;
      } else {
        rollOne();
      }
      die_img.src = source;
      //update currentSum
    };

   
  }
    

