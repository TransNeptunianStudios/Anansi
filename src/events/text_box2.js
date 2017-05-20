import Phaser from 'phaser'

export default class TextBox2 extends Phaser.Group{

    fadeIn(){
	this.game.add.tween(this).to(
	    {alpha: 0.8},
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
	this.game.input.onDown.addOnce(this.fadeOut, this)
	this.game.time.events.remove(this.print_timer);

	this.text.setText(this.text.text + this.raw_text);
	this.raw_text = "";
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
	this.print_timer = game.time.events.repeat(
	    100,
	    this.raw_text.length+1,
	    this.printNextLetter,
	    this);
	this.game.input.onDown.addOnce(this.textFinish, this)
    }

    constructor(game, x, y, raw_text, origin) {
	super(game)
	this.x = x
	this.y = y
	this.alpha = 0

	this.fade_time = 500;
	this.finished = new Phaser.Signal();
	this.raw_text = raw_text;

	var width = game.width - 2 * x
	var height = game.height - y - x

	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF);
	graphics.drawRect(0, 0, width, height);
	graphics.endFill();
	this.add(graphics)

	var text_margin = 20
	var text = ""
	if (origin)
	    text += origin + ": "

	this.text = game.add.text( text_margin, x, text)
	this.text.font = 'Lato';
	this.text.fontSize = 30;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = width - 2 * text_margin
	this.text.addColor("#000000", 0);

	this.add(this.text)
	this.fadeIn()
    }
}
