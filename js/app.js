
let cards = [].slice.call(document.querySelectorAll(".deck>li"));
let deck = document.querySelector(".deck");
let opened =[];
let move = document.querySelector(".moves");
let moves = 0;
let restart = document.querySelector(".restart");
let timer = document.querySelector("#timer");
let sec = 0;

setInterval(function(){
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
	timer.textContent = hr + "h " + min + "m " + sec +"s";
}, 1000);

deck.addEventListener("click", function(e){
	console.log(e.target.firstChild.nextSibling.className.split(" ")[1]);
	// e.target.classList.toggle("match");
  	let card = e.target;
  	console.log("whats card?", card.className);
  	let matched = card.className.slice(" ");
  	if(matched.includes("match")){
  		return null;
  	}
	card.classList.toggle("open");
	card.classList.toggle("show");
	console.log(e.target.firstChild);
	opened[moves%2] = card;
	moves++;
	console.log(opened);
	if(opened.length==2){
		match(opened);
	}
	move.textContent = moves;
});

restart.addEventListener("click", function(){
	setUp();
});

setUp();
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

function match(cards){
	console.log("counting cards");
	if(cards[0].firstChild.nextSibling.className.split(" ")[1] == cards[1].firstChild.nextSibling.className.split(" ")[1]){
		console.log(cards[0].firstChild.nextSibling.className.split(" ")[1]);
		console.log(cards[0].firstChild.nextSibling.className.split(" ")[1] == cards[1].firstChild.nextSibling.className.split(" ")[1]);
		cards.forEach(function(card){
			card.classList.toggle("match");
		})
		opened=[];
	}
	else{
		setTimeout(function(){
			cards.forEach(function(card){
				card.classList="card";
			});
		}, 1000);
		cards.forEach(function(card){
			card.classList.toggle("open");
			card.classList.toggle("show");
			card.classList.toggle("unmatch");
		})
		opened=[];
	}
}

function setUp(){
	while(deck.firstChild){
		deck.removeChild(deck.firstChild);
	}
	moves=0;
	shuffle(cards).forEach(function(card){
		card.classList="card";
		deck.appendChild(card);
	})
	console.log(deck, "new deck");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
