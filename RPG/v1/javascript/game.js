// will eventually make this game mobile responsive
$(document).ready(function() {
  console.log('ready!');
  //empty var to pass data around during execution w/o passing full obj
  var kitty;
  var vacuum;
  var mop;
  var shadow;

  // constructor function to construct Players as {}
  function Players(name, hp, defense, attack) {
    this.name = name,
    this.hp = hp
  };
  // methods on Players are defined through prototype
  Players.prototype.defense = function() {
    // ****** basic equation of each players defense vs oppon attack
  };
  Players.prototype.attack = function() {
    // ***** basic equation of each players attack vs oppon defense
  };


  // creates all Players {} w/ arguments by calling new
  kitty = new Players('kitty', 60, 3, 17);
  vacuum = new Players('vacuum', 90, 5, 7);
  mop = new Players('mop', 100, 6, 11);
  shadow = new Players('shadow', 50, 3, 25);
  var evilArray = [kitty, vacuum, mop, shadow];

  // ??? constructor function or .create method as best practice
  // // .create method to construct objs w/o a constructor function
  // kitty = Object.create(players){
  //   kitty.name: "kitty",
  //   kitty.hp: 60,
  //   kitty.defense: 3,
  //   kitty.attack: 17
  //   }
  // };
  // // player objs w/ props&values, is fed by players .create method
  // vacuum = {
  //   name: "vacuum",
  //   hp: 90,
  //   defense: 5,
  //   attack: 7
  // };
  // mop = {
  //   name: "mop",
  //   hp: 100,
  //   defense: 6,
  //   attack: 11
  // };
  // shadow = {
  //   name: "shadow",
  //   hp: 50,
  //   defense: 3,
  //   attack: 25
  // };

  var player1;
  var player2;
  var playerName;
  var player1chosen = false;
  var player2chosen = false;
  var gameOver = false;

  function getPlayerObj(playerName) {
    var opponents = [];
    var chosenPlayer;
    for (var i = 0; i < evilArray.length; i++) {
      if (playerName === evilArray[i].name) {
        chosenPlayer = evilArray[i];
      }
      // else {
      //   opponents.push(evilArray[i]);
      // }
    }
    return chosenPlayer;
  }

  function startGame() {
    $('#evilTitle, .thePitch').css('display', 'none');
    $('#instructions').html('Choose your player to do battle. The strongest player will win satisfaction, glory, and gloating privileges. Fight!');
    // chooseGood();
  }

  function chooseGood(playerName) {
    var playerObj = getPlayerObj(playerName);
    console.log('good:', playerObj);
    return playerObj;
  }

  function chooseEvil(playerName) {
    var evilObj = getPlayerObj(playerName);
    console.log('button: ', $("#attackBtn"));
    $("#attackBtn").css('display', 'block');
    return evilObj;
  }

$("#attackBtn").click(function() {

})

$('.player').one('click', function (e) {
  // console.log('player is chosen');
  $('#instructions, #playersTag').css('display', 'none');
  $('.thePitch').css('display', 'inline');
  $('#evilTitle').css('display', 'inline-block').html('Evil-Doers:');
  // will eventually dynamically create divs in html for all new text
  $('#badGuys').html(' Fight one bad-guy at a time by clicking each Evil-doer. Use strategy to defeat them all!');
  $('#chosenTitle').html('The Chosen One:');
  playerName = $(this).attr('data-name');
  var playerObj = getPlayerObj(playerName);
  if (!player1chosen) {
    player1chosen = true;
    var goodPlayer = chooseGood(playerName);
    console.log('good: ', goodPlayer.hp);
    movePlayer("#chosenOne", this, goodPlayer);
  } else {
    if (!player2chosen) {
      var badPlayer = chooseEvil(playerName);
      console.log('bad: ', badPlayer.hp);
      player2chosen = true;
      movePlayer("#evilDude", this, badPlayer);
      $('#evilInside').html('The Bad Guy:');
    }
  }
})

  function movePlayer(selector, el, playerObj) {
    var hpChild = $(el).children().filter('.hp').children()[0];
    $(hpChild).html(playerObj.hp);
    $(selector).append(el);
  }


startGame();
})



//
//       var evilDoers = $('#' + e.target.id).parent().siblings();
//       evilDoers.css('display', 'block');
//       $('#evilDoers').append(evilDoers);
//       playersToChoose--;
//       console.log(playersToChoose);
//
//   if (playersToChoose = 1) {
//     $('.player').on('click', function() {
//       console.log('2nd player chosen');
//       console.log('this is: ', $(this));
//       playersToChoose--;
//       console.log(playersToChoose);
//       var upNext = $("<div id='opponent'><div/>");
//       $(upNext).append($(this));
//       $('#evilOne').append(upNext);
//       $('#battleGround').html('The Chosen Ones. Now: Fight!');
//     })
//   } else if (playersToChoose === 0) {
//     chooseEvil();
//   }
//
  // function chooseEvil(evilArray) {
  //   var thePitch = $(document.createElement('div'));
  //   $('thePitch').append('<input type=button' + 'onclick="toTheDeath()"' + 'id=doBattle />');
  //   $('#doBattle').html('Attaaaaaaack!');
  //   $('#doBattle').on('click',function() {
  //     // decrease strength based on another functions algorithm
  //     $(this).prop('disabled',true);
  //     if (disabled) {
  //       fight();
  //     }
  //   })
  // }
//
//   startGame();
// })
//
//     //   console.log("chosen one chosen");
//     //   $(this).siblings().data("clicked", "false");
//     //   $("#evilDoers").append( $(".player").siblings() );
//     //   console.log("siblings ",($(this).siblings()));
//     //
//     // let theOthers = $(".player").data("clicked", "no");
//     // theOthers.map(function() {
//     //   $("#evilDoers").append(theOthers);
//     // })
//     //
//     // if ($(".player:not(:clicked)")
//     //   $("#evilDoers").append($(this));
//     // } else {
//     //   $("#chosenOne").append($(this));
//     //
//     //   if (playerToChoose) {
//     //     return false;
//     //   }
//
//     // $("#playersTag").html("Battleground:");
//     // $("button").append("<button />").html("Attaaaaaaack!");
