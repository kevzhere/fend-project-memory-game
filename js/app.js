
// let cards = [].slice.call(document.querySelectorAll(".deck>li")),
let deckBuilder = document.querySelector(".deck"),
			opened =[],
			move = document.querySelector(".moves"),
			moves = 0,
			restart = document.querySelector(".restart"),
			timer = document.querySelector("#timer"),
			sec = 0,
			pairs = 0,
			stars = [].slice.call(document.querySelectorAll(".stars>li")),
			modal = document.querySelector(".modal"),
			tryAgain = document.querySelector(".tryAgain"),
			timeCounter,
			gameMode = document.querySelector("#selectGame"),
			gameDeck = [];

let deck= ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle",
			"fa-bomb", "fa-bell-o", "fa-bug", "fa-cubes", "fa-crosshairs", "fa-flag", "fa-plane",
			"fa-tags", "fa-tree", "fa-wrench", "fa-unlock-alt", "fa-exclamation-triangle", "fa-thumbs-up", "fa-rocket"];
//setup initial game
setUp();

tryAgain.addEventListener("click", function(){
	setUp();
	modal.style.display="none";
});

//timer
function time(){
	 timeCounter = setInterval(function(){
			sec++;
			let min = Math.floor(sec/60);
			let hr = Math.floor(min/60);
			if(sec < 10){
				sec = "0" + sec;
			}
			if(min < 10){
				min = "0" + min;
			}
			if(hr < 10){
				hr = "0" + hr;
			}
			timer.textContent = hr + "h " + min + "m " + sec % 60 +"s";
		}, 1000);
}

deckBuilder.addEventListener("click", function(e){
	const target = [].slice.call(e.target.classList);
  	if(target.includes("card") && !target.includes("touched")){
	  	let card = e.target;
	  	let matched = card.className.slice(" ");
	  	if(matched.includes("match")){
	  		return null;
	  	}
		card.classList.toggle("open");
		card.classList.toggle("show");
		card.classList.toggle("touched");
		opened[moves%2] = card;
		moves++;
		if(opened.length==2){
			match(opened);
		}
		move.textContent = moves;
		updateRating();
	}
});

//update star rating
function updateRating(){
	if((pairs != 0 && pairs/moves < 0.05) || (moves > 10 && pairs == 0)){
		stars[2].firstChild.classList="fa fa-star-o";
		if((pairs != 0 && pairs/moves < 0.025) || (moves > 16 && pairs == 0)){
			stars[1].firstChild.classList="fa fa-star-o";
		}
	}
}

restart.addEventListener("click", function(){
	setUp();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//check if cards match
function match(cards){
	if(cards[0].firstChild.className.split(" ")[1] == cards[1].firstChild.className.split(" ")[1]){
		cards.forEach(function(card){
			card.classList.toggle("match");
		})
		opened=[];
		pairs++;
	}
	else{
		setTimeout(function(){
			cards.forEach(function(card){
				if(+gameMode.value == 6){
					card.classList = "card modeTwo";
				}
				else
				card.classList="card";
			});
		}, 500);
		cards.forEach(function(card){
			card.classList.toggle("open");
			card.classList.toggle("show");
			card.classList.toggle("unmatch");
		})
		opened=[];
	}
	finishModal();

}

//updates rating
function finishModal(){
	if (pairs == 8){
		modal.style.display="block";
		let rating = document.querySelector(".rating");
		stars.forEach(function(star){
			rating.appendChild(star);
		});
		let time = document.querySelector(".time");
		time.textContent = timer.textContent;
		let endMoves = document.querySelector(".moves");
		console.log(moves);
		let fastTime = document.querySelector(".fastTime");
		let lastTime = localStorage.getItem("fastTime");
		if(+lastTime > sec || lastTime == null){
			fastTime.textContent = `Congradulations! your new fastest time is ${sec} seconds!!`;
			localStorage.setItem("fastTime", sec);
		}
		else{
			fastTime.textContent = `${lastTime} seconds!`;
		}
		clearInterval(timeCounter);
	}
}

//setup game
function setUp(){
	clearInterval(timeCounter);
	gameDeck = [];
	while(deckBuilder.firstChild){
		deckBuilder.removeChild(deckBuilder.firstChild);
	}
	let newStars = document.querySelector(".stars");
	stars[1].firstChild.classList="fa fa-star";
	stars[2].firstChild.classList="fa fa-star";
	for(let i = 0; i < stars.length; i++){
		newStars.appendChild(stars[i]);
	}
	moves=0;
	let halfDeck = Math.pow(gameMode.value, 2) / 2;
	for(let i = 0; i < halfDeck; i++){
		gameDeck[i] = deck[i];
		gameDeck[i + halfDeck] = deck[i];
	}
	shuffle(gameDeck).forEach(function(card){
		let li = document.createElement("li"),
			i = document.createElement("i");
		li.classList = "card";
		i.classList = `fa ${card}`;
		li.appendChild(i);
		if(halfDeck > 8){
			li.classList.toggle("modeTwo");
		}
		deckBuilder.appendChild(li);
	});
	sec = 0;
	timer.textContent = "00h 00m 00s";
	move.textContent = moves;
	pairs = 0;
	time();
}

function updateGame(){

	setUp();
}