var board = new Array();
var score = 0;
var hasConflicted = new Array();
$(document).ready(function(){
    newGame();
});
function newGame(){
    //初始化数据
    init();
    //随机生成一个数
    getRadomNumber();
    getRadomNumber();
}
function init(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
           var gridCell=$('#grid-cell-'+i+"-"+j);
            gridCell.css("left",getPosLeft(i,j));
            gridCell.css("top",getPosTop(i,j));
        }
    for(i=0;i<4;i++)
    {
        board[i]=new Array();
        hasConflicted[i] = new Array();
        for(j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j] =false;
        }
    }
    updateBoardView();
    score=0;
}

function updateBoardView(){
    $(".number-Cell").remove();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        {
            $(".grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
        }
    for( i=0;i<4;i++)
        for( j=0;j<4;j++)
        {
            var theNumberCell=$("#number-cell-"+i+"-"+j);
            if(board[i][j]==0)
            {
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j)+50);
                theNumberCell.css("left",getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top".getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                //getNumberBackgroundColor  传入一个数  返回一个颜色
                theNumberCell.css("background-color","getNumberBackgroundColor(board[i][j])");
                theNumberCell.css("color","getNumberColor(board[i][j])");
                theNumberCell.css("text",board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
}

function getRadomNumber(){
    //先判断是否有空位置
    if(noSpace(board)){
        return false;
    }
    //随机的一个空的位子 范围0-3
    var randX=parseInt(Math.floor(Math.random()*4));
    var randY=parseInt(Math.floor(Math.random()*4));
    while(board[randX][randY]!=0)
    {
         randX=parseInt(Math.floor(Math.random()*4));
         randY=parseInt(Math.floor(Math.random()*4));
        
    }
    //随机的到2或4 概率相同
    var ranNumber=Math.random()<0.5?2:4;
    board[randX][randY]=ranNumber;
//    updateBoardView();
    showNumberWithAnimation(randX,randY,ranNumber);
    return true;
}


//  support 2048 function
function getPosLeft(i,j){
    return 20+i*120;
}
function getPosTop(i,j){
    return 20+120*j;
}

function getNumberBackgroundColor(number){
    switch(number)
    {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
            
    }
    return "black";

}

function getNumberColor(number){
    if(number<= 4){
    return "#776e65";
    }
    return "white";
}

//判断是否还有空位子
function noSpace(board){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
                break;
            }
        
        }
    return true;
}


//show animations function
function showNumberWithAnimation( i , j , randNumber ){

    var numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( randNumber );

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },50);
}