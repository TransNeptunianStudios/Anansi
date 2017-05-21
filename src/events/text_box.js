import Phaser from 'phaser'

export default class TextBox2 extends Phaser.Group{

    fadeIn(){
	this.game.add.tween(this).to(
	    {alpha: 1},
	    this.fade_time,
	    Phaser.Easing.Linear.None,
	    true).onComplete.addOnce(
		() => { this.runText(); }, this);
    }

    fadeOut(){
	this.game.add.tween(this).to(
	    {alpha: 0},
	    this.fade_time,
	    Phaser.Easing.Linear.None,
	    true).onComplete.addOnce(
		() => { this.finished.dispatch() }, this);
    }

    textFinish(){
	this.game.input.onDown.removeAll();
	this.game.time.events.remove(this.print_timer);

	this.text.setText(this.text.text + this.raw_text);
	this.raw_text = "";

	if (!this.choices)
	    this.game.input.onDown.addOnce(this.fadeOut, this)
    }

    printNextLetter(){
	if(this.raw_text.length == 0)
	    this.textFinish()
	else{
	    var text = this.text.text += this.raw_text[0];
	    this.raw_text = this.raw_text.substr(1);
	    this.text.setText(text)
	}
    }

    runText(){
	this.alpha = 1;
	this.print_timer = game.time.events.repeat(
	    100,
	    this.raw_text.length+1,
	    this.printNextLetter,
	    this);
	this.game.input.onDown.addOnce(this.textFinish, this)
    }

    addSprites(width, height){
	var upper_left = this.create(0, 0, 'corner');
	upper_left.anchor.setTo(1);

	var upper = this.create(0, 0, 'straight');
	upper.anchor.setTo(0, 1);
	upper.width = width;

	var upper_right = this.create(width, 0, 'corner');
	upper_right.angle = 90
	upper_right.anchor.setTo(1, 1);

	var right = this.create(width, 0, 'straight');
	right.anchor.setTo(0, 1);
	right.angle = 90
	right.width = height;

	var low_left = this.create(0, height, 'corner');
	low_left.angle = -90
	low_left.anchor.setTo(1);

	var left = this.create(0, 0, 'straight');
	left.anchor.setTo(1, 1);
	left.angle = -90
	left.width = height;

	var lower = this.create(0, height, 'straight');
	lower.anchor.setTo(0, 1);
	lower.angle = 180
	lower.width = -width;

	var low_right = this.create(width, height, 'corner');
	low_right.angle = 180
	low_right.anchor.setTo(1, 1);
    }

    over(item) {
	item.addColor("#999900", 0);
    }

    out(item) {
	item.addColor("#000000", 0);
    }

    down(item) {
	console.log(item.text);
	item.answer_handle.dispatch()
	this.fadeOut()
    }

    constructor(game, raw_text, origin, choices) {
	super(game)
	this.x = game.width*0.05;
	this.y = game.height*0.75
	this.alpha = 0

	this.fade_time = 500;
	this.finished = new Phaser.Signal();
	this.raw_text = raw_text;

	var width = game.width - 2 * this.x
	var height = game.height - this.y - this.x//  should be x

	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF);
	graphics.drawRect(0, 0, width, height);
	graphics.endFill();
	this.add(graphics)

	this.addSprites(width, height)

	var text = ""
	if (origin)
	    text += origin + ": "

	this.text = game.add.text( 0, 0, text)
	this.text.font = 'Lato';
	this.text.fontSize = 30;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = width
	this.text.addColor("#000000", 0);
	this.add(this.text)

	if(choices){
	    this.choices = true
	    var cx = 35
	    choices.forEach(function(entry) {
		var choice = game.add.text( cx,
					    this.text.height,
					    entry.text)
		choice.font = 'Lato';
		choice.fontSize = 30;
		choice.bold = true
		choice.addColor("#000000", 0);
		cx += choice.width + 30

		choice.inputEnabled = true;
		choice.events.onInputOver.add(this.over, this);
		choice.events.onInputOut.add(this.out, this);
		choice.events.onInputDown.add(this.down, this);

		choice.answer_handle = entry.handle

		this.add(choice)
	    }, this);
	}

	this.fadeIn()
    }
}
