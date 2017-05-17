import Phaser from 'phaser'

export default class TextBox{

    fadeOut() {
	var fadeOutTween = this.game.add.tween(this.graphics).to(
	    {alpha: 0},
	    this.fade_time,
	    Phaser.Easing.Linear.None,
	    true)

	this.game.add.tween(this.text).to(
	    {alpha: 0},
	    this.fade_time,
	    Phaser.Easing.Linear.None,
	    true)

	this.bonus_text.forEach(function(entry) {
	    this.game.add.tween(entry).to(
		{alpha: 0},
		this.fade_time,
		Phaser.Easing.Linear.None,
		true)
	}, this);

	fadeOutTween.onComplete.addOnce(
	    () => { this.finished.dispatch() }, this);
    }

    fadeIn() {
	var fadeInTween = this.game.add.tween(this.graphics).to(
	    {alpha: 0.8},
	    this.fade_time,
	    Phaser.Easing.Linear.None,
	    true)

	fadeInTween.onComplete.addOnce(
	    () => { this.runText();  }, this);
    }

    show_choices(){
	this.bonus_text.forEach(function(entry) {
	    entry.visible = true;
	});

	// For now
	this.game.input.onDown.addOnce(this.fadeOut, this)
    }

    fast_forward_text(){
	this.game.time.events.remove(this.print_timer);
	this.current_text += this.rtext;
	this.rtext = '';
	this.text.setText(this.current_text);

	this.text_complete.dispatch()
    }

    print_next_letter(){
	this.current_text += this.rtext[0];
	this.rtext = this.rtext.substr(1);
	this.text.setText(this.current_text);

	if (this.rtext.length == 0){
	    console.log("TEXT OUT")
	    this.text_complete.dispatch()
	}
    }

    text_out() {
	if(this.game.input.onDown)
	    this.game.input.onDown.dispose()

	if(this.choices)
	    this.show_choices();
	else
	    this.game.input.onDown.addOnce(this.fadeOut, this)
    }

    addChoices(choices){
	this.choices = choices;
	console.log("CHoices added");
    }

    runText(){
	this.current_text = ''
	var pos = {x: this.x + this.margin,
		   y: this.y + this.margin}

	if(this.origin){
	    var label = game.add.text(pos.x, pos.y, this.origin + ":")
	    this.bonus_text.push(label);
	    pos.y += label.height;
	}

	this.text = game.add.text(pos.x, pos.y, this.current_text);
	this.text.font = 'Lato';
	this.text.fontSize = 30;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = this.width-(this.margin*2);
	this.text.addColor("#000000", 0);
	pos.y += this.text.height;

	if(this.choices){
	    var choice = game.add.text(pos.x, pos.y, "a choice!")
	    choice.visible = false;
	    choice.inputEnabled = true;
	    //choice.events.onInputOver.add(over, this);
	    //choice.events.onInputDown.add(down, this);
	    this.bonus_text.push(choice)
	}

	this.print_timer = game.time.events.repeat(
	    this.text_speed,
	    this.rtext.length,
	    this.print_next_letter,
	    this);

	this.game.input.onDown.addOnce(this.fast_forward_text, this)
    }

    constructor(game, x, y, raw_text, origin) {
	this.game = game;
	this.rtext = raw_text;
	this.bonus_text = []
	this.x = x;
	this.y = y;
	this.width = game.width-(x*2);
	this.height = game.height-y-x;
	this.margin = this.width*0.01
	this.origin = origin
	this.fade_time = 200;
	this.text_speed = Phaser.Timer.SECOND * 0.05;

	this.text_complete = new Phaser.Signal();
	this.text_complete.addOnce(this.text_out, this);

	this.finished = new Phaser.Signal();

	this.graphics = game.add.graphics(x, y);
	this.graphics.beginFill(0xFFFFFF);
	this.graphics.drawRect(0, 0, this.width, this.height);
	this.graphics.endFill();
	this.graphics.alpha = 0;

	this.fadeIn()
    }
}
