document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const scoreDisplay = document.getElementById("score");
  let boardArray = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  let score = 0;

  function init() {
    addTile();
    addTile();
    updateBoard();
  }

  function addTile() {
    let emptyTiles = [];
    boardArray.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        if (tile === 0) {
          emptyTiles.push({ x: rowIndex, y: colIndex });
        }
      });
    });

    if (emptyTiles.length > 0) {
      let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      boardArray[randomTile.x][randomTile.y] = Math.random() > 0.5 ? 2 : 4;
    }
  }

  function updateBoard() {
    board.innerHTML = '';
    boardArray.forEach(row => {
      row.forEach(tileValue => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (tileValue !== 0) {
          tile.textContent = tileValue;
          tile.style.backgroundColor = getColor(tileValue);
        }
        board.appendChild(tile);
      });
    });
    scoreDisplay.textContent = score;
  }

  function getColor(value) {
    const colors = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#cdc1b4';
  }

  function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    return arr.concat(zeros);
  }

  function combine(row) {
    for (let i = 0; i < 3; i++) {
      if (row[i] === row[i + 1] && row[i] !== 0) {
        row[i] *= 2;
        row[i + 1] = 0;
        score += row[i];
      }
    }
    return row;
  }

  function moveLeft() {
    boardArray = boardArray.map(row => combine(slide(row)));
    addTile();
    updateBoard();
  }

  function moveRight() {
    boardArray = boardArray.map(row => slide(combine(row).reverse()).reverse());
    addTile();
    updateBoard();
  }

  function moveUp() {
    boardArray = rotateLeft();
    moveLeft();
    boardArray = rotateRight();
  }

  function moveDown() {
    boardArray = rotateLeft();
    moveRight();
    boardArray = rotateRight();
  }

  function rotateLeft() {
    let newArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newArray[i][j] = boardArray[j][3 - i];
      }
    }
    return newArray;
  }

  function rotateRight() {
    let newArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newArray[i][j] = boardArray[3 - j][i];
      }
    }
    return newArray;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveUp();
    } else if (e.key === "ArrowDown") {
      moveDown();
    }
  });

  init();
});
