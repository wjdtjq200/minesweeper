export const initBoard = ( width, height, mineCount)=>{
    const copied    = Array( width * height ).fill().map((_,x) => x);
    const shuffle   = [];
    const boardData = []; 
    
    //폭탄 심을 자리 정하기 
    while (copied.length > (width * height) - mineCount){ 
        const chosen = copied.splice(Math.floor(Math.random() * copied.length),1)[0];
        // 한칸짜리 배열을 출력한 곳의 첫번째 값
        shuffle.push(chosen);
    }// 0< Math.random() * copied.length <copied.length인 랜덤한 숫자를 출력 

    //보드 만들기
    for(let i=0; i<height; i++){
        const row = Array(width).fill(' ');
        boardData.push(row);
    } // 배열의 길이가 width인 행을 만들고 height번 반복해서 ' '로 채운다. 
    
    //폭탄 심기 
    for(let i=0; i<shuffle.length; i++){
        const x = shuffle[i] % width;
        const y = Math.floor(shuffle[i] / width);
        boardData[x][y] = '💣'; 
    }


    const countMine = (x,y) => { 
        if (x<0 | y<0 | x>=height | y>=width){
            return 0; // 배열 아닌 곳은 0
        }
        
        if(boardData[x][y] === '💣'){
            return 1; // 지뢰는 1
        }

        return 0; // 나머지는 0 
    }

    //지뢰 갯수 세기 
    for(let x=0; x < height; x++){
        for (let y=0; y < width; y++){
            if (boardData[x][y] === ' '){
                let count = 0;
                count += countMine(x-1,y-1);
                count += countMine(x-1,y);
                count += countMine(x-1,y+1);

                count += countMine(x,y-1);
                count += countMine(x,y+1);

                count += countMine(x+1,y-1);
                count += countMine(x+1,y);
                count += countMine(x+1,y+1);// 자신빼고 8방향
                if(count !== 0){
                    boardData[x][y] = count.toString();
                } // 근처에 지뢰가 있는 셀은 근처의 지뢰 갯수를 count값으로 갖는다. 
            }
        }
    }
    console.log(boardData)
    return boardData;
}

//확장하기 
export const expandCell = (board,opened, x, y, width, height) => {

    //찾기
	const Search = (x, y, level = 0) => {
        x = parseInt(x)
        y = parseInt(y) // string to Integer Number

        // 1. 확장단계 
        if (level > 9){
            return;
        }
        // 2. 배열이 아닌 곳은 open에 추가되지 않음 
        if(x<0 | y<0 | x>width-1 | y>height-1){
            return;
        }
        // 3. 근처에 지뢰가 있는 곳은 open되지 않는다. 
		if (board[x][y] === '💣') {
			return;
		}
       
        // 4. 주변의 셀들을 합쳐서 하나의 배열로 만든다.  
		let aroundPoint = [];
		aroundPoint = aroundPoint.concat({ x: x - 1, y: y - 1 }, { x, y: y - 1 },{ x: x + 1, y: y - 1 });
		aroundPoint = aroundPoint.concat({ x: x + 1, y }, { x: x - 1, y: y + 1 },{ x: x - 1, y });
		aroundPoint = aroundPoint.concat({ x, y: y + 1 }, { x: x + 1, y: y + 1 }); 
        
        // 5. 만약 셀이 갖는 값이 없으면 다시 찾기 
		if (board[x][y] === ' ' ) {
			aroundPoint.forEach((i) => {
				Search(i.x, i.y, level+1);
			});
        }
        // 6. 1,2,3 통과하면 open배열에 추가 
        opened[x][y] = true; 
	};

	Search(parseInt(x), parseInt(y));

	return opened;
};

