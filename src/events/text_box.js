import Phaser from 'phaser'

export default class TextBox{
    finish(){
	this.game.time.events.remove(this.print_timer);
	this.current_text += this.rtext;
	this.rtext = '';
	this.text.setText(this.current_text);
    }

    print_next_letter(){
	this.current_text += this.rtext[0];
	this.rtext = this.rtext.substr(1);
	this.text.setText(this.current_text);
    }

    finished(){
	return this.rtext.length == 0
    }

    runText(){
	this.text = game.add.text(this.x + this.margin, this.y + this.margin, '');
	this.current_text = '';

	this.text.font = 'Lato';
	this.text.fontSize = 30;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = this.width-(this.margin*2);

	this.text.addColor("#000000", 0);

	this.print_timer = game.time.events.repeat(Phaser.Timer.SECOND * 0.05, this.rtext.length, this.print_next_letter, this);
    }

    constructor(game, x, y, raw_text, origin) {
	this.game = game;
	this.rtext = raw_text;
	this.x = x;
	this.y = y;
	this.width = game.width-(x*2);
	this.height = game.height-y-x;
	this.margin = this.width*0.01

	this.graphics = game.add.graphics(x, y);
	this.graphics.beginFill(0xFFFFFF);
	this.graphics.drawRect(0, 0, this.width, this.height);
	this.graphics.endFill();
	this.graphics.alpha = 0;
    }
}
