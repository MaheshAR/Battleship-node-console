// Row -> A-J
// Col -> 0-9

class Board {
	constructor(row, col) {
		this.rowSize = row;
		this.colSize = col;
		this.matrix = Array(row).fill('').map(x => Array(col).fill('--'))
	}

	getCell(row, cell) {
		return this.matrix[row][cell];
	}

	updateCell(row, col, value) {
		this.matrix[row][col] = value;
	}

	updateRowForCol(row, col, noOfRows, value) {
		for (let i = row; i < noOfRows; i++) {
			this.matrix[i][col] = value;
		}
	}

	updateColForRow(row, col, noOfCols, value) {
		for (let j = col; j < noOfCols; j++) {
			this.matrix[row][j] = value;
		}
	}

	print() {
		let res = '';
		for (let i = 0; i < this.rowSize; i++) {
			for (let j = 0; j < this.colSize; j++) {
				res += `${this.matrix[i][j]} `;
			}
			res += '\n';
		}
		console.log(res);
	}

	static getpos(pos) {
		const row = +pos.match(/[A-J]/i)[0].toUpperCase().charCodeAt() - 65;
		const col = +pos.match(/[0-9]/g)[0];

		return [row, col];
	}
}

module.exports = Board;