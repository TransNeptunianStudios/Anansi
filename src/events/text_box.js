import Phaser from 'phaser'

export default class TextBox{

    fadeOut() {
	var fadeOutTween = this.game.add.tween(this.graphics).to({alpha: 0}, this.fade_time, Phaser.Easing.Linear.None, true)
	var fadeOutTween = this.game.add.tween(this.text).to({alpha: 0}, this.fade_time, Phaser.Easing.Linear.None, true)
	fadeOutTween.onComplete.addOnce(() => { this.finished.dispatch() }, this);
    }

    fadeIn() {
	var fadeInTween = this.game.add.tween(this.graphics).to({alpha: 0.8}, this.fade_time, Phaser.Easing.Linear.None, true)
	fadeInTween.onComplete.addOnce(() => { this.runText();  }, this);
	fadeInTween.onComplete.addOnce(() => { 	this.game.input.onDown.addOnce(this.fast_forward_text, this) }, this);
    }

    fast_forward_text(){
	if( this.rtext != ''){
	    this.game.time.events.remove(this.print_timer);
	    this.current_text += this.rtext;
	    this.rtext = '';
	    this.text.setText(this.current_text);
	    this.game.input.onDown.addOnce(this.fadeOut, this)
	}
	else
	    this.fadeOut();
    }

    print_next_letter(){
	this.current_text += this.rtext[0];
	this.rtext = this.rtext.substr(1);
	this.text.setText(this.current_text);
    }

    addChoices(choices){
	console.log("CHoices added");
    }

    runText(){
	this.current_text = '';
	if(this.origin)
	    this.current_text = this.origin + ":\n";

	this.text = game.add.text(this.x + this.margin, this.y + this.margin, this.current_text);
	this.text.font = 'Lato';
	this.text.fontSize = 30;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = this.width-(this.margin*2);

	this.text.addColor("#000000", 0);

	this.print_timer = game.time.events.repeat(this.text_speed, this.rtext.length, this.print_next_letter, this);
    }

    constructor(game, x, y, raw_text, origin) {
	this.game = game;
	this.rtext = raw_text;
	this.x = x;
	this.y = y;
	this.width = game.width-(x*2);
	this.height = game.height-y-x;
	this.margin = this.width*0.01
	this.origin = origin
	this.fade_time = 200;
	this.text_speed = Phaser.Timer.SECOND * 0.05;

	this.finished = new Phaser.Signal();

	this.graphics = game.add.graphics(x, y);
	this.graphics.beginFill(0xFFFFFF);
	this.graphics.drawRect(0, 0, this.width, this.height);
	this.graphics.endFill();
	this.graphics.alpha = 0;

	this.fadeIn()
    }
}
