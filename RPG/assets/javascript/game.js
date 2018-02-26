$(document).ready(function() {
  console.log("ready!");
  //NOTE player contructor responsible for creating and managing player attributes/methods
  var Player = function(config) {
    this.name = config.name;
    this.hp = config.hp;
    this.defense = config.defense;
    this.attack = config.attack;
  }
  //NOTE object variables non initialized
  var kitty,
  vaccum,
  mop,
  shadow;
  //NOTE begin player configs
  kitty = {
    name: "kitty",
    hp: 60,
    defense: 3,
    attack: 17
  };
  vaccum = {
    name: "vaccum",
    hp: 90,
    defense: 5,
    attack: 7
  };
  mop = {
    name: "mop",
    hp: 100,
    defense: 6,
    attack: 11
  };
  shadow = {
    name: "shadow",
    hp: 50,
    defense: 3,
    attack: 25
  };
  //NOTE end player configs

  //NOTE create our players
  var kittyPlayer = new Player(kitty);
  var vaccumPlayer = new Player(vaccum);
  var mopPlayer = new Player(mop);
  var shadowPlayer = new Player(shadow);
  var playersArray = [
    kittyPlayer,
    vaccumPlayer,
    mopPlayer,
    shadowPlayer
  ]

  //NOTE start selected player until chosen
  //NOTE enemies array is empty until we know who the selected player is
  var gameStarted = false;

  function moveCharacter(characterToMove, destination) {
    console.log("character to move: ", characterToMove);
    console.log("destination: ", destination);
  }

  function beginGame(chosenPlayer, allPlayers) {
    // console.log("chosen player: ", chosenPlayer);
    // console.log("enemies: ", allPlayers);
    var playersAndEnemies = createPlayerAndEnemies(chosenPlayer, allPlayers);
    var selectedPlayer = playersAndEnemies.selectedPlayer;
    var allEnemies = playersAndEnemies.currentEnemies;
    console.log("players and enemies: ", playersAndEnemies);
  }

  function createPlayerAndEnemies(name, players) {
    var chosenPlayer;
    var enemies = [];
    // console.log("name: ", name);
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        chosenPlayer = players[i];
      } else {
        enemies.push(players[i]);
      }
    }
    return {
      selectedPlayer: chosenPlayer,
      currentEnemies: enemies
    }
  }

  function getPlayerObject(name) {
    var chosenPlayer;
    // console.log("name: ", name);
    for (var i = 0; i < playersArray.length; i++) {
      if (playersArray[i].name === name) {
        chosenPlayer = playersArray[i];
        break;
      }
    }
    return chosenPlayer;
  }

  var player1;
  var player2;

  // NOTE: click handler for selected player
  $("div .players").click(function(e) {
    // console.log("what is the this", $(this).attr("data-name"));
    // console.log("this is the e target", e.target);
    if (player1 === undefined || player2 === undefined) {
      var playerName = $(this).attr("data-name");
    }

      //gameStarted = true;
      //beginGame(playerName, playersArray);
      // console.log("has the game started? ", gameStarted);

      // 1. get player object (i.e. attack, defense,...)
      // 2. save that player as player1 & put them in arena
      // 3. repeat from 1 but save as player2
      // 4. display attack button
      // 5. on attack button click alternate attacks until one person's hp <= 0
      // 6. show that character died
      // 7. allow user to pick new opponent
      var playerObj = getPlayerObject(playerName);
      if (player1 !== undefined) {
        player2 = playerObj;
      } else {
        player1 = playerObj;
      }

      console.log('player1', player1);
      console.log('player2', player2);

      // put player in arena
      var $player = $(this);
      $player.remove();
      $("#game-board").append(`
        <div class="col-lg-6">
          <div id="${playerObj.name}"></div>
          <span>HP: <span id="${playerObj.name}-hp">${playerObj.hp}</span></span>

        </div>
      `);
      $("#" + playerObj.name).append($player);
      // display attack button if needed
      if (player1 !== undefined && player2 !== undefined) {
        $("#game-board").append(`
          <div class="col-lg-12">
            <button class="btn btn-danger form-control" id="attackBtn">Attaaaaaaaak!</button>
          </div>
        `);
        var player1IsAttacking = true; // TODO: randomize
      }
    // }
  // });

        function nextAttack() {
          if (player1IsAttacking && player2.hp >= 0) {
          // } else (player2IsAttacking && player1.hp >= 0) {
          //   runThatGame();
          // }
            damageDone = player1.attack - player2.defense
            player2.hp -= damageDone;
            $("#description").html(`
              <span>${player1.name} attacked ${player2.name} and did ${damageDone} damage!
            `);
            $(`#${player2.name}-hp`).text(player2.hp);
          } else {
            damageDone = player2.attack - player1.defense
            player1.hp -= damageDone;
            console.log("damageDone", damageDone);
            $("#description").html(`
              <span>${player2.name} attacked ${player1.name} and did ${damageDone} damage!
            `);
            $(`#${player1.name}-hp`).text(player1.hp);
          }
        }
        $("#attackBtn").click(function() {
          // 1. determine who is attacking
          // 2. attacker attack - defenders defense -= defenders hp
          // 3. display what happened on the screen
          console.log('attack button clicked!');
          var damageDone;
          var randomAttack = Math.floor(Math.random() * 4 + 1);
          console.log(randomAttack);
          var runThatGame = setInterval(nextAttack, 1000);

          console.log('player1', player1);
          console.log('player2', player2);
          player1IsAttacking = !player1IsAttacking;

        });
      });

})
