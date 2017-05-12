import Phaser from 'phaser'

export default class TextBox{
    print_next_letter(){
	this.current_text += this.remaining_text[0];
	this.remaining_text = this.remaining_text.substr(1);
	this.text.setText(this.current_text);
    }

    constructor(game, x, y, raw_text, origin) {
	this.text = game.add.text(x,y, '');
	this.remaining_text = raw_text;
	this.current_text = '';

	this.text.font = 'Revalia';
	this.text.fontSize = 40;

	//  x0, y0 - x1, y1
	var grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
	grd.addColorStop(0, '#8ED6FF');
	grd.addColorStop(1, '#004CB3');
	this.text.fill = grd;

	this.text.stroke = '#000000';
	this.text.strokeThickness = 2;
	this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

	console.log(this.remaining_text)
	console.log(this.remaining_text.lenght) // WHAAT?
	this.print_timer = game.time.events.repeat(Phaser.Timer.SECOND * 0.2, this.remaining_text.length, this.print_next_letter, this);
    }
}
