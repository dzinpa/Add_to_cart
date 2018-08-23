
function go(){ //onload 
	
	// The timer on change of pictures of a banner
	window.timerId = window.setInterval(timer, 4000);
	
	 //Change button after clicking
	var bClick = document.querySelectorAll('.buy');
		for (var i = 0; i < bClick.length; i++) {
			bClick[i].addEventListener('click', changeButton);
		}
 


			
}
// The timer on change of pictures of a banner
function timer(){
	if(window.number == undefined || window.number == 3) {
		window.number = 1;
	} else window.number = window.number + 1;
		var img = document.getElementById("image");
			img.src = "Carusel_img/carusel_"+window.number+".jpg"
}
	
//Timer to change banner text
var classIndex = 1;
function textRotator() {
  $(".bannerText").hide();
  $(".bannerText" + classIndex).show();
  
  var classCount = 3;
  classIndex++;
  if(classIndex > classCount) {
    classIndex = 1;
  }
}

$(document).ready(function() {
  textRotator();
  setInterval(textRotator, 4000);
});

//Timer to change the circles of the banner
var circleIndex = 1;
function circleRotator() {
  $(".circle").addClass("backgroundColor");
  $(".circle" + circleIndex).removeClass("backgroundColor");
  
  var circleCount = 3;
  circleIndex++;
  if(circleIndex > circleCount) {
    circleIndex = 1;
  }
}

$(document).ready(function() {
  circleRotator();
  setInterval(circleRotator, 4000);


//Set css when hover to good
	$(".price").hover(function(){
		$(this).find("div.larger").css({border:"2px solid #8BBB08",background:"#EBE8E5" });
	}, 
	function(){
		$(this).find("div.larger").css({border:"2px solid white",background:"transparent"});
    });

//Reduce the number of goods
	$(".minus").click(function(){
		var $input = $(this).parent().find("input");
		var count = parseInt($input.val())-1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
			return false;
    });
//Increase the number of goods	
    $(".plus").click(function(){
		var $input = $(this).parent().find("input");
        $input.val(parseInt($input.val())+1);
        $input.change();
			return false;
    });
});

//Add item to shopping cart
var countSum = 0;
var priceSum;
var totalSum = 0;

$ (function(){
	$(".buy").click(function(){
//Prices and counts data	
		id = $(this).data("id");//for the function for the button
		//to take data from the goods that are added
		price = $(this).data("price");
		count = $(this).data("count");
		input = $(this).closest(".larger").find(".amount");
			count = parseInt($(input).val());
			
		//to take data from bask
		basCount = $(".count").data("count");
		basPrice = $("#price").data("price");
		totalPrice = $("#totalPrice").data("price");
			countSum+=count;//get count
			
			priceSum = count * price; //get summ
			
			totalSum = priceSum + totalSum; // get total summ
			
			// print data
				$("span.count").html(countSum);
				$("span#price").html(totalSum);
				$("#totalPrice").html(totalSum);
				
//Create the product table in the cart
   $("p.dialogTitle").add("p.totalPrice").add(".checkOut").show();
   
   $(".message").hide();//if the goods have been added or removed -remove the inscription (see below)
	
	var imgSrc = $(this).closest(".larger").find("img").attr("src");
	var name = $(this).closest(".larger").find("h5").html();
		for(var i = 0; i < 1; i++){
			$("#bask table").append( 
			"<tr><td>" 
			+"<div class='removePrice' onclick='removeFromBask(this);'>x</div>"
			+ "<img class='baskImg' >"
			+"<span>"+ name +"</span>" 
			+"<div class='baskDiv'>"+'<p>Кол-во:</p>'+count+"</div>"
			+"<div class='baskDiv'>"+'<p>Cумма:</p>'+ priceSum +'€'+"</div>" 
			+ "</td></tr>" );
				$(".baskImg:last").attr("src",imgSrc);
				$(".removePrice:last").attr("data-count",count);
				$(".removePrice:last").attr("data-price",price);
				$(".removePrice:last").attr("data-id",id);
				
//To the delete goods button one more function onclick			
				var butRem = document.querySelectorAll('.removePrice');
					for (var i = 0; i < butRem.length; i++) {
						butRem[i].addEventListener('click', doButtonInitial);
					}							

//Now the basket is not empty
	$(".empty>p").html(countSum+ " <span class='ending'> товар</span>" +" * "+ totalSum+'€');
	$(".empty").add(".cart").addClass("notEmpty");
		}
		
// Call function (change the end of the word goods for different counts)
	replaceWordEnding();	
	});
});	

//Function change the end of the word goods for different counts
function replaceWordEnding(){
	var word = document.querySelectorAll("span.ending");	
		for(var i = 0; i< = word.length; i++){
			if (countSum > 4){
				word[i].innerHTML="товаров";
			} else if (countSum > 1){
				word[i].innerHTML="товара";	
			}else{
				word[i].innerHTML="товар";	
			}
		}
}

//Open bask
function showBask(){
	var baskElem = document.querySelector('.baskWrap');
	var divFix = document.querySelector('#block');
	var mainBody = document.querySelector('#mainBody');
		baskElem.style.display = "block";
		divFix.setAttribute('class','fix');
		mainBody.setAttribute('class','fixBody');
}

//Close bask
function returnInShop(){
	var baskElem = document.querySelector('.baskWrap');
	var divFix = document.querySelector('.fix');
	var mainBody = document.querySelector('.fixBody');
		baskElem.style.display = "none";
		divFix.removeAttribute('class');
		mainBody.removeAttribute('class');				
}

//Close bask onclick to div blockand button x
function unBlock(){
	returnInShop()
}
	
//Delete product line from shopping cart
 function removeFromBask(elem){
	var tr = elem.parentNode;
		tr.remove();
		
//Delete price and summ
	var bCount = elem.getAttribute("data-count");
	var bPrice = elem.getAttribute("data-price");
		bPrice = bCount * bPrice;
	var tCount = countSum-bCount;
		countSum = tCount
		
	var tSum = totalSum-bPrice;
		totalSum = tSum
	 
	var sC = document.querySelector("span.count")
	var pC = document.querySelector(".empty>p")
		sC.innerHTML = countSum;
		pC.innerHTML = countSum+" <span class='ending'> товар</span>"+"*"+totalSum+"€";
	 
	var sP = document.querySelector("span#price")
		sP.innerHTML = totalSum;
	
	var tP = document.querySelector("span#totalPrice");
		tP.innerHTML = totalSum;
		
	if(countSum == 0){//if all elems delete
		pC.innerHTML = "Корзина пуста"
		$(".empty").add(".cart").removeClass("notEmpty"); 
		$("#bask table").append('<div class="message">Вы удалили все элементы из корзины </div>');
		$(".message").css({color:"green",marginLeft:"-15px"});
		$("p.dialogTitle").add("p.totalPrice").add(".checkOut").hide();//
		$("#bask table").prepend("<div class='titleMessage message'>Ваша корзина пуста</div>");//
		$(".titleMessage").css({color:"#999999","fontWeight":"bold",position:"relative",'left':"300px","bottom":"35px"});
	}
	
//Call function (change the end of the word goods for different counts)	
	replaceWordEnding();
}

//Edit button after clicking
function changeButton(){
	this.innerHTML = "В корзине";
	this.style.background = "linear-gradient(to bottom, rgba(180,221,180,1) 0%,rgba(131,199,131,1) 17%,rgba(82,177,82,1) 33%,rgba(0,138,0,1) 67%,rgba(0,87,0,1) 83%,rgba(0,36,0,1) 100%";	
}
	
//Change the button back if the item was removed from the shopping cart
function doButtonInitial(){
	var butId = this.getAttribute("data-id");
	var parentId = document.querySelectorAll(".buy");
	for(var i = 0; i < parentId.length; i++){
		var initId = parentId[i].getAttribute("data-id");
			if (initId == butId){
				parentId[i].innerHTML = "Купить";
				parentId[i].style.background = "linear-gradient(to bottom, #cd1024 0%,#ed4959 49%,#ed0017 50%,#cd1024 100%)";
				return;
			}
	}	
}	
	



