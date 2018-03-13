$(document).ready(function() {
  console.log('ready!');

  // constructor function to construct Players as {}
  function Players(name, hp, defense, attack) {
    this.name = name,
    this.hp = hp,
    this.defense = defense,
    this.attack = attack
  };
  // // methods on Players are defined through prototype
  // Players.prototype.defense = function() {
  //   damageDone = badPlayer.attack - badPlayer.defense;
  //   badPlayer.hp -= damageDone;
  // };
  // Players.prototype.attack = function() {
  //   damageDone = goodPlayer.attack - badPlayer.defense;
  //   goodPlayer.hp -= damageDone;
  // };

  var Kitty;
  var Vacuum;
  var Mop;
  var Shadow;

  // creates all Players {} w/ arguments by calling new
  kitty = new Players('Kitty', 60, 17, 33);
  vacuum = new Players('Vacuum', 90, 25, 12);
  mop = new Players('Mop', 100, 16, 10);
  shadow = new Players('Shadow', 50, 3, 2);
  var evilArray = [kitty, vacuum, mop, shadow];

  var player1;
  var player2;
  var playerName;
  var player1chosen = false;
  var player2chosen = false;
  var gameOver = false;

  function movePlayer(selector, el, playerObj) {
    var hpChild = $(el).children().filter('.hp').children()[0];
    // console.log('these are all of the clicked divs hp children: ', $(el).children().filter('.hp').children());
    // console.log(hpChild);
    // console.log('this in movePlayer function: ', this);
    // console.log(playerObj.hp, 'this is the playerObj.hp');
    $(hpChild).html(playerObj.hp);
    $(selector).append(el);
    $('.player').css('width', '300px');
  }

  function getPlayerObj(playerName) {
    var chosenPlayer;
    for (var i = 0; i < evilArray.length; i++) {
      if (playerName === evilArray[i].name) {
        chosenPlayer = evilArray[i];
      }
    }
    // console.log('chosenPlayer is: ', chosenPlayer);
    return chosenPlayer;
  }

  function chooseEvil(playerName) {
    var evilObj = getPlayerObj(playerName);
    // console.log('this is the evil obj from the chooseEvil func', evilObj);
    $("#attackBtn").css('display', 'block');
    return evilObj;
  }

  function chooseGood(playerName) {
    // console.log('playerName is: ', playerName);
    var goodObj = getPlayerObj(playerName);
    // console.log('this is the player obj from the choosegood func', goodObj);
    return goodObj;
  }

  function startGame() {
    $('#evilTitle, .thePitch').css('display', 'none');
    $('#instructions').html('Choose your player to do battle. The strongest player will win satisfaction, glory, and gloating privileges. Fight!');
  }

$('.player').one('click', function (e) {
  $('#instructions, #playersTag').css('display', 'none');
  $('.thePitch').css('display', 'inline');
  $('#badGuys').html(' Fight one bad-guy at a time by clicking each Evil-doer. Use strategy to defeat them all!');
  playerName = $(this).attr('data-name');
  var playerObj = getPlayerObj(playerName);
  // console.log('this is the player obj from click handler: ', playerObj);
  if (!player1chosen ) {
    player1chosen = true;
    goodPlayer = chooseGood(playerName);
    movePlayer("#chosenOne", this, goodPlayer);
    // console.log('this: ', this);
    // console.log('goodPlayer: ', goodPlayer);
    // console.log('good hp: ', goodPlayer.hp);
    $('#chosenTitle').html('The Chosen One:');
  } else {
    if (!player2chosen ) {
      player2chosen = true;
      badPlayer = chooseEvil(playerName);
      movePlayer("#evilDude", this, badPlayer);
      $('#evilInside').html('The Bad Guy:');
    }
  }
})

var goodPlayer;
var badPlayer;
var toTheDeath = function() {
  return setInterval(nextAttack, 1000);
  }

$("#attackBtn").click(function() {
  nextAttack();
  toTheDeath();
})

function nextAttack() {
  var player1attack = true;
  var player2attack = false;
  if (player1attack  = true && badPlayer.hp >= 0) {
    // console.log(goodPlayer.attack, 'goodPlayer.attack');
    // console.log(badPlayer.defense, 'badPlayer.defense');
    damageDone = goodPlayer.attack - badPlayer.defense;

    // $(goodPlayer).children().filter('.hp').children()[0].html(damageDone);
    // $(hpChild).html(playerObj.hp);
    // console.log(damageDone);
    if (damageDone < 0) {
      badPlayer.hp += damageDone;
      console.log(badPlayer.hp);
      $('#evilDude').find('span').empty().append(badPlayer.hp);
    } else {
      badPlayer.hp -= damageDone;
      console.log(badPlayer.hp);
      $('#evilDude').find('span').empty().append(badPlayer.hp);
    }
    // console.log('badPlayer.hp decreases to: ', badPlayer.hp);
    // console.log('goodPlayer.hp is still: ', goodPlayer.hp);
    player1attack = false;
    player2attack = true;
  }
  if (player2attack = true && goodPlayer.hp >= 0) {
    // console.log(badPlayer.attack, 'badPlayer.attack');
    // console.log(goodPlayer.defense, 'goodPlayer.defense');
    totalDamage = badPlayer.attack - goodPlayer.defense;
    // $(badPlayer).children().filter('.hp').children()[0].html(totalDamage);
    // console.log(totalDamage);
    if (totalDamage < 0) {
      goodPlayer.hp += totalDamage;
      console.log(goodPlayer.hp);
      $('#chosenOne').find('span').empty().append(goodPlayer.hp);
    } else {
      goodPlayer.hp -= totalDamage;
      console.log(goodPlayer.hp);
      $('#chosenOne').find('span').empty().append(goodPlayer.hp);
    }
    // console.log('goodPlayer.hp decreases to: ', goodPlayer.hp);
    // console.log('badPlayer.hp is still: ', goodPlayer.hp);
    player1attack = true;
    player2attack = false;
  }

  var winner;
  if (badPlayer.hp <= 0) {
    winner = goodPlayer.name;
  } else if (goodPlayer.hp <= 0) {
    winner = badPlayer.name;
  }

}

function defeatedMssg() {
  var defeated = setInterval()
  if ((badPlayer.hp <= 0) || (goodPlayer.hp <= 0)) {
    $("#attackBtn").hide();
    $('#attack').append(winner + ' has won this battle!')
    player2chosen = false;
  }
}

// $('#winnerMssg').append('<h2>GAME OVER</h2>');
// gameOver = true;

startGame();
})
