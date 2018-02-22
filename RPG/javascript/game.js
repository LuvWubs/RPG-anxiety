$(document).ready(function() {

  var players = [player1, player2, player3, player4];
  var strength = {
    "player1" : null,
    "player2" : null,
    "player3" : null,
    "player4" : null
  }

  var gameStart = false;
  var playerToChoose = true;
  var battleOn = false;
  var battleOff = true;
  var p1kill = false;
  var p2kill = false;
  var p3kill = false;
  var p4kill = false;
  var gameOver = false;
  function tempRemove(elements) {
    elements.empty();
  }
  function cloneSiblings(sibs) {
    return sibs.clone();
  }
  function startGame() {
    $("#instructions").innerHTML = "Choose your player to do battle. The strongest player will win satisfaction and glory. Fight!";
    $(".player").on("click", function (e) {
      console.log('What is our e:::', e.target.nodeName);
      var evilDoers = $("#" + e.target.id).parent().siblings()
      var evilClones = cloneSiblings(evilDoers);
      // console.log('EVILLLLLL', evilClones);
      tempRemove(evilDoers);
      // console.log('After temp remove', evilClones);
      $('#evilDoers').append(evilClones);
      playerToChoose = false;
      $(this).data("clicked", "true");
      $("#chosenOne").append($(this));
      // console.log("chosen one chosen");
      // $(this).siblings().data("clicked", "false");
      // $("#evilDoers").append( $(".player").siblings() );
      // console.log("siblings ",($(this).siblings()));

    // let theOthers = $(".player").data("clicked", "no");
    // theOthers.map(function() {
    //   $("#evilDoers").append(theOthers);
    // })

      // if (playerToChoose) {
      //   return false;
      //   chooseEvil();

        // if ($(".player:not(:clicked)")
        //   $("#evilDoers").append($(this));
        // } else {
        //   $("#chosenOne").append($(this));
        // }

      })
      gameStart = true;
    }

    // function chooseEvil() {
    //
    // }
  // }

  // $("#player1").click(function () {
  //
  // })
  startGame();
})
