$('document').ready(function(){
 //Global Variables

 	//questions
	var question1 = {
		question: 'How many three point shots did Steph Curry make when he broke the single season record?',
		correct: '402',
		incorrect1: '324',
		incorrect2: '286',
		congrats:'steph.gif',
		ctext:'"Success is not an accident, success is actually a choice." - Stephen Curry',
		wrong:'stephFail.gif',
		wtext: '"If you don\'t fall, how are you going to know what getting up is like." - Stephen Curry'
	};
	var question2 = {
		question: 'Which Golden State Warrior scored 37 points in a quarter?',
		correct: 'Klay Thompson',
		incorrect1: 'Stephen Curry',
		incorrect2: 'Kevin Durant',
		congrats:'klay.gif',
		ctext:'"I was trying to shoot until I missed, it was one of those nights where everything felt good." - Klay Thompson',
		wrong:'klayFail.gif',
		wtext: '"It\'s either win the whole thing or bust for us. I mean, it\'s no fun getting second place." - Klay Thompson'
	};
	var question3 = {
		question: 'Which Golden State Warrior was called a cupcake?',
		correct: 'Kevin Durant',
		incorrect1: 'Draymond Green',
		incorrect2: 'Patrick McCaw',
		congrats:'durant.webp',
		ctext:'"My time is now." - Kevin Durant',
		wrong:'durantFail.gif',
		wtext: '“I\’ve been second my whole life. I was the second best player in high school. I was the second pick in the draft. I\’ve been second in MVP voting three times. I came second in the finals. I\’m tired of being second… I\’m done with it.” – Kevin Durant'
	};
	var question4 = {
		question: 'Which Golden State Warrior had a triple double that didn\'t include points?',
		correct: 'Draymond Green',
		incorrect1: 'Andre Iguadala',
		incorrect2: 'Javale McGee',
		congrats:'draymond.gif',
		ctext:'I refuse to be outworked, and I consider myself to have the heart of a lion." - Draymond Green',
		wrong:'draymondFail.gif',
		wtext: '"I\'m human, and I make mistakes." - Draymond Green'
	};
	var question5 = {
		question: 'How many three-pointers did the Warriors make when they broke the single game record?',
		correct: '13',
		incorrect1: '10',
		incorrect2: '15',
		congrats:'three.gif',
		ctext:'For three, and it\'s good.',
		wrong:'threeFail.webp',
		wtext: 'Air ball!'
	};
	var question6 = {
		question: 'Which coach has the most wins in a three year span?',
		correct: 'Steve Kerr',
		incorrect1: 'Greg Popovich',
		incorrect2: 'Phil Jackson',
		congrats:'coach.gif',
		ctext:'"I can\'t believe how lucky I am." - Steve Kerr',
		wrong:'coachFail.gif',
		wtext: '"Don\'t think shoot. Soon as you start thinking you miss." - Steve Kerr'
	};
	var questions = {question1: question1, 
					 question2: question2,
					 question3: question3,
					 question4: question4,
					 question5: question5,
					 question6: question6
	};
	var inputArray = ['correct', 'incorrect1', 'incorrect2'];

	//counters
	var correctAns = 0;
	var incorrectAns = 0;
	var unansweredAns = 0;

	//question counter
	var counter = 0;
	var currentIndex = 0;

	//switch
	var answered = false;

	//time counter
	var time = 90;
	var timeHolder;

 //Start trivia game
	$('#start').click(function(){
		app(Object.keys(questions),0);
		
	});

//===================================================
//functions
	//Create Question
	function app(keyArray, currentIndex) {
		let currentQ = questions[keyArray[currentIndex]];

			//reset answer
			answered = false;

			//increase question counter
			counter++;
			console.log(counter);

			//randomize inputArray
			let qArray = new Array();
			randomArray(qArray);

			//write the html to display the question and options
			let questionPrint = `<p class="question">${currentQ.question}</p>
								 <p id="time">Time: ${time}</p>
								 <br/>
								 <button class="option btn btn-secondary" result="${qArray[0]}"> ${currentQ[qArray[0]]} </button></br>
								 <button class="option btn btn-secondary" result="${qArray[1]}"> ${currentQ[qArray[1]]} </button></br>
								 <button class="option btn btn-secondary" result="${qArray[2]}"> ${currentQ[qArray[2]]} </button>`;

			console.log(questionPrint);

			$('#slide').html(questionPrint);
			//setTimeout for the questionPrint of slide
				let timeSpan = 90;
				timeHolder = setInterval( ()=>{$('#time').html(`Time: ${timeSpan--}`);
					if(timeSpan===0) {
						console.log(currentIndex);
						currentIndex++;
						console.log(currentIndex);
						timeoutSlide(currentQ, Object.keys(questions),currentIndex++); 
					}
					},1000);

			// choose the answer and is it right or wrong
			$('#slide').off('click', '.option');
			$('#slide').on('click', '.option', placeFunction);


			//timer for result slide
			// console.log(answered);
			function placeFunction(event){
				triviaAns(currentQ, event);
				// let 
				let timeoutID = setTimeout(()=>{
						if(currentIndex<keyArray.length) {app(keyArray,currentIndex++)} 
						else if (currentIndex=keyArray.length) {endScreen()}
					},7500);
				// console.log(this);
				
			//if time runs out
			currentIndex++;
			
			//console log the answers
			console.log(correctAns);
			console.log(incorrectAns);
			console.log(unansweredAns);

			};	
	}

//===============================================================
	//correct or incorrect
	function triviaAns(input, event){
		//identify choice
		// console.log(event);
		// console.log(this);
		let ansChoice = $(event.target).attr('result');
		// console.log(ansChoice);
		answered = true;

		//if correct choice
		if (ansChoice === 'correct') {
			// console.log('c');
			correctAns++;
			let congratsPrint = `<img class="answerPic" src="./assets/images/${input.congrats}">
								 <p><strong>Congratulations!</strong>${input.ctext}</p>`;
			$('#slide').html(congratsPrint);
		}
		//wrong choice
		else{
			// console.log('w');
			incorrectAns++;
			let wrongPrint = `<img class="answerPic" src="./assets/images/${input.wrong}">
								 <p><strong>Wrong!</strong>${input.wtext}</p>`;
			$('#slide').html(wrongPrint);
		}
		clearInterval(timeHolder);

	};


//======================================================================================
	//prints slide when time runs out
	function tooLate(){
		unansweredAns ++;
		let printTooLate = `<img class="answerPic" src="./assets/images/tooLate.gif">
							</br>
							<p><strong>Too Late!</strong> You didn\'t answer in time`;
		$('#slide').html()
	}

//=====================================================================================
	//generates a randomize array so the correct answer is not always in the same place
	function randomArray(arr) {
		for (var i = 0; i < inputArray.length; i++) {
				let num = Math.floor(Math.random()*3);
				let holder = inputArray[num];
				if (arr.includes(holder)) {
					i--;
				}
				else {
					arr.push(holder);
				}
			}
	}

//=====================================================================================
	//function to control the interval
	function timer(t) {
		// time = t;
		if (t>0) {
			time--;
			$('#time').html(`Time: ${time}`);
		}
		else {
			clearInterval(timeHolder);
			unansweredAns ++;
			// triviaAns(currentQ);
		}
	}

	
//=======================================================================
	//prints end screen when the last question has been asked
	function endScreen() {
		$('#slide').html(
			`<h3>It\'s Over</h3>
			<p>Correct Answers: ${correctAns}</p>
			<p>Incorrect Answers: ${incorrectAns}</p>
			<p>Unanswers: ${unansweredAns}</p>`
			);
	}

//===================================================================================
	//if time runs out print this slide
	function timeoutSlide(input, keyArray, currentIndex) {
		unansweredAns++;
		let timeoutPrint = `<img class="answerPic" src="./assets/images/${input.wrong}">
								 <p><strong>Your out of time!</strong>${input.wtext}</p>`;
			$('#slide').html(timeoutPrint);
		setTimeout(()=>{
			console.log(currentIndex);
				if(currentIndex<keyArray.length) {app(keyArray,currentIndex++)} 
					else {endScreen()}
				},7500)
		clearInterval(timeHolder);
	}
});