jaws.onload = function() {
	jaws.unpack();
	jaws.assets.add(["img/bc.png", "img/fire.png", "img/corr.png", "img/shot.png", "img/icons.png"]);
	if(playsOGG())      { jaws.assets.add(["music/ogg/loop.ogg"]) }
  	else if(playsMP3()) { jaws.assets.add(["music/mp3/loop.ogg"]) }
	jaws.start(BrowserCraft, {fps: 30});
}
function playsOGG() { var audio = new Audio(); return !!audio.canPlayType && audio.canPlayType( 'audio/ogg; codecs="vorbis"' ) }
function playsMP3() { var audio = new Audio(); return !!audio.canPlayType && audio.canPlayType( 'audio/mpeg;' ) }

function BrowserCraft() {
	var player;
	var fire;
	var shots = new SpriteList();
	var enemies = new SpriteList();
	var lives = new SpriteList();
	var powers = new SpriteList();
	var move;
	var sound_icon;
	var icon_set;
	var audio;
	var time = $.now();

	this.setup = function() {
		player = new jaws.Sprite({x:400,y:400,scale:0.3,anchor:"center"});
		player.move = function(x,y) { fire.x += x; this.x += x; fire.y += y; this.y += y; }
		player.blink = function() { 
			player.blinking = setInterval(function() {
				fire.alpha = player.alpha = (player.alpha === 1) ? 0 : 1;
			}, 250);
		}
		player.drawRect = jaws.Rect;
		player.fire_time = 400;
		player.can_fire = true;
		player.shots = 1;
		player.anim = new jaws.Animation({
			sprite_sheet: "img/bc.png",
			frame_size: [290,302],
			frame_duration: 140
		});
		player.setImage(player.anim.frames[0]);

		fire = new jaws.Sprite({x:400,y:448,scale:0.3,anchor:"center"});
		fire.anim = new jaws.Animation({
			sprite_sheet: "img/fire.png",
			frame_size: [56,44],
			frame_duration: 140
		});
		fire.setImage(fire.anim.frames[0]);

		icon_set = new jaws.Animation({
			sprite_sheet: "img/icons.png",
			orientation: "right",
			frame_size: [35,35],
			frame_duration: 140
		});

		sound_icon = new jaws.Sprite({x:780,y:530,scale:1,anchor:"center"});
		sound_icon.unmute = icon_set.slice(6,9);
		sound_icon.mute = icon_set.slice(3,6);
		sound_icon.play = false;
		sound_icon.setImage(sound_icon.mute.frames[0]);

		lives.count = 0;
		for(var i=0; i<3; i++) {
			lives.push(new Life());
		}

		playThatFunkyMusic();

		jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
	}

	this.update = function() {
		move = 120 / jaws.game_loop.fps / (1+1/jaws.game_loop.tick_duration);
		if (move > 15)	return;

		enemies.forEach(function(enemy) {
			shots.forEach(function(shot) {
				if(enemy.rect.collideRect(shot.rect)) { //(shot.x+4,shot.y,10,40))) {
					enemies.remove(enemy);
					shots.remove(shot);
				}
			});

			if(enemy.rect.collideRect(player.rect) && $.now()-time>3000) {
				player.blink();
				setTimeout(function() { clearInterval(player.blinking); fire.alpha = player.alpha = 1; }, 3000);
				lives.pop();
				lives.count -= 1;
				if(lives.count === 0) jaws.switchGameState(Dead);
				time = $.now();
			}
		});

		powers.forEach(function(powerUp) {
			if(powerUp.rect.collideRect(player.rect)) {
				if(powerUp.type === "shots") {
					if(player.shots <= 3) {
						player.shots += 1;
						powers.remove(powerUp);
					}
				}

				if(powerUp.type === "life") {
					if(lives.count < 20) {
						powers.remove(powerUp);
						lives.push(new Life());
					}
				}
			}
		});

		if(jaws.pressed("left")  || jaws.pressed("a")) { player.move(-move,0); }
		if(jaws.pressed("right") || jaws.pressed("d")) { player.move(move,0); }
		if(jaws.pressed("up")    || jaws.pressed("w")) { player.move(0, -move); }
		if(jaws.pressed("down")  || jaws.pressed("s")) { player.move(0, move); }

		player.rect = player.drawRect(player.x-25,player.y-35,50,80);

		if(jaws.pressed("space")) {
			if(player.can_fire) {
				attack();
				player.can_fire = false;
				setTimeout(function() { player.can_fire = true; }, player.fire_time);
			}
		}

		jaws.on_keydown("left_mouse_button", function() {
			var x = jaws.mouse_x, y = jaws.mouse_y;
			if((x>750) && (jaws.width>x) && (y>515) && (jaws.height>y)) {
				sound_icon.play = sound_icon.play ? false : true;
				sound_icon.play ? audio.play() : audio.pause();
			}
		});

		if(Math.random() < .05) {
			enemies.push(new Corruptor(getRandomInt(40,760), -50));
		}
		if(Math.random() < .001) { //001
			var chance = Math.random();
			if(chance < .7 && player.shots < 4)	powers.push(new PowerUp("shots"));
			if(chance >= .7 && lives.count < 20) powers.push(new PowerUp("life"));
		}
	
		shots.removeIf(isOutside);
		enemies.removeIf(isOutside); 
		powers.removeIf(isOutside);
		player.setImage(player.anim.next());
		fire.setImage(fire.anim.next());
		if(sound_icon.play)	sound_icon.setImage(sound_icon.unmute.next());
		else sound_icon.setImage(sound_icon.mute.next());
	}

	this.draw = function() {
		jaws.clear();
		player.draw();
		powers.draw();
		fire.draw();
		enemies.draw();
		shots.draw();
		sound_icon.draw();
		lives.draw();
	}

	function PowerUp(type) {
		this.x = getRandomInt(40,760);
		this.y = -50;
		this.type = type;

		switch(this.type) {
			case "shots": this.anim = icon_set.slice(9,12); break;
			case "life": this.anim = icon_set.slice(12,15); break;
		}

		this.drawRect = jaws.Rect;
		this.draw = function() {
			this.y += move/2;
			this.rect = this.drawRect(this.x,this.y,35,35);
			jaws.context.drawImage(this.anim.next(),this.x,this.y);
		}
	}

	function Life() {
		this.x = 762-40*lives.count;
		this.y = 5;
		lives.count += 1;

		this.anim = icon_set.slice(0,3);

		this.draw = function() {
			jaws.context.drawImage(this.anim.next(),this.x,this.y);
		}
	}

	function Corruptor(x, y) {
		this.x = x;
		this.y = y;

		this.anim = new jaws.Animation({
			sprite_sheet: "img/corr.png",
			frame_size: [80,80],
			frame_duration: 140
		});
		this.drawRect = jaws.Rect;
		this.draw = function() {
			this.y += move;
			this.rect = this.drawRect(this.x+15,this.y+2,44,68);
			jaws.context.drawImage(this.anim.next(), this.x, this.y);
		}
	}

	function Shot(x, y) {
		this.x = x;
		this.y = y;

		this.anim = new jaws.Animation({
			sprite_sheet: "img/shot.png",
			frame_size: [20,40],
			frame_duration: 140
		});
		this.drawRect = jaws.Rect;
		this.draw = function() {
			this.y -= move*1.5;
			this.rect = this.drawRect(this.x+4,this.y,10,40);
			jaws.context.drawImage(this.anim.next(), this.x, this.y);
		}
	}

	function attack() {
		var x = player.x-9, y = player.y-65; //middle shot

		if(player.shots === 1 || player.shots === 3 || player.shots === 4) shots.push(new Shot(x,y));
		if(player.shots === 2 || player.shots === 4) {
			shots.push(new Shot(x-13,y-3));
			shots.push(new Shot(x+13,y-3));
		}
		if(player.shots === 3 || player.shots === 4) {
			shots.push(new Shot(x-28,y+39));
			shots.push(new Shot(x+28,y+39));
		}

	}

	function isOutside(item) {
		return (item.y < -100 || item.y > jaws.height+100)
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
  	}

  	function playThatFunkyMusic() {
  		var song;
  		window.onblur = function()  { audio && audio.pause() }
    	window.onfocus = function() { if(sound_icon.play) { audio && audio.play() } }

    	if(playsOGG()) song = "music/ogg/loop.ogg";
	    else if(playsMP3()) song = "music/mp3/loop.mp3";


    	audio = jaws.assets.get(song);
    	audio.volume = .05;
    	audio.addEventListener('ended', function(){ audio.play(); }, false)
    	//audio.play()
  	}
}

function Dead() {
	this.setup = function() {
		jaws.on_keydown(["enter","space"], function() { jaws.switchGameState(BrowserCraft) });
	} 

	this.draw = function() {
		jaws.clear();
		jaws.context.font = "bold 50pt terminal";
		jaws.context.textAlign = "center";
		//jaws.context.lineWidth = 10;
		jaws.context.fillStyle = "Black";
		jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
		jaws.context.fillText("noob", 400, 165);
		jaws.context.fillText("retry?", 400, 300);
	}
}