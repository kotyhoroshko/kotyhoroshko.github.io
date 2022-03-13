document.addEventListener("DOMContentLoaded", function(){
  let column=7;
  let gridFill = createGrids;
      gridFill( ...gal=[]);
  
  function getImgs(num=1){
    let img = new Image();
    img.src = 'img/'+num+'.jpg'
    img.onload = function () {
      gal[num] = {
        src    : img.src,
        name   : num,
        width  : img.width,
        height : img.height,
        widthClass  : 1,
        heightClass : 1
      }      
      if (gal[num].width>(gal[num].height*1.7)) {
        gal[num].widthClass=2;
        getImgs(num+1)
      }
      if(gal[num].height>(gal[num].width*1.7)) {
        gal[num].heightClass=2;
        getImgs(num+1)
      }
      if(gal.length>192) {       
        console.log(gal.length+' images was loaded');
        console.table(gal);
        build(createField(gal.length), gal, gal.length, addPicToHtml);        
        return
      }     
    }  
  }

  function createGrids(num=1){ 
    gal[num] = {        
      name   : num,       
      widthClass  : getRndSize(),
      heightClass : getRndSize()
    }
    gal[num].widthClass==2 ? gal[num].heightClass=1 : false;
    if(gal.length>192) {       
      console.log(gal.length+' grids was created');
      build(createField(gal.length), gal, gal.length, addGridToHtml);        
      return
    }
    createGrids(num+1)
  }

  function createField(picsQty) {
    let field = new Array(Math.round(picsQty));
    for (let index = 0; index < field.length; index++) {
      field[index] = new Array(column+1);
      field[index].fill(0);
    }  
    // console.log(field)
    return field
  }

  function build(field, pics, picsQty, grid_pic) {
    let inn = '';
    let skippedPics = [];
    let currentCoor = {x:0, y:1};
    
    for (let pic = 1; pic < picsQty; pic++) {
      currentCoor = getCoor(currentCoor);      

      if((field[currentCoor.y][currentCoor.x] == 0)) {
        
        if((skippedPics[0]) && (field[currentCoor.y][currentCoor.x+1] == 0)) {
          inn+=grid_pic(skippedPics[0], currentCoor);          
          field[currentCoor.y][currentCoor.x]=skippedPics[0].name+"";
          field[currentCoor.y][currentCoor.x+1]=skippedPics[0].name+"";
          skippedPics.shift();
          pic--;
        }

        else if(pics[pic].widthClass==1) {
          inn+=grid_pic(pics[pic], currentCoor);
          field[currentCoor.y][currentCoor.x]=pics[pic].name;
          if (pics[pic].heightClass==2) {
            field[currentCoor.y+1][currentCoor.x]=pics[pic].name;
          }          
        }
        else {
          if(field[currentCoor.y][currentCoor.x+1]==0) {
            inn+=grid_pic(pics[pic], currentCoor);
            field[currentCoor.y][currentCoor.x+1]=pics[pic].name;
            field[currentCoor.y][currentCoor.x]=pics[pic].name;
          }
          else {
            skippedPics.push(pics[pic]);
            currentCoor = getPrevCoor(currentCoor);
          }
        }
      }      
      else {
        pic--;
      }      
    }

    if(skippedPics[0]){
      for (let pic = 0; pic < skippedPics.length; false) {
        currentCoor = getCoor(currentCoor);
        if ((field[currentCoor.y][currentCoor.x+1]==0)&&((field[currentCoor.y][currentCoor.x]==0))) {
          inn+=grid_pic(skippedPics[0], currentCoor);
          field[currentCoor.y][currentCoor.x]=skippedPics[pic].name;
          field[currentCoor.y][currentCoor.x+1]=skippedPics[pic].name;
          skippedPics.shift();
          pic=0;
        }
      }
    }
    document.querySelector('.grid').style=`grid-template-columns: repeat(${column}, ${95/column}vw); grid-auto-rows: minmax(${95/column}vw, ${95/column}vw);`
    document.querySelector('.grid').innerHTML = inn;
  }

  function getCoor(currentCoor) {
    if (currentCoor.x>(column-1)) {
      currentCoor.x=1;
      currentCoor.y++;
    }
    else {
      currentCoor.x++
    }    
    return currentCoor
  }

  function getPrevCoor(currentCoor) {
    if (currentCoor.x==1) {
      currentCoor.x=column;
      currentCoor.y--;
    }
    else {
      currentCoor.x--;
    }
    return currentCoor
  }

  function addPicToHtml(picItem, currentCoor) {
    return `<div class="grid__item grid__item--${picItem.name} h${picItem.heightClass} w${picItem.widthClass}" 
                 style="grid-area: ${currentCoor.y}/${currentCoor.x}/${currentCoor.y+picItem.heightClass}/${currentCoor.x+picItem.widthClass};">
              <img class="picture" src="${picItem.src}">
              <span class="title">${picItem.name}</span>
            </div>`    
  }

  function addGridToHtml(picItem, currentCoor) {
    return `<div class="grid__item grid__item--${picItem.name} h${picItem.heightClass} w${picItem.widthClass}" 
                 style="grid-area: ${currentCoor.y}/${currentCoor.x}/${currentCoor.y+picItem.heightClass}/${currentCoor.x+picItem.widthClass};
                       
                        background: linear-gradient(-45deg, rgba(0,0,0,.66), transparent );
                        background-color: rgba(${getRndColor()},${getRndColor()},${getRndColor()},1);">
              <span class="title">${picItem.name}</span>
            </div>`    
  }

  function getRndSize() { 
    return (Math.floor(Math.random() * 2) + 1)
  }

  function getRndColor() { 
    return Math.floor(Math.random() * 255) 
  }

  let changeColumnsBtns = document.querySelector('header');
    changeColumnsBtns.addEventListener('click', function(e){

    if (e.target.classList=='set-column__item') {
      column = +e.target.textContent;
      gridFill( ...gal=[]);      
    }
    if (e.target.classList.value=='picture-photo__photo') {      
      gridFill=getImgs    
      gridFill( ...gal=[])      
    }
    if (e.target.classList.value=='picture-photo__picture') {      
      gridFill=createGrids;
      gridFill( ...gal=[])      
    }
  
  }) 

  

}); //end  

  // function myFunction() {
  //   var item = document.createElement("DIV");
  //   var img = document.createElement("IMG");
  //   var num = document.createElement("span");
  //   var txt = document.createTextNode("numer");
  //   num.appendChild(txt);
  //   item.appendChild(img);
  //   item.appendChild(num);
  //   document.querySelector('.grid').appendChild(item)
  // }



