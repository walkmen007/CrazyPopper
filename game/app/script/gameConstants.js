const GRID_ROW = 5; //Max cel across canvas height.
const GRID_COL = 10; //Max cell across canvas width
const GRID_WIDTH = 100; //Default Cell width.
const GRID_HEIGHT = 80; //Default Cell height.

var direction = 4; //Max Direction for projectile can be 4;

var projectileW = 10;
var projectileH = 10;

var textColor = 'white';
var bgcolor = '#a1c2e8';


var gameLevels = {
	level1: {
		color: [2,1, 2, 1],
		maxClick: 2,
		//popperPosition: [30, 29],
		popperPosition: [15, 24, 26, 35],
	},
	level2: {
		color: [1,2, 3,1, 1,1,  3,1, 1],
		maxClick: 3,	
		popperPosition: [3,7, 14,17, 22,25, 42, 44, 48],
	},
	level3: {
		color: [3,1,1, 1, 3,1,2,  2,1,  1,1,3,  1,1],
		maxClick: 2,
		popperPosition: [2,5,8, 14, 20,26,29, 32,34,39, 40,45],
	}
}

var popperLevel = [' ', 'popperPurple', 'popperBlue', 'popperYellow'];
var levelList = ['level1', 'level2', 'level3'];
