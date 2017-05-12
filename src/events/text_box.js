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

    constructor(game, x, y, raw_text, origin) {
	this.game = game;
	this.text = game.add.text(x,y, '');
	this.rtext = raw_text;
	this.current_text = '';

	this.text.font = 'Revalia';
	this.text.fontSize = 40;
	this.text.wordWrap = true;
	this.text.wordWrapWidth = 500;

	//  x0, y0 - x1, y1
	var grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
	grd.addColorStop(0, '#8ED6FF');
	grd.addColorStop(1, '#004CB3');
	this.text.fill = grd;

	this.text.stroke = '#000000';
	this.text.strokeThickness = 2;
	this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

	console.log(this.rtext)
	console.log(this.rtext.lenght) // WHAAT?
	this.print_timer = game.time.events.repeat(Phaser.Timer.SECOND * 0.05, this.rtext.length, this.print_next_letter, this);
    }
}
