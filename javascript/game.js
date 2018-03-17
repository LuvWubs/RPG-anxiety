$(document).ready(function() {

  function Players(name, hp, defense, attack) {
    this.name = name,
    this.hp = hp,
    this.defense = defense,
    this.attack = attack
  }

  var Kitty;
  var Vacuum;
  var Mop;
  var Shadow;

  kitty = new Players('Kitty', 60, 17, 33);
  vacuum = new Players('Vacuum', 70, 20, 27);
  mop = new Players('Mop', 50, 16, 32);
  shadow = new Players('Shadow', 90, 13, 12);
  var evilArray = [kitty, vacuum, mop, shadow];

  var playerName;
  var player1chosen = false;
  var player2chosen = false;
  // var gameOver = true;

  function movePlayer(selector, el, playerObj) {
    var hpChild = $(el).children().filter('.hp').children()[0];
    $(hpChild).html(playerObj.hp);
    $(selector).append(el);
    $('.player').css('width', '300px');
  };

  function getPlayerObj(playerName) {
    var chosenPlayer;
    for (var i = 0; i < evilArray.length; i++) {
      if (playerName === evilArray[i].name) {
        chosenPlayer = evilArray[i];
      }
    }
    return chosenPlayer;
  };

  function chooseEvil(playerName) {
    var evilObj = getPlayerObj(playerName);
    $("#attackBtn").css('display', 'block');
    return evilObj;
  };

  function chooseGood(playerName) {
    var goodObj = getPlayerObj(playerName);
    return goodObj;
  };

  function startGame() {
    // gameOver = false;
    $('#instructions, #playersTag, #playersRow, .jumbotron').css('display', 'block');
    $('#evilTitle, .thePitch').css('display', 'none');
    $('#instructions').html('Choose your player to do battle. The strongest player will win satisfaction, glory, and gloating privileges. Fight!');
  };

  $('.player').one('click', function (e) {
    $('#winnerMssg').empty();
    $('#instructions, #playersTag, .jumbotron').css('display', 'none');
    $('.thePitch').css('display', 'inline');
    $('#badGuys').html(' Fight one bad-guy at a time by clicking each Evil-doer. Use strategy to defeat them all!');
    playerName = $(this).attr('data-name');
    var playerObj = getPlayerObj(playerName);
    console.log(playerObj);

    console.log(this);
    if (!player1chosen) {
      player1chosen = true;
      goodPlayer = chooseGood(playerName);
      movePlayer("#chosenOne", this, goodPlayer);
      $('#chosenTitle').html('The Chosen One:');
      // var hpChild = $(this).children().filter('.hp').children()[0];
      // $(hpChild).html(playerObj.hp);
    } else {
      if (!player2chosen) {
        player2chosen = true;
        badPlayer = chooseEvil(playerName);
        movePlayer("#evilDude", this, badPlayer);
        $('#evilInside').html('The Bad Guy:');
      }
    }
  });

  var goodPlayer;
  var badPlayer;
  var winner;

  $("#attackBtn").click(function() {
    // toTheDeath();
    nextAttack();
  });

  // var toTheDeath = function() {
  //   setInterval(nextAttack, 1000);
  //   console.log('this is running every 1sec');
  // };

  function nextAttack() {
    var player1attack = true;
    var player2attack = false;
    if (player1attack  = true && badPlayer.hp > 0) {
      damageDone = goodPlayer.attack - badPlayer.defense;
      //NOTE if block to account for negative numbers if defense>attack
      if (damageDone < 0) {
        badPlayer.hp += damageDone;
      } else {
        badPlayer.hp -= damageDone;
      }
      $('#evilDude').find('span').empty().append(badPlayer.hp);
      player1attack = false;
      player2attack = true;
    }

    if (player2attack = true && goodPlayer.hp > 0) {
      totalDamage = badPlayer.attack - goodPlayer.defense;
      if (totalDamage < 0) {
        goodPlayer.hp += totalDamage;
      } else {
        goodPlayer.hp -= totalDamage;
      }

      $('#chosenOne').find('span').empty().append(goodPlayer.hp);
      player1attack = true;
      player2attack = false;
    }

    if (badPlayer.hp <= 0) {
      winner = goodPlayer;
      console.log(winner);
      // clearInterval(toTheDeath);
      // defeatedMssg(winner);
      // return;
    } else if (goodPlayer.hp <= 0) {
      winner = badPlayer;
      console.log(winner);
    }

    if (winner !== undefined) {
      clearInterval(nextAttack);
      defeatedMssg(winner);
    }

  };

  function defeatedMssg(winner) {
    if (winner.name === goodPlayer.name) {
      //NOTE reset goodPlayer.hp
      //NOTE need working numOpponents

      //subtract ChosenOne from evilArray to determine numOpponents
      //for every defeated opponent, subtract 1 from numOpponents
      var numOpponents = evilArray.length - 1;
      numOpponents - 1;
      console.log(numOpponents);

      if (numOpponents === 0) {
        $('#winnerMssg').append(`
          <h2>GAME OVER</h2>
          <h4>Good has triumphed over evil!</h4>
        `)
        // gameOver = true;
      }

      $('#attackBtn').hide();
      $('#winnerMssg').append(`
        <h3>${winner.name} has won this battle!</h3>
        <h5>Choose your next opponent!</h5>
      `)
      player2chosen = false;
      $('#evilDude').empty();

    } else {
      $('#chosenOne').empty();
      $('#attackBtn, #playersRow, #badGuys').hide();
      $('#winnerMssg').append(`
        <h2>GAME OVER</h2>
        <h3>Evil has triumphed!</h3>
        <h4>${winner.name} wins!</h4>
        <button id='again'>Play Again?</button>
      `)
      // gameOver = true;
    }
  };

  $(document).on('click', '#again', function() {
    //NOTE need all players to append to playersRow
    startGame();
  })

  // if (gameOver == true) {
  //     setTimeout(startGame, 3000);
  // }
  startGame();
});
