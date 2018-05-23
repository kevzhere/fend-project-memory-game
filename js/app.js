
let cards = [].slice.call(document.querySelectorAll(".deck>li"));
let deck = document.querySelector(".deck");
let opened =[];
let move = document.querySelector(".moves");
let moves = 0;
let restart = document.querySelector(".restart");
let timer = document.querySelector("#timer");
let sec = 0;
let pairs = 0;
let stars = [].slice.call(document.querySelectorAll(".stars>li"));
let modal = document.querySelector(".modal");
let tryAgain = document.querySelector(".tryAgain");
let timeCounter;

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

deck.addEventListener("click", function(e){
  	if([].slice.call(e.target.classList).includes("card")){
	  	let card = e.target;
	  	let matched = card.className.slice(" ");
	  	if(matched.includes("match")){
	  		return null;
	  	}
		card.classList.toggle("open");
		card.classList.toggle("show");
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
		if((pairs != 0 && pairs/moves < 0.005) || (moves > 16 && pairs == 0)){
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
	if(cards[0].firstChild.nextSibling.className.split(" ")[1] == cards[1].firstChild.nextSibling.className.split(" ")[1]){
		cards.forEach(function(card){
			card.classList.toggle("match");
		})
		opened=[];
		pairs++;
	}
	else{
		setTimeout(function(){
			cards.forEach(function(card){
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
		clearInterval(timeCounter);
	}
}

//setup game
function setUp(){
	clearInterval(timeCounter);
	while(deck.firstChild){
		deck.removeChild(deck.firstChild);
	}
	let newStars = document.querySelector(".stars");
	stars[1].firstChild.classList="fa fa-star";
	stars[2].firstChild.classList="fa fa-star";
	for(let i = 0; i < stars.length; i++){
		newStars.appendChild(stars[i]);
	}
	moves=0;
	shuffle(cards).forEach(function(card){
		card.classList="card";
		deck.appendChild(card);
	});
	sec = 0;
	timer.textContent = "00h 00m 00s";
	move.textContent = moves;
	time();
}