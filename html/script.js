window.addEventListener('message', function (event) {
    if (event.data.action === "pizza") { $("body").css("display", "block"); }
});

var secilenMalzeme    = {};
secilenMalzeme.k      = "no-repeat 0 0";
secilenMalzeme.w      = "41px";
secilenMalzeme.h      = "40px";

$(".pizza").click(function(e) {
    var num = Math.floor((Math.random() * 10) + 1);
    var img = $(`<div id="${num}_w"
        style="position:absolute;
        top:${e.pageY}; left: ${e.pageX};
        background: url('img/ings_on_pizza.png') ${secilenMalzeme.k};
        width: ${secilenMalzeme.w};
        height: ${secilenMalzeme.h};" ></div>`);
    $(".pizza").append(img);

    if ($(".pizza div").length > 10) {
        $(".devamet").css("display", "block");
    }
});

$(".devamet").click(function(e) {
    $.post("http://s4-pizza/pizzaver", JSON.stringify({ boy: $(".pizza div").length }));
    $("body").css("display", "none");
    // [FIX 1] Replaced location.reload() with resetUI().
    // The body is already hidden above so no visual jank occurs during reset.
    setTimeout(function() { resetUI(); }, 1000);
});

function secMalzeme(x) {
    if (x === "nane") {
        secilenMalzeme.k = " no-repeat -40px 0";
        secilenMalzeme.w = "72px";
        secilenMalzeme.h = "48px";
    }
    if (x === "zeytin") {
        secilenMalzeme.k = "no-repeat 0 0";
        secilenMalzeme.w = "41px";
        secilenMalzeme.h = "40px";
    }
    if (x === "salam") {
        secilenMalzeme.k = "no-repeat -111px 0";
        secilenMalzeme.w = "56px";
        secilenMalzeme.h = "48px";
    }
    if (x === "maydanoz") {
        secilenMalzeme.k = "no-repeat -166px 0";
        secilenMalzeme.w = "135px";
        secilenMalzeme.h = "60px";
    }
    if (x === "mantar") {
        secilenMalzeme.k = "no-repeat -300px 0";
        secilenMalzeme.w = "63px";
        secilenMalzeme.h = "60px";
    }
    if (x === "sogan") {
        secilenMalzeme.k = "no-repeat -366px 0";
        secilenMalzeme.w = "70px";
        secilenMalzeme.h = "70px";
    }
    if (x === "sucuk") {
        secilenMalzeme.k = "no-repeat 0px -75px";
        secilenMalzeme.w = "88px";
        secilenMalzeme.h = "80px";
    }
    if (x === "domates") {
        secilenMalzeme.k = "no-repeat -88px -75px";
        secilenMalzeme.w = "82px";
        secilenMalzeme.h = "80px";
    }
    if (x === "biber") {
        secilenMalzeme.k = "no-repeat -172px -75px";
        secilenMalzeme.w = "120px";
        secilenMalzeme.h = "120px";
    }
    if (x === "peynir") {
        secilenMalzeme.k = "no-repeat -294px -75px";
        secilenMalzeme.w = "150px";
        secilenMalzeme.h = "130px";
    }
    bildirim(x + " malzemesi seçildi.");
}

// [FIX 2] Builds ingredient divs with fresh random positions and wires up
// draggable + droppable on each. Called on initial load and by resetUI().
function setupIngredients() {
    $(".malzemeler").html(
        `<div id="domates" data-info="Domates" style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="sucuk"   data-info="Sucuk"   style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="sogan"   data-info="Soğan"   style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="mantar"  data-info="Mantar"  style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="salam"   data-info="Salam"   style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="biber"   data-info="Biber"   style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>
<div id="zeytin"  data-info="Zeytin"  style="top: ${Math.floor((Math.random() * 70) + 1)}vh; right:${Math.floor((Math.random() * 50) + 1)}vh;"></div>`
    );

    // Wire up draggable + knife-drop handling for each ingredient.
    // Each element starts with data-info = its display name.
    // On knife drop the visual changes and data-info becomes 'kesilmis'
    // so the kase droppable can accept it.

    $("#domates").draggable();
    $("#domates").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -644px -517px", "width": "191px", "height": "198px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#sucuk").draggable();
    $("#sucuk").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat 0 -719px", "width": "196px", "height": "204px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#sogan").draggable();
    $("#sogan").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -405px -717px", "width": "217px", "height": "216px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#mantar").draggable();
    $("#mantar").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -667px -351px", "width": "176px", "height": "162px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#salam").draggable();
    $("#salam").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -199px -716px", "width": "199px", "height": "215px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#biber").draggable();
    $("#biber").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -487px -352px", "width": "177px", "height": "156px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });

    $("#zeytin").draggable();
    $("#zeytin").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("data-info") === "bicak") {
                $(this).css({ "background": "url('img/in_game_stuff.png') no-repeat -144px -217px", "width": "131px", "height": "123px" });
                $(".bicak").css({ "top": "1vh" });
                $(this).attr("data-info", "kesilmis");
            }
        }
    });
}

// Initial load — populate the tezgah with randomized ingredients.
setupIngredients();

// The bicak (knife) is a persistent element; draggable is set up once only.
$(".bicak").draggable({
    start: function() { },
    drag:  function() { },
    stop:  function() {
        $(".bicak").css({ "background": "url(img/knife_table.png) 0px 0px no-repeat", "width": "400px", "height": "80px" });
    }
});

// The kase (bowl) is a persistent element; droppable is set up once only.
// Accepts cut ingredients, removes them from the DOM, and triggers the
// tezgah → ocak stage transition when all ingredients have been collected.
$(".kase").droppable({
    drop: function(event, ui) {
        var info = ui.draggable.attr("data-info");
        var isim = ui.draggable.attr("id");

        if (info === "kesilmis") {
            ui.draggable.css({ "transition": "1s", "top": "-500vh" });
            setTimeout(function() { ui.draggable.remove(); }, 1500);
        } else {
            bildirim(info + "'in kesilmesi lazım.");
        }

        setTimeout(function() {
            if ($(".malzemeler div").length > 1) {
                // still ingredients left — nothing to do
            } else {
                // All ingredients collected — transition to the oven stage.
                $(".tezgah").css({ "transition": "2s", "bottom": "-100vh" });
                setTimeout(function() { $(".ocak").css("display", "block"); }, 1000);
                $("body").css({ "background": "url(img/arkaplan.jpg)", "background-size": "cover" });
            }
        }, 1000);
    }
});

// [FIX 1] Targeted DOM reset — replaces location.reload().
// Resets all state that was mutated during one pizza cycle:
//   - body background overlay
//   - tezgah position (snapped instantly while body is hidden)
//   - knife position and appearance
//   - ocak visibility
//   - pizza toppings
//   - submit button visibility
//   - selected ingredient state
//   - ingredient divs (rebuilt with fresh random positions + new handlers)
// Nothing is reloaded, no handlers are re-bound except the ingredient ones
// (which are on freshly rebuilt DOM nodes and require it).
function resetUI() {
    // Restore body background to the default dark overlay.
    $("body").css({ "background": "rgb(0 0 0 / 30%)", "background-size": "" });

    // Snap tezgah back to visible position instantly.
    // transition:0s is safe here because body is display:none during reset —
    // the player never sees this snap. The transition is restored below.
    $(".tezgah").css({ "transition": "0s", "bottom": "0vh" });

    // Reset knife to its default resting appearance and position.
    $(".bicak").css({
        "top":        "",
        "left":       "",
        "background": "url(img/knife_table.png) 0px 0px no-repeat",
        "width":      "400px",
        "height":     "80px"
    });

    // Hide the oven / ingredient-selection stage.
    $(".ocak").css("display", "none");

    // Remove all placed toppings from the pizza.
    $(".pizza").empty();

    // Hide the submit (devamet) button.
    $(".devamet").css("display", "none");

    // Reset selected ingredient to the default (zeytin sprite offsets).
    secilenMalzeme.k = "no-repeat 0 0";
    secilenMalzeme.w = "41px";
    secilenMalzeme.h = "40px";

    // Rebuild ingredient divs with new random positions and re-bind handlers.
    setupIngredients();

    // Re-enable smooth tezgah transition for the next cycle.
    // The short timeout ensures the bottom:0vh snap has already been painted
    // before we restore the transition, preventing it from animating backward.
    setTimeout(function() {
        $(".tezgah").css("transition", "5s");
    }, 50);
}

function bildirim(x) {
    $(".bildirim h1").html(x);
    $(".bildirim").css({ "top": "0", "color": "red" });
    setTimeout(function() { $(".bildirim").css({ "top": "-50vh" }); }, 2500);
}