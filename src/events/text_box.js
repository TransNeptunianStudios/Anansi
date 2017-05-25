import Phaser from 'phaser'
import NiceBox from './nice_box.js'

export default class TextBox extends Phaser.Group{

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
	    2o0,
	    this.raw_text.length+1,
	    this.printNextLetter,
	    this);
	this.game.input.onDown.addOnce(this.textFinish, this)
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

	this.fade_time = 300;
	this.finished = new Phaser.Signal();
	this.raw_text = raw_text.replace("@name", game.player.name)

	var width = game.width - 2 * this.x
	var height = game.height - this.y - this.x//  should be x

	var frame = new NiceBox(game,
				width,
				height)
	this.add(frame);

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
