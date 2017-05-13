import Phaser from 'phaser'

export default class extends Phaser.State {
    preload() {
	// set background color and preload image
	this.game.stage.backgroundColor = '#000000';
	this._preloadBar = this.game.add.sprite(game.world.centerX, game.world.centerY, 'preloaderBar');
	this._preloadBar.anchor.setTo(0.5)

	this.game.load.setPreloadSprite(this._preloadBar);

	this.load.image('tnsLogo', './assets/images/tns-logo.png')
	this.load.image('menu', './assets/images/menu_background.png')

	this.load.image('duck_pond', './assets/images/duck_pond.png')
	this.load.image('window', './assets/images/window.png')

	this.load.image('duck1', './assets/images/duck1.png')

    }

    create() {
	this.state.start('Splash')
    }
};
