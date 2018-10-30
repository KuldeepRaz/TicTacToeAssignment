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
let turn = 'X';
let humanPlayer='You';
let comPlayer='Sorry, You Lost';

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
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if( grid[colIdx][rowIdx]==0){
       let status =markCell(rowIdx,colIdx,humanPlayer);
       let cell=getCellForComputer();
       if(cell==null&&status==false){
           showMessage("Tie")
           gameOver();
       }else if (status==false  ){
        markCell(cSpot.rowIdx,cSpot.colIdx,comPlayer);
       }
    }
    
}

function isWin(player){
    if(checkRow(player)){
        return player;
    }
    if(checkCol(player)){
        return player;
    }
    if(checkDia(player)){
        return player;
    }
    return false;
}

function getCellForComputer(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            if(grid[j][i]==0){
                return {"rowIdx":i,"colIdx":j};
            }
        }
    }
    return null;
}

function markCell(rowIdx,colIdx,player){
   if(player==humanPlayer){
    grid[colIdx][rowIdx] = 1;
   }else{
    grid[colIdx][rowIdx] = 2;
   }
   if(isWin(player)){
     document.getElementById("messageBox").style.display = "flex";
	 showMessage(player+" won");
     renderMainGrid();
     gameOver();
     return true;
   }
   renderMainGrid();
   addClickHandlers();
   return false;
}

function gameOver(){
    document.getElementById("replayButton").style.display = "flex";
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

function checkRow(player){
    let winCombo=[];
    if(player===humanPlayer){
        winCombo=[1,1,1];
    }
    if(player==comPlayer){
        winCombo=[2,2,2];
    }
    for(let i=0;i<grid.length;i++){
        let row=[];
        for(let j=0;j<grid[i].length;j++){
            row.push(grid[i][j]);
        }
        console.log(JSON.stringify(row));
        if(JSON.stringify(row)==JSON.stringify(winCombo)){
            console.log("win");
            return player;
        }
    }
    return null;
}

function checkDia(player){
    let winCombo=[];
    if(player===humanPlayer){
        winCombo=[1,1,1];
    }
    if(player==comPlayer){
        winCombo=[2,2,2];
    }
    let row=[];
    for(let i=0;i<grid.length;i++){
        row.push(grid[i][i]);
        console.log(JSON.stringify(row));
        if(JSON.stringify(row)==JSON.stringify(winCombo)){
            console.log("win");
            return player;
        }
    }
    return null;
}

function showMessage(message){
    document.getElementById("messageBox").style.display = "flex";
	document.getElementById("messageBox").innerText = message;
}
function checkCol(player){
    let winCombo=[];
    if(player===humanPlayer){
        winCombo=[1,1,1];
    }
    if(player==comPlayer){
        winCombo=[2,2,2];
    }
    for(let i=0;i<grid.length;i++){
        let col=[];
        for(let j=0;j<grid[i].length;j++){
            col.push(grid[j][i]);
        }
        console.log(JSON.stringify(col));
        if(JSON.stringify(col)==JSON.stringify(winCombo)){
            console.log("win");
            return player;
        }
    }
    return null;
}

function setup(){
document.getElementById("messageBox").style.display = "none";
document.getElementById("replayButton").style.display = "none";
initializeGrid();
renderMainGrid();
addClickHandlers();
}
setup();
