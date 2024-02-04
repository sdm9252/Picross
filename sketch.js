function matrix(m, n) {
  return Array.from({
    // generate array of length m
    length: m
    // inside map function generate array of size n
    // and fill it with `0`
  }, () => new Array(n).fill(0));
};

const vert = 10;
const hor = 15;
const spaced  = 600/(Math.max(vert, hor));
let vertical_hints = [];
let horizontal_hints = [];



function setup() {
  createCanvas(800, 800);
  hidden_board = matrix(vert, hor)
  //hidden_board[2][3] = 1;
  console.log(hidden_board);
  vertical_hints = createVerticalHints(hidden_board);
  horizontal_hints = createHorizontalHints(hidden_board);
  console.log(vertical_hints);
  console.log(horizontal_hints);
  
}


function drawGrid(spacing, grid){
  stroke(50);
  strokeWeight(2);
  //draw the vertical lines
  for (let x = 0; x<= grid[0].length; x++){
    line(150+(x*spacing), 0, 150+(x*spacing), 150+(spacing*grid.length));
  }
  //draw the horizontal lines
  for (let y = 0; y<= grid.length; y++){
    line(0, 150+(y*spacing), 150+(spacing*grid[0].length), 150+(y*spacing));
  }
}

function draw() {
  background(255);
  //write the horizontal hints
  fill(0)
  
  for(let i = 0; i<vert; i++){
    let hint_as_string = "";

    if(horizontal_hints[i].length == 0){
      text("0", 50, 165+i*spaced)
    }else{
      //hint_as_string = hint_as_string.concat(horizontal_hints[i][0].toString());
      for(let j = 0; j<horizontal_hints[i].length; j++){
        text(horizontal_hints[i][j].toString().concat(", "), 50+j*20, 165+i*spaced)
      }
    }
    //text(hint_as_string, 50+j*25, 165+i*spaced)
  }

  for(let i = 0; i<vert; i++){
    for(let j=0; j<hor; j++){
      if(hidden_board[i][j] == 1){
        fill(0);
        square(j*spaced + 150, i*spaced + 150, spaced);
        //stroke(0);
      }
    }
  }

  drawGrid(spaced, hidden_board)
}

function mousePressed(){
  //console.log(mouseX);
  if(mouseY > 150 && mouseX > 150 && mouseY < spaced*vert+150 && mouseX < spaced*hor+150){
    hidden_board[Math.floor((mouseY-150)/spaced)][Math.floor((mouseX-150)/spaced)] = 1;
  }
  horizontal_hints = createHorizontalHints(hidden_board);
  vertical_hints = createVerticalHints(hidden_board);
  console.log(horizontal_hints);
  //console.log(vertical_hints);
}

function createHorizontalHints(grid){
  let hint_array = []
  for(let i = 0; i< vert; i++){
    let next_hint = []
    let counter = 0
    for(let j =0; j < hor; j++){
      if(grid[i][j] == 0){
        if(counter>0){
          next_hint.push(counter)
          counter = 0
        }
      }
      if(grid[i][j] == 1){
        counter++
      }
    }
    if(counter > 0){
      next_hint.push(counter)
    }
    hint_array.push(next_hint);
  }
  return(hint_array);

}

function createVerticalHints(grid){
  let hint_array = []
  for(let i = 0; i< hor; i++){
    let next_hint = []
    let counter = 0
    for(let j =0; j < vert; j++){
      if(grid[j][i] == 0){
        if(counter>0){
          next_hint.push(counter)
          counter = 0
        }
      }
      if(grid[j][i] == 1){
        counter++
      }
    }
    if(counter > 0){
      next_hint.push(counter)
    }
    hint_array.push(next_hint);
  }
  return(hint_array);

}
