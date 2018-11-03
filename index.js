/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
const humanPlayer='You';
const comPlayer='Computer';
function initializeGrid() {
    grid=[];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';

}

function onBoxClick() {
    var colIdx = this.getAttribute("rowIdx");
    var rowIdx = this.getAttribute("colIdx");
    if( grid[rowIdx][colIdx]==0){
       let status =markCell(rowIdx,colIdx,humanPlayer);
       removeClickHandlers();
       if(status==false){
       showMessage("I am thinking...Please have patience...");
       loader(true); 
       setTimeout(function(){ 
            let cell=minimax(grid,comPlayer);
            messageVisibility(false);
            loader(false);
            markCell(cell.index.row,cell.index.col,comPlayer);  
            addClickHandlers(); 
      }, 1000);
       
    }
   }
}

function markCell(rowIdx,colIdx,player){
   let flag=false;
   if(player==humanPlayer){
    grid[rowIdx][colIdx] = 1;
   }else{
    grid[rowIdx][colIdx] = 2;
   }
   if(isWin(grid,player)){  
	 showStatus("won",player);
     falg=true;
   }
   if(getAvailableSpots(grid).length==0){
    showStatus("Its a Tie...",null);
    flag=true;
   }
   renderMainGrid();
   addClickHandlers();
   return flag;
}

function showStatus(msg,player){
    msg=player!==null?player+" "+msg:msg;
    showMessage(msg);
    renderMainGrid();
    gameOver();
}

function isWin(grid,player){
    if(checkRow(grid,player)){
        return player;
    }
    if(checkCol(grid,player)){
        return player;
    }
    if(checkDia(grid,player)){
        return player;
    }
    return false;
}

function checkRow(grid,player){
    const winCombo=getWinCombination(player);
    for(let i=0;i<grid.length;i++){
        let row=[];
        for(let j=0;j<grid[i].length;j++){
            row.push(grid[i][j]);
        }
        if(JSON.stringify(row)==JSON.stringify(winCombo)){
            return player;
        }
    }
    return null;
}

function checkDia(grid,player){
    const winCombo=getWinCombination(player);
    let row=[];
    for(let i=0;i<grid.length;i++){
        row.push(grid[i][i]);
       
    }
    if(JSON.stringify(row)==JSON.stringify(winCombo)){
        return player;
    }
    row=[];
    let j=grid.length-1;
    for(let i=0;i<grid.length;i++){
        row.push(grid[i][j--]);
    }
    if(JSON.stringify(row)==JSON.stringify(winCombo)){
        return player;
    }
    return null;
}
function checkCol(grid,player){
    const winCombo=getWinCombination(player);
    for(let i=0;i<grid.length;i++){
        let col=[];
        for(let j=0;j<grid[i].length;j++){
            col.push(grid[j][i]);
        }
        if(JSON.stringify(col)==JSON.stringify(winCombo)){
            return player;
        }
    }
    return null;
}

function getWinCombination(player){
    const combination=player==humanPlayer?[1,1,1]:[2,2,2];
    return combination;
}

function showMessage(message){
    document.getElementById("messageBox").style.display = "flex";
	document.getElementById("messageBox").innerText = message;
}

function gameOver(){
    document.getElementById("replayButton").style.display = "flex";
    loader(false);
    removeClickHandlers();
 }

 function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function removeClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}


/**This method will return an object containing the best move
 * with row and col as key.
 */

function minimax(newBoard, player) {
	var availSpots = getAvailableSpots(newBoard);
	if (isWin(newBoard, humanPlayer)) {
		return {score: -10};
	} else if (isWin(newBoard, comPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
        var move = {"index":{}};
        move.value = newBoard[availSpots[i].row][availSpots[i].col];
        move.index.row=availSpots[i].row;
        move.index.col=availSpots[i].col;
		newBoard[availSpots[i].row][availSpots[i].col] = player==humanPlayer?1:2;

		if (player == comPlayer) {
			var result = minimax(newBoard, humanPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, comPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i].row][availSpots[i].col]  = move.value;

		moves.push(move);
	}

	var bestMove;
	if(player === comPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
    }
    

	return moves[bestMove] ;
}

function getAvailableSpots(grid){
    let spots=[];
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid.length;j++){
            if(grid[i][j]==0){
                let spot={
                    "row":i,
                    "col":j
                }
                spots.push(spot);
            }
        }
    }
    return spots;
}

function messageVisibility(visiblity){
    document.getElementById("messageBox").style.display = visiblity==true?"flex":"none";
}

function loader(visibility){
    if(visibility){
        document.getElementById("loader").style.display = "flex";
    }else{
        document.getElementById("loader").style.display = "none";
    }
}

function setup(){
document.getElementById("messageBox").style.display = "none";
document.getElementById("replayButton").style.display = "none";
loader(false);
initializeGrid();
renderMainGrid();
addClickHandlers();
}
setup();
