const inquirer = require('inquirer');
const Player = require('./model/Player');
const { ships } = require('./config');

function getPlayerInputs() {
	const shipInputs = ships.map(ship => ({
		name: ship.code,
		message: `${ship.name} position (A-J0-9,1|0), Length: ${ship.length}`
	}));

	return async () => {
		const { name, ...positions } = await inquirer.prompt([{ name: 'name', message: 'Player name' }, ...shipInputs]);

		return { name, positions };
	}
}

module.exports = async function start() {
	let playCount = 0;
	const playerInput = getPlayerInputs();

	console.log('Setting up player 1');
	const player1 = new Player(await playerInput());
	player1.printField();

	console.log('Setting up player 2');
	const player2 = new Player(await playerInput());
	player2.printField();

	(async function play() {
		const player = playCount % 2 === 0 ? player1 : player2;
		const enemy = player === player1 ? player2 : player1;

		console.log(`${player.name}'s turn`);

		const { cell } = await inquirer.prompt([{ name: 'cell', message: 'Fire on cell : ' }]);

		player.fire(enemy, cell);
		playCount++;

		if (player.isGame(enemy)) {
			console.log(`*************** ${player.name} WON!!!! ***************`);
			return;
		}

		play();
	})();
};