// Sudoku.js
var exports = exports || {};
function Sudoku (puzzle) {
  this.puz1 = puzzle;
}
Sudoku.prototype.showPuzzle = function () {
  console.log(this.puz1);
};
Sudoku.prototype.setSquare = function (row, col, val) {
  this.puz1[row][col] = val;
};
Sudoku.prototype.getSquare = function (row, col) {
  return this.puz1[row][col];
};
Sudoku.prototype.checkRow = function (row, col) {
  var num = this.puz1[row][col],
    i,
    ans = 0;
  if (num !== 0) {
    ans = 1 << num;
    return 0;
  }
  for (i = 0; i < 9; i += 1) {
    if (this.puz1[row][i] !== 0) {
      ans |= 1 << this.puz1[row][i];
    }
  }
  ans = ans ^ parseInt('1111111110', 2);
  return ans;
};
Sudoku.prototype.checkCol = function (row, col) {
  var num = this.puz1[row][col],
    i,
    ans = 0;
  if (num !== 0) {
    ans = 1 << num;
    return 0;
  }
  for (i = 0; i < 9; i += 1) {
    if (this.puz1[i][col] !== 0) {
      ans |= 1 << this.puz1[i][col];
    }
  }
  ans = ans ^ parseInt('1111111110', 2);
  return ans;
};
Sudoku.prototype.checkGrid = function (row, col) {
  var num = this.puz1[row][col],
    i,
    j,
    gRow = parseInt(row / 3) * 3,
    gCol = parseInt(col / 3) * 3,
    ans = 0;
  if (num !== 0) {
    ans = 1 << num;
    return 0;
  }
  for (i = 0; i < 3; i += 1) {
    for (j = 0; j < 3; j += 1) {
      if (this.puz1[i+gRow][j+gCol] !== 0) {
        ans |= 1 << this.puz1[i+gRow][j+gCol];
      }
    }
  }
  ans = ans ^ parseInt('1111111110', 2);
  return ans;
};
Sudoku.prototype.solve = function () {
  var cnt = 0;
  var upd = false;
  while (true) {
    upd = false;
    cnt += 1;
    for (var row = 0; row < 9; row += 1) {
      for (var col = 0; col < 9; col += 1) {
        if (this.getSquare(row, col) === 0) {
          var bits = this.checkRow(row, col) & this.checkCol(row, col) & this.checkGrid(row, col);
          var k = 0;
          var z = [];
          for (k = 1; k < 10; k +=1) {
            if (bits & 1<<k) {
              z.push(k);
            }
          }
          if (z.length === 1) {
            this.setSquare(row, col, z[0]);
            upd = true;
          }
        }
      }
    }
    if (!upd) {
      break;
    }
  }
};
exports.Sudoku = Sudoku;
