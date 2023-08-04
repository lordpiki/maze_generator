// Function to generate a maze using Recursive Backtracking algorithm
function generateMaze(rows, cols) {
  // Initialize the maze grid
  const maze = [];
  for (let i = 0; i < rows; i++) {
    maze.push([]);
    for (let j = 0; j < cols; j++) {
      maze[i].push({
        top: true,
        right: true,
        bottom: true,
        left: true,
        visited: false,
      });
    }
  }

  // Function to render the maze on the webpage
  function renderMaze() {
    const mazeContainer = document.getElementById('maze-container');
    mazeContainer.style.setProperty('--rows', rows); // Set CSS variable for rows
    mazeContainer.style.setProperty('--cols', cols); // Set CSS variable for columns
    mazeContainer.innerHTML = ''; // Clear the maze container if needed
    // Loop through the maze array and create HTML elements to represent walls and paths
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = maze[i][j];



        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';

        if (i === 0 && j === 0) {
          cellDiv.classList.add('start-point');
        } else if (i === rows - 1 && j === cols - 1) {
          cellDiv.classList.add('end-point');
        }

        if (cell.top) cellDiv.classList.add('wall-top');
        if (cell.right) cellDiv.classList.add('wall-right');
        if (cell.bottom) cellDiv.classList.add('wall-bottom');
        if (cell.left) cellDiv.classList.add('wall-left');

        mazeContainer.appendChild(cellDiv);
      }
    }
  }

  // Recursive Backtracking algorithm
  function visitCell(row, col) {
    maze[row][col].visited = true;
    const directions = shuffleDirections();

    for (const direction of directions) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !maze[newRow][newCol].visited) {
        // Remove walls between the current cell and the new cell
        if (direction[0] === -1) { // Top
          maze[row][col].top = false;
          maze[newRow][newCol].bottom = false;
        } else if (direction[0] === 1) { // Bottom
          maze[row][col].bottom = false;
          maze[newRow][newCol].top = false;
        } else if (direction[1] === -1) { // Left
          maze[row][col].left = false;
          maze[newRow][newCol].right = false;
        } else if (direction[1] === 1) { // Right
          maze[row][col].right = false;
          maze[newRow][newCol].left = false;
        }

        visitCell(newRow, newCol);
      }
    }
  }

  // Shuffle an array of directions
  function shuffleDirections() {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    return directions.sort(() => Math.random() - 0.5);
  }

  // Start generating the maze from the top-left cell
  visitCell(0, 0);

  console.log(maze);
  renderMaze()
  return maze;

}

// Example usage:

