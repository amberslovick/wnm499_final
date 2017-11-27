$(function(){
	function conlog(print){
		console.log(print);
	}
	function addToConsole(text){
		$(".progressConsole").append("<p>" + text + "</p>");
		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});
	}
	function addWarning(text){
		$(".progressConsole").append("<p class='warning'>" + text + "</p>");
		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});

	}
	// var player = [];
	var captainName = "";
	var captainJob = "";
	var crew = ["rachel","spencer", "marg", "thom"];

	var supplyCost = [
		fuel = 50,
		food = 20,
		ammo = 20,
		parts = 100
	];
	// var money = 0;
	var numOfParts = 0, numOfFuel = 0, numOfFood = 0, numOfAmmo = 0;
	var costOfItems = 0;
	var oldBillParts = 0, oldBillFuel = 0, oldBillFood = 0, oldBillAmmo = 0;
	var storeBill = 0;
	var storeTotal = 0;

	var startCounter = false;
	var counter = 0;

	var screenCount = 0;
	var docHeight = $("body").height();
	var mainMargin = 0;

	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		parts : 0,
		money : 0,

	}
	var pace = "quick";
	var paceOpt = ["stopped", "slow", "moderate", "quick", "fast"];
	var health = $(crew).length;
	var rations = "filling";
	// var food = 0;
	var ffp = 0;
	// var ammo = 0;
	// var parts = 0;
	// var fuel = 0;
	var fuelUsage = 0;
	var day = 1;
	// var month = "";

	var diceOne = 0;
	var diceTwo = 0;
	var ranEnDice = 0;
	var encounter = 0;

	var traderTitle = ["Space Voyager", "Hitchhiker", "Galaxy Vagabond", "Ex-Pirate"];
	var traderName = ["Bobbert", "Baltazar", "Hosanna", "Huxley", "Ivar", "Nevin", "Caess", "Sourdrop", "Aut"];
	var tradeItems = [
		{one:'10 meals', two:'§50', add:'10', to:'food', minus:'50', from:'money'},
		{one:'20 meals', two:'§60', add:'20', to:'food', minus:'60', from:'money'},
		{one:'20 meals', two:'§70', add:'20', to:'food', minus:'70', from:'money'},
		{one:'30 meals', two:'§70', add:'30', to:'food', minus:'70', from:'money'},

		{one:'100 fuel pods', two:'§60', add:'100', to:'fuel', minus:'60', from:'money'},
		{one:'200 fuel pods', two:'§100', add:'200', to:'fuel', minus:'100', from:'money'},
		{one:'300 fuel pods', two:'§120', add:'300', to:'fuel', minus:'120', from:'money'},

		{one:'2 energy shots', two:'20 meals', add:'2', to:'ammo', minus:'20', from:'food'},
		{one:'5 energy shots', two:'30 meals', add:'5', to:'ammo', minus:'30', from:'food'},
		{one:'3 energy shots', two:'§220', add:'3', to:'ammo', minus:'220', from:'money'},
	]
	var itemNum = 0;
	var nameNum = 0;
	var jobNum = 0;
	var traderNum = 0;
	var titleNum = 0;

	var locationGoal = 1;
	var locationOne = 15;
	var locationTwo = 25;
	var locationThree = 40;
	var locationEnd = 55;

	var ranNum = [0,1,2,3,4,5,6,7,8];
	
	var localJob = ['Hooman', 'Erutzanans', 'Teegafane', 'Vleslon', 'Dlahiri', 'Bosolians', 'TuVav', 'Swerzog', 'Catali', 'Heerians', 'Gorganub'];
	var localName = ['Uemyrea', 'Linola', 'Hystise', 'Airiene', 'Pela', 'Voloya', 'Jozane', 'Boozyad', 'Ukhgahr', 'Squxuoss', 'Kuarcax', 'Algaxath'];

	var doubleFuel = false;
	var extraFuel = 1;
	// console.log(farmer);
	// console.log(engineer);
	// console.log(moneybags);

//function
	// function addJob(job){
	// 	captainJob = $.merge([],job);
	// 	console.log(player);
	// 	$("span.money").text(player[1]);
	// };

	function addMembers(num){
		var inputMember = $("input[name = " + num + "]").val();
		var name  = [num = inputMember];
		// player = $.merge(player,name);
		crew = $.merge([],name);
		conlog[crew];
	}
	function updateMonth(){
		// console.log(month);
		day++;

		if(month == "April" && day > 30){
			month = "May";
			day = 1;
		} else if(month == "May" && day > 31){
			month = "June";
			day = 1;
		} else if(month == "June" && day > 30){
			month = "July";
			day = 1;
		} else if(month == "July" && day > 31){
			month = "August";
			day = 1;
		} else if(month == "August" && day > 31){
			month = "September";
			day = 1;
		} else if(month == "September" && day > 30){
			month = "October";
			day = 1;
		} else if(month == "October" && day > 31){
			month = "November";
			day = 1;
		} else if(month == "November" && day > 30){
			month = "Decmeber";
			day = 1;
		} else if(month == "Decmeber" && day > 31){
			month = "January";
			day = 1;
		} else if(month == "January" && day > 31){
			month = "Febuary";
			day = 1;
		} else if(month == "Febuary" && day > 28){
			month = "March";
			day = 1;
		} else if(month == "March" && day > 31){
			month = "April";
			day = 1;
		} 
		conlog("day:" + day);

		$("span.month").text(month);
		$("span.day").text(day);
	}

	function storeBilling(bill){
		storeBill -= bill;
		storeBill += costOfItems;
		storeTotal = gameobj['money'] - storeBill;
		console.log("bill: " + storeBill);
		console.log("total: " + storeTotal);
		$("span.bill").text(storeBill);
		$("span.total").text(storeTotal);
		if(storeTotal >= 0){
			$(".exitStore").show();
		} else if(storeTotal < 0){
			$(".exitStore").hide();
		}
	}

	// function step(){
	// 	console.log(counter);
	// 	counter++;
	// 	console.log(counter);
	// 	if(counter > 129600) t = 0;
	// 	window.requestAnimationFrame(step);

	// 	//20 chances for randomness
	// }

	

	function encounterSituations(){
		if(encounter == 0){
			//addToConsole("You travel a days worth");

			//day++;
			if(pace == "slow"){
				//day++;
				addToConsole(month + " " + day + ": You travel 10 blorps");
			} else if(pace == "moderate"){
				//day += 2;
				addToConsole(month + " " + day + ": You travel 25 blorps");
			} else if(pace == "quick"){
				//day += 3;
				addToConsole(month + " " + day + ": You travel 50 blorps");
			} else if(pace == "fast"){
				//day += 4;
				addToConsole(month + " " + day + ": You travel 75 blorps");
			}
			
			//when have time do animation of getting closer to location
		} else if(encounter == 1){
			addToConsole("ARRRRRRRGH! Pirates have stormed the ship!");
			addToConsole("The space pirates demand §500 or else!");
			addToConsole("What will you do?");
			$(".travel").hide();
			$(".twoChoices .one").text("Attack!");
			$(".twoChoices .two").text("Give In");
			$(".twoChoices").show();
			$(".twoChoices .one").on('click', function(){
				$(".twoChoices .one").off("click")
				if(gameobj['ammo'] > 0){
					diceOne = Math.ceil( ( Math.random() * 10) );
					conlog("Dice roll:" + diceOne);
					if(diceOne >= 6){
						addToConsole("Your gunslinging ways superior to the space pirates and they run away!");
						gameobj['ammo']--;
						$("span.ammo").text(gameobj['ammo']);
						$(".travel").show();
						$(".twoChoices").hide();
					} else {
						addToConsole("The space pirates draw their laser guns before you're able to!");

						addToConsole("They loot §500 and 10 meals because of the trouble you caused.");
						money -= 500;
						food -= 10;
						$("span.money").text(money);
						$("span.food").text(food);

						$(".travel").show();
						$(".twoChoices").hide();
					}
				} else {
					addToConsole("You have no ammo! What will you do?");
					$(".twoChoices .one").text("Bluff!").addClass("bluff").removeClass("one").off("click");

				}
				$(".twoChoices .bluff").on('click', function(){
					diceOne = Math.ceil( ( Math.random() * 10) );
					if( diceOne < 6){
						addToConsole("They believe you and back off only taking §10.");
						gameobj['money'] -= 10;
						$("span.money").text(gameobj['money']);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					} else{
						addToConsole("They laugh when they realize there's no ammo and take §700 instead.");
						gameobj['money'] -= 700;
						$("span.money").text(gameobj['money']);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					}
				});

			});
			$(".twoChoices .two").on('click', function(){
				addToConsole("You give the pirates what they want and they saunter off the ship with their pockets full");
				gameobj['money'] -= 500;
				$(this).off('click');
				$("span.money").text(gameobj['money']);
				$(".twoChoices").hide();
				$(".travel").show();
			});


		} else if(encounter == 2){
			addToConsole("Space whales pass by and sooth your soul");
		} else if(encounter == 3 && role > 3){
			addToConsole("Woaahhh! Woaahhh! Time Warp sends you back three days!");
			day -= 4;
			role -= 4;
			if(day < 1){
				if(month == 'April'){
					month = 'March';
					day = 31 + day;
				} else if(month == 'May'){
					month = 'April';
					day = 30 + day;
				} else if(month == 'June'){
					month = 'May';
					day = 31 + day;
				} else if(month == 'July'){
					month = 'June';
					day = 30 + day;
				} else if(month == 'August'){
					month = 'July';
					day = 31 + day;
				} else if(month == 'September'){
					month = 'August';
					day = 31 + day;
				} else if(month == 'October'){
					month = 'September';
					day = 30 + day;
				} else if(month == 'November'){
					month = 'October';
					day = 31 + day;
				} else if(month == 'Decmeber'){
					month = 'November';
					day = 30 + day;
				} else if(month == 'January'){
					month = 'Decmeber';
					day = 31 + day;
				} else if(month == 'February'){
					month = 'January';
					day = 31 + day;
				} else if(month == 'March'){
					month = 'February';
					day = 28 + day;
				}


				$("span.month").text(month);
				$("span.day").text(day);
			}
			$("span.day").text(day);
		} else if(encounter == 4){
			addToConsole("You see poop in space. That was weird.");
			//black hole shed weight choose what to dump
		} else if(encounter == 5){
			addToConsole("Asteroids fly by but you make it out unscathed! Thank the space lords!");
		} else if(encounter == 6){
			var death = Math.floor((Math.random() * health+1));

			conlog("death num: " + death);
			conlog(crew);
			addWarning(crew[death - 1] + " gets space mites and dies!");
			crew.splice(death - 1,1);
			health = $(crew).length;
			$("span.health").text(health);
			conlog(crew);
			deadCrew();
		} else if(encounter == 7){
			var death = Math.floor((Math.random() * health+1));

			conlog("death num: " + death);
			conlog(crew);
			addWarning("Weasles! Weasles! SPACE WEASLES! They are in the suits! AHHHHH! " + crew[death - 1] + " dies from an infected bite.");
			crew.splice(death - 1,1);
			health = $(crew).length;
			$("span.health").text(health);
			conlog(crew);
			deadCrew();
		} else if(encounter == 8){
			addToConsole("Space Pigeons are found in the storage area. They have eaten all the food but now you have space pigeons to eat.");
			food = 100;
			$("span.food").text(gameobj['food']);
		} else if(encounter == 9){
			addToConsole("You catch flotsam passing by your ship. You inspect it closer. NEVERMIND IT'S SPACE WHALE POOP! NOOOOOOO!");
		} else if(encounter == 10){
			addToConsole("You wish on a falling star. What a beautiful time.");
		} else if(encounter >= 20){

		} else{
			addToConsole("You travel a days worth");
		}
	}

	function paceChange(clickPace){
		$("." + clickPace).on('click', function(){
			pace = clickPace;
			$(".pace-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}

	function rationChange(clickRation){
		$("." + clickRation).on('click', function(){
			rations = clickRation;
			$(".ration-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}


	
	

	var chat1name, chat1job, chat2name, chat2job, chat3name, chat3job, chat4name, chat4job;

	function chat(name){
		

		nameNum = (Math.floor((Math.random() * $(localName).length + 1))) - 1;
		jobNum = (Math.floor((Math.random() * $(localJob).length + 1))) - 1;
		if(name == "chatterbox1"){
			chat1name = localName[nameNum];
			chat1job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat1job);
			$("." + name + " .chatter-name").text(chat1name);
		} else if (name == "chatterbox2"){
			chat2name = localName[nameNum];
			chat2job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat2job);
			$("." + name + " .chatter-name").text(chat2name);
		} else if (name == "chatterbox3"){
			chat3name = localName[nameNum];
			chat3job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat3job);
			$("." + name + " .chatter-name").text(chat3name);
		} else if (name == "chatterbox4"){
			chat4name = localName[nameNum];
			chat4job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat4job);
			$("." + name + " .chatter-name").text(chat4name);
		}
	}
	

	function deadCrew(){
		if(health <= 0){
			addToConsole("Your whole crew has passed away.");
			addToConsole("What is a captain without a good crew by their side?");
			addToConsole("Shall we try again?");
			$(".restart").show();
			$(".travel").hide();
			encounter = 20;
		}
	}


//next
	$(".next").on('click', function(){
		screenCount++;
		// console.log(docHeight);
		mainMargin += docHeight;
		$(".atMain").css('marginTop',  -mainMargin);
		// console.log(mainMargin);
	});

//jobs
	$(".farmer").on('click', function(){
		captainJob = "farmer";
		gameobj['money'] = 1000;
	});
	$(".engineer").on('click', function(){
		captainJob = "engineer";
		gameobj['money'] = 1500;
	});
	$(".moneybags").on('click', function(){
		captainJob = "moneybags";
		gameobj['money'] = 2000;
	});


//names
	$(".leaderName").on('click', function(){
		var inputLeader = $("input[name = 'captain']").val();
		var name = [inputLeader];
		captainName = $.merge([],name);
		console.log(captainName);
	});

	$(".memberName").on('click', function(){
		var inputMember = $("input[name = 'member1']").val();
		var name = [inputMember];
		crew = $.merge([],name);

		inputMember = $("input[name = 'member2']").val();
		name = [inputMember];
		crew = $.merge(crew,name);
		
		inputMember = $("input[name = 'member3']").val();
		name = [inputMember];
		crew = $.merge(crew,name);

		inputMember = $("input[name = 'member4']").val();
		name = [inputMember];
		crew = $.merge(crew,name);
		console.log("crew:" + crew);
	});

//month
	$(".april").on('click', function(){
		month = 'April';
		updateMonth();
	});
	$(".may").on('click', function(){
		month = 'May';
		updateMonth();
	});
	$(".june").on('click', function(){
		month = 'June';
		updateMonth();
	});
	$(".july").on('click', function(){
		month = 'July';
		updateMonth();
	});

//shop
	// money = parseInt(player[1]);
	$("span.money").text(gameobj['money']);

	$("input[name = 'parts']").on('input',function(){
		numOfParts = $("input[name = 'parts']").val();
		costOfItems = 100 * numOfParts;
		storeBilling(oldBillParts);
		oldBillParts = costOfItems;
	});
	$("input[name = 'fuel']").on('input',function(){
		numOfFuel = $("input[name = 'fuel']").val();
		costOfItems = 50 * numOfFuel;
		storeBilling(oldBillFuel);
		oldBillFuel = costOfItems;
	});
	$("input[name = 'food']").on('input',function(){
		numOfFood = $("input[name = 'food']").val();
		costOfItems = 10 * numOfFood;
		storeBilling(oldBillFood);
		oldBillFood = costOfItems;
	});
	$("input[name = 'ammo']").on('input',function(){
		numOfAmmo = $("input[name = 'ammo']").val();
		costOfItems = 20 * numOfAmmo;
		storeBilling(oldBillAmmo);
		oldBillAmmo = costOfItems;
	});
	$(".exitStore").on('click', function(){
		gameobj['parts'] = numOfParts;
		gameobj['fuel'] = numOfFuel * 100;
		gameobj['food'] = numOfFood * 100;
		gameobj['ammo'] = numOfAmmo * 5;
		gameobj['money'] = storeTotal;
		conlog("parts: " + gameobj['parts']);
		conlog("fuel: " + gameobj['fuel']);
		conlog("food: " + gameobj['food']);
		conlog("ammo: " + gameobj['ammo']);
		conlog("money: "+ gameobj['money']);
	});



	$(".departure").on('click', function(){
		// counter = 0;
		// startCounter = true;
		// console.log(startCounter);
		$("span.money").text(gameobj['money']);
		$("span.pace").text(pace);
		$("span.health").text(health);
		$("span.rations").text(rations);
		$("span.food").text(gameobj['food']);
		$("span.ammo").text(gameobj['ammo']);
		$("span.fuel").text(gameobj['fuel']);
		$("span.month").text(month);
		day = 1;
		$("span.day").text(day);
		$(".options").show();
	});


var role = 1;

month = "April";
gameobj['food'] = 1500;
gameobj['ammo'] = 1;
gameobj['fuel'] = 1200;
gameobj['money'] = 2000;


$("span.money").text(gameobj['money']);
$("span.food").text(gameobj['food']);
$("span.fuel").text(gameobj['fuel']);




//day
	$(".traverse").on('click', function(){
		updateMonth();

		if(doubleFuel){
			extraFuel = 2;
		} else if (!doubleFuel){
			extraFuel = 1;
		}

		if(pace == "slow"){
			fuelUsage = 5 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role++;
		} else if(pace == "moderate"){
			fuelUsage = 15 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=2
		} else if(pace == "quick"){
			fuelUsage = 30 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=3
		} else if(pace == "fast"){
			fuelUsage = 50 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=4
		}

		if(rations == "bare"){
			fpp = 5;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);
		} else if(rations == "meager"){
			fpp = 10;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);
		}else if(rations == "filling"){
			fpp = 20;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);

		}
		
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo){
			encounter = Math.ceil( ( Math.random() * 10) );
		}
		// encounter = 3;


		

		if(gameobj['fuel'] <= fuelUsage && gameobj['fuel'] > 0){
			// $(".travel").hide();

			addToConsole("You are running low on fuel. Try trading for more fuel or adjusting your pace.");
		} else if(gameobj['fuel'] <=0){
			gameobj['fuel'] = 0;
			$("span.fuel").text(gameobj['fuel']);
			addWarning("Warning! You have run out of fuel. Attempt to trade for fuel or drift helplessly through space.");
			// $(".traverse").addClass("noFuel").removeClass("traverse").off('click');
			$(".traverse").css({'pointerEvents':'none','opacity':'.5'});
			encounter = 20;

		}

		if(gameobj['food'] <= (ffp * health) && gameobj['food'] > 0){
			addToConsole("A crew member warns you that food storage is getting low. It's advisable to make a trade for food.");
		} else if(gameobj['food'] <= 0){
			gameobj['food'] = 0;
			$("span.food").text(gameobj['food']);
			addWarning("Warning! You have run out of food. If you continue to travel without food your crew members may die.");
			var hungryDice = Math.ceil( ( Math.random() * 10) );
			conlog("hungry: " + hungryDice)
			if(hungryDice == 5 || hungryDice == 3){
				var death = Math.floor((Math.random() * health+1));

				addWarning(crew[death - 1] + " has passed away from hunger.");

				crew.splice(death - 1,1);
				health = $(crew).length;
				$("span.health").text(health);
				encounter = 20;
			}
		}

		deadCrew();
		




		
		encounterSituations();

	

		conlog("role:" + role);
		// conlog(diceOne);
		// conlog(diceTwo);
		// conlog(ranEnDice);
		// conlog(encounter);
		encounter = 0;


	//locations
		if(role >= locationOne && role <= locationTwo && locationGoal == 1){
			addToConsole("You have neared Planet X, what will you do?");
			$(".travel").hide();
			$(".twoChoices").show();
			$(".twoChoices .one").text("Touch Down");
			$(".twoChoices .two").text("Avoid");
			$(".one").on('click',function(){

				addToConsole("You have touched down on Planet X. This is a main hub for those who favor themselves as cosmopoliton.")
				
				$(".twoChoices").hide();
				$(".travel").hide();
				$(".planetX").show();
				updateMonth();
				$(".one").off('click');
			});
			$(".two").on('click',function(){
				addToConsole("You chose to avoid Planet X. Was this a good idea? Only time will tell.");
				$(".travel").show();
				$(".twoChoices").hide();
				// $(this).off("click");
				locationGoal ++;
			});
		} else if(role >= locationTwo && role <= locationThree && locationGoal == 2){
			conlog("second location");
			addToConsole("You have neared Nebula Y.");
			addToConsole("You have the choice of going through the expanse with the risk of space pirates or go around and use twice the amount of fuel.");
			$(".twoChoices").show();
			$(".travel").hide();
			$(".twoChoices .one").text("Go through");
			$(".twoChoices .two").text("Go around");
			$(".one").on('click', function(){
				addToConsole("You have decided to go through the Nebula. Be wary, the magnetic dust that is found in this Nebula causes malfunctions in your gear making you easier targets to space pirates.");
				$(".twoChoices").hide();
				doubleFuel = true;			
				$(".travel").show();
				$(".one").off('click');
			});
			$(".two").on('click', function(){
				addToConsole("You have decided to go around the Nebula. The Nebula is expansive so you double the fuel will be used to travel the normal days travel.");
			});
			locationGoal ++;
		} else if(role >= locationThree && locationGoal == 3){
			conlog("third location");
			locationGoal ++;
		} else if(role >= locationEnd && locationGoal == 4){
			conlog("Yay made it! Woo!")
		}
	});





//pace
	$(".check-pace").on('click', function(){
		$(".change-pace").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	paceChange("slow");
	paceChange("moderate");
	paceChange("quick");
	paceChange("fast");
	
	$(".set-pace").on('click', function(){
		$("span.pace").text(pace);
		$(".change-pace").hide();
		$(".travel").show();
		$(".progressConsole").show();
	})
	
//rations
	$(".check-rations").on('click', function(){
		$(".change-rations").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	rationChange("bare");
	rationChange("meager");
	rationChange("filling");

	$(".set-rations").on('click', function(){
		$("span.rations").text(rations);
		$(".change-rations").hide();
		$(".travel").show();
		$(".progressConsole").show();
	});


//trade
	$(".attempt-trade").on('click', function(){
		$(".progressConsole").hide();
		$(".travel").hide();
		$(".trading").show();

		trade("trade-one");
		trade("trade-two");
		trade("trade-three");
		

	});

	$(".trade-done").on('click', function(){
		if(gameobj['fuel'] > fuelUsage){
			$(".traverse").css({'pointerEvents':'initial','opacity':1})
		}
		$(".progressConsole").show();
		$(".travel").show();
		$(".trading").hide();
		
		addToConsole("trade attempted");
	})
	
//Planet X
	
	$(".local-trade").on('click', function(){
		updateMonth();
		$(".progressConsole").hide();
		$(".planetX").hide();
		$(".local-trading").show();
		trade("trade-one");
		trade("trade-two");
		trade("trade-three");

	});

	function trade(traderNum){
		titleNum = (Math.floor((Math.random() * $(traderTitle).length + 1))) - 1;
		nameNum = (Math.floor((Math.random() * $(traderName).length + 1))) - 1;
		itemNum = (Math.floor((Math.random() * $(tradeItems).length + 1))) - 1;
		$("." + traderNum + " .traderTitle").text(traderTitle[titleNum]);
		$("." + traderNum + " .trader").text(traderName[nameNum]);
		$("." + traderNum + " .first-item").text(tradeItems[itemNum].one);
		$("." + traderNum + " .second-item").text(tradeItems[itemNum].two);

		$("." + traderNum + " .make-trade").data({
			add: tradeItems[itemNum].add,
			minus: tradeItems[itemNum].minus,
			addTo: tradeItems[itemNum].to,
			minusFrom: tradeItems[itemNum].from
		})
	}

	$("body").on("click",".make-trade",function(){
		conlog($(this).data("minusFrom"));
		conlog(gameobj[$(this).data("minusFrom")]);
		conlog($(this).data("minus"));
		if(gameobj[$(this).data("minusFrom")] >= $(this).data("minus") ) {
			gameobj[$(this).data("addTo")] += parseInt($(this).data("add"));
			gameobj[$(this).data("minusFrom")] -= parseInt($(this).data("minus"));
			$("span." + $(this).data("addTo")).text(gameobj[$(this).data("addTo")]);
			$("span." + $(this).data("minusFrom")).text(gameobj[$(this).data("minusFrom")]);
		} else if(gameobj[$(this).data("minusFrom")] < $(this).data("minus")){
			conlog("trade unavailable")
		}else{
			conlog("uhhh");
		}

	});

	$(".local-trade-done").on('click', function(){
		$(".progressConsole").show();
		$(".planetX").show();
		$(".local-trading").hide();
	});

	$(".local-chat").on('click', function(){
		updateMonth();
		// $(".progressConsole").css({'height':'15%'});
		addToConsole("You enter a local bar called Dravent's Watering Hole.");

		$(".planetX").hide();
		$(".local-chatting").show();
	});

	$(".chat-talk").on('click', function(){

		nameNum = (Math.floor((Math.random() * $(localName).length + 1))) - 1;
		jobNum = (Math.floor((Math.random() * $(localJob).length + 1))) - 1;
		addToConsole("You start talking with " + localJob[jobNum] + " " + localName[nameNum] + ".");

		diceOne = Math.ceil( ( Math.random() * 10) );
		if(diceOne == 1){
			addToConsole("Your new friend tells you a great joke and you bond together over other jokes.");
		} else if(diceOne == 2){
			addToConsole("They talk about their days problems and after their rant they thank you for listening by giving you 50 lbs of food");
			gameobj['food'] += 50;
			$("span.food").text(gameobj['food']);
		} else if(diceOne == 3){
			addToConsole("You dare them to make a bet with you on the outcome of the flounder races.");
			addToConsole("You won! They give you §100 as your winnings.");
			gameobj['money'] += 100;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 4){
			addToConsole("You dare them to make a bet with you on the outcome of the flounder races.");
			addToConsole("You lost! That's embarassing! You give them §100 as their winnings.");
			gameobj['money'] -= 100;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 5){
			addToConsole("You buy your new friend a drink and local bar food.");
			addToConsole("The Barkeep slides your drinks and a spongy purple substance, that you assume to be local grub, towards you.")
			gameobj['money'] -= 10;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 6){
			addToConsole("You find some money on the floor and decide to keep it");
			addToConsole("You gain §20.");
			gameobj['money'] += 20;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 7){
			addToConsole("After a few minutes the conversation trails off and you sit in a stew of uncomfortable silence");
		} else if(diceOne == 8){
			addToConsole("You get along well with this random stranger you've sat down with.");
		} else if(diceOne == 9){
			addToConsole("You find out that " + localJob[jobNum] + " " + localName[nameNum] + " knows Aunt Frale. What a small world");
		} else{
			addToConsole(localJob[jobNum] + " " + localName[nameNum] + " seems like a good person. You wonder if they would join you on your journey.");
			if(crew.length < 4){
				addToConsole(localJob[jobNum] + " " + localName[nameNum] + " agrees to join you.");
				addToConsole(localJob[jobNum] + " " + localName[nameNum] + " joins you.");
				var newmember = [localName[nameNum]];
				crew = $.merge(crew,newmember);
				conlog(crew);
				health = $(crew).length;
				$("span.health").text(health);

			} else if(crew.length >= 4){
				addToConsole("Too bad there's no room in your ship for another person.");
			}
		}
		$(".chat-talk").text("Talk to Somebody Else")
	});
	
	$(".chat-leave").on('click', function(){
		$(".local-chatting").hide();
		$(".planetX").show();
	});

	$(".leave-planet").on('click', function(){
		updateMonth();
		$(".travel").show();
		$(".planetX").hide();
		addToConsole("You take off from Planet X to once again travel across the galaxy towards your new home.")
		conlog("leave planet");
		// role = 15;
		locationGoal ++;
	});













//restart
	$(".restart h4").on('click', function(){
		location.reload();
	});



});