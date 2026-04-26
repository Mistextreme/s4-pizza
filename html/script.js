window.addEventListener('message', function (event) {
  if (event.data.action == "pizza") { $("body").css("display", "block"); }
});




var secilenMalzeme = {}
secilenMalzeme.k = "no-repeat 0 0";
secilenMalzeme.w = "41px";
secilenMalzeme.h = "40px";





$(".pizza").click(function(e){
    var num = Math.floor((Math.random()*10)+1);
    var img = $(`<div id="${num}_w" 
	style="position:absolute; 
	top:${e.pageY}; left: ${e.pageX};
	background: url('img/ings_on_pizza.png') ${secilenMalzeme.k};
	width: ${secilenMalzeme.w};
	height: ${secilenMalzeme.h};" ></div>`);
    $(".pizza").append(img);
 
	if($(".pizza div").length > 10) {  
	    $(".devamet").css("display", "block");
	}
});

$(".devamet").click(function(e){
  $.post("http://s4-pizza/pizzaver", JSON.stringify({ boy: $(".pizza div").length  })); 
  $("body").css("display", "none");
  setTimeout(function(){ location.reload();  }, 1000);
});

function secMalzeme(x) {
	
	if(x == "nane"){
	   secilenMalzeme.k = " no-repeat -40px 0";
       secilenMalzeme.w = "72px";
       secilenMalzeme.h = "48px";
	}
	if(x == "zeytin") {
       secilenMalzeme.k = "no-repeat 0 0";
       secilenMalzeme.w = "41px";
       secilenMalzeme.h = "40px";		
	}
	if(x == "salam") {
	   secilenMalzeme.k = "no-repeat -111px 0";
       secilenMalzeme.w = "56px";
       secilenMalzeme.h = "48px";		
	}
	if(x == "maydanoz") {
	   secilenMalzeme.k = "no-repeat -166px 0";
       secilenMalzeme.w = "135px";
       secilenMalzeme.h = "60px";				
	}
	if(x == "mantar") {
	   secilenMalzeme.k = "no-repeat -300px 0";
       secilenMalzeme.w = "63px";
       secilenMalzeme.h = "60px";		
	}
	if(x == "sogan") {
	   secilenMalzeme.k = "no-repeat -366px 0";
       secilenMalzeme.w = "70px";
       secilenMalzeme.h = "70px";	
	}
	if(x == "sucuk") {
	   secilenMalzeme.k = "no-repeat 0px -75px";
       secilenMalzeme.w = "88px";
       secilenMalzeme.h = "80px";			
	}
	if(x == "domates") {
	   secilenMalzeme.k = "no-repeat -88px -75px";
       secilenMalzeme.w = "82px";
       secilenMalzeme.h = "80px";			
	}
	if(x == "biber") {
	   secilenMalzeme.k = "no-repeat -172px -75px";
       secilenMalzeme.w = "120px";
       secilenMalzeme.h = "120px";			
	}
	if(x == "peynir") {
	   secilenMalzeme.k = "no-repeat -294px -75px";
       secilenMalzeme.w = "150px";
       secilenMalzeme.h = "130px";				
	}
	bildirim(x + " malzemesi seçildi.");

}


$(".malzemeler").html(`<div id="domates" data-info="Domates" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="sucuk" data-info="Sucuk" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="sogan" data-info="Soğan" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="mantar" data-info="Mantar" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="salam" data-info="Salam" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="biber" data-info="Biber" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>
<div id="zeytin" data-info="Zeytin" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh; "></div>`);


$(".bicak").draggable({
  start: function() {
   
  },
  drag: function() {
    //$(".bicak").css({"background":"url('img/knife_mouse.png') no-repeat 0 0",  "width":"41px", "height": "394px" });
  },
  stop: function() {
    $(".bicak").css({"background":"url(img/knife_table.png) 0px 0px no-repeat",  "width":"400px", "height": "80px" });
  }
});




    $("#domates").draggable();
    $("#domates").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -644px -517px",  "width":"191px", "height": "198px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
	     }
      }
    });
	
    $("#sucuk").draggable();
    $("#sucuk").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat 0 -719px",  "width":"196px", "height": "204px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
	     }
      }
    });
	
	$("#sogan").draggable();
    $("#sogan").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -405px -717px",  "width":"217px", "height": "216px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
         }
      }
    });
	
    $("#mantar").draggable();
    $("#mantar").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -667px -351px",  "width":"176px", "height": "162px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
	     }
      }
    });
	
	$("#salam").draggable();
    $("#salam").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -199px -716px",  "width":"199px", "height": "215px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
         }
      }
    });
	
	$("#biber").draggable();
    $("#biber").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -487px -352px",  "width":"177px", "height": "156px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
         }
      }
    });
	
	$("#zeytin").draggable();
    $("#zeytin").droppable({
      drop: function( event, ui ) {
		 if(ui.draggable.attr("data-info") == "bicak") {
		 $(this).css({"background":"url('img/in_game_stuff.png') no-repeat -144px -217px",  "width":"131px", "height": "123px" });
		 $(".bicak").css({"top":"1vh" });
		 $(this).attr('data-info', 'kesilmis');
         }
      }
    });
	
    $(".kase").droppable({
      drop: function( event, ui ) {
		  info = ui.draggable.attr("data-info");
		  isim = ui.draggable.attr("id");
		   
		  if(info == "kesilmis"){
		  ui.draggable.css({"transition":"1s", "top":"-500vh"});
		  
		  
		  setTimeout(function(){ ui.draggable.remove(); }, 1500);
		  }else {
			  bildirim(info + "'in kesilmesi lazım.");
		  }
		  

		 setTimeout(function(){  
 
		 if($(".malzemeler div").length > 1) {  }else {
			 
			/// MALZEMELER DOĞRANDIKTAN SONRASI
			
			$(".tezgah").css({"transition":"2s","bottom":"-100vh"});
			 setTimeout(function(){   $(".ocak").css({"display":"block"}); }, 1000);
			$("body").css({"background":"url(img/arkaplan.jpg)","background-size":"cover"});
			
			
		 }
		 
		 }, 1000);
      }
    });
	 

function bildirim(x) {
	$(".bildirim h1").html(x);
	$(".bildirim").css({  "top":"0", "color":"red"});
	setTimeout(function(){ $(".bildirim").css({ "top":"-50vh"}); }, 2500);
}
	
	

 
 