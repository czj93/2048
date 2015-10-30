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
    //遍历gridcell 设置top left
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
           var gridCell=$('#grid-cell-'+i+"-"+j);
            gridCell.css("left",getPosLeft(i,j));
            gridCell.css("top",getPosTop(i,j));
        }
    //创建一个二维数组 存储数据  初始化为0
    for(i=0;i<4;i++)
    {
        board[i]=new Array();
        hasConflicted[i] = new Array();
        for(j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j] =false;
        }
    }
    //调用updateboardview()
    updateBoardView();
    score=0;
}
/*                             
    ****创建numbercell div 根据board的值显示的设置div ******8
                          */
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        {
            $(".grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
        
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
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                //getNumberBackgroundColor  传入一个数  返回一个颜色
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
}

/* 随机在一个空的位置创建2或者4   */
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

/** 键盘控制 
    1，判断按下的键
    2.调用移动函数
    3.移动成功后 调用getRadomNumber 随机一个位置
    4.判断游戏是否结束
                **/
$(document).keydown(function(event){
    switch(event.keyCode){
            //左键按下
        case 37:if(moveLeft()){
            setTimeout("getRadomNumber()",210);
            setTimeout("isGameOver()",300);
        } break;
            //上键按下
        case 38:if(moveUp()){
            setTimeout("getRadomNumber()",210);
            setTimeout("isGameOver()",300);
        } break;
            //右键按下
        case 39:if(moveRight()){
            setTimeout("getRadomNumber()",210);
            setTimeout("isGameOver()",300);
        } break;
            //下键按下
        case 40:if(moveDown()){
            setTimeout("getRadomNumber()",210);
            setTimeout("isGameOver()",300);
        } break;
        default: break;
            
    
    }


});

//  support 2048 function

/*  得到i第行 j列的div的位置   */
function getPosLeft(i,j){
    return 20+j*120;
}
function getPosTop(i,j){
    return 20+120*i;
}


/** 传入一个number 返回相应的颜色 **/
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

/***** 
    1.判断是否能够移动
    2.判断是移动还是移动合并
                            ****/
function moveLeft(){
   if(!canMoveLeft(board))
       return false;
   for(var i=0;i<4;i++)
       for(var j=1;j<4;j++){
           if(board[i][j]!=0)
               for(var k=0;k<j;k++){
                if(board[i][k]==0){
                    move(i,j,i,k);
                    board[i][k]=board[i][j];
                    board[i][j]=0;
                    continue;
                }
               
               }
           
           }
    
                       
    setTimeout("updateBoardView()",200);
    return true;
}

/**  遍历数组 判断同一行的不为0数组元素的左边是否有为0的元素或者与之相等的元素
若是  则可以左移返回true 反之则返回false            **/
function canMoveLeft(board){
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++)
        {
            if(board[i][j]!=0)
            {
                if(board[i][j-1]==0||board[i][j]==board[i][j-1])
                    return true;
            }
             
        }
    return false;

}


function move(i,j,i,k){
    var moveCell=$("#number-cell-"+i+"-"+j);
    moveCell.animate({
        top:getPosTop(i,k),
        left:getPosLeft(i,k)
    },200);


}
function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
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