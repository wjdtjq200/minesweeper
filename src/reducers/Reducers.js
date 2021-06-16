import {initBoard,expandCell} from '../library/BoardInit';

export const OPEN_CELL  = 'OPEN_CELL';
export const FLAG_CELL  = 'FLAG_CELL';
export const GAME_LOST  = 'GAME_LOST';
export const RESTART    = 'RESTART';
export const WIDTH      = 12;
export const HEIGHT     = 12;
export const MINE_COUNT = 30;
export const INC_TIMER  = 'INC_TIMER'
export const RESET_TIMER  = 'RESET_TIMER'

const initialState = {
    board   : initBoard(WIDTH, HEIGHT, MINE_COUNT), 
    timer   : 0,   
    lost    : false,
    win     : false,
    flagNum : 50,
    counter : 0,
    opened  : Array.from( {length : HEIGHT}, () => Array.from({length : WIDTH}, () => false) ),
    flagged : Array.from( {length : HEIGHT}, () => Array.from({length : WIDTH}, () => false) ),
} // 행길이 HEIGHT만큼의 배열들을 만들고 각각의 배열들은 WIDTH의 길이의 값들을 갖고 값들은 모두 FALSE 

export const boardReducer = ( state = initialState, action ) => {
    switch(action.type){
        case OPEN_CELL: // 눌렀을때 빈칸인 경우에만 확장시작
            let openCopied = [...state.opened] 
            openCopied[action.payload.x][action.payload.y] = true

            if( state.board[action.payload.x][action.payload.y] === ' ' ){ //선택한 칸이 빈칸일때
                openCopied = expandCell(state.board, state.opened, action.payload.x, action.payload.y, WIDTH, HEIGHT)
            } // 확장시작 
            return {...state, opened:openCopied}

        case FLAG_CELL: //깃발을 지뢰에 모두 박았을때 승리조건, 깃발을 모두 사용하면 패배조건 
            const flaggedCopied = [...state.flagged];
            let mineCount = state.counter;
            let winner = false;
            let loster = false; 
            let flagCount = state.flagNum;

            flaggedCopied[action.payload.x][action.payload.y] = true;
            if(state.board[action.payload.x][action.payload.y]==='💣'){//깃발꽂은 곳이 지뢰인 경우 +1 
                mineCount += 1;
                if (mineCount === MINE_COUNT){
                    winner = true;
                    console.log(state.board)
                }
            }

            if(state.flagNum===0){
                loster = true;
            }// 깃발을 모두 사용하면 패배조건.

            return {...state, flagged : flaggedCopied, counter: mineCount, lost:loster, win:winner, flagNum:flagCount-1}

        case GAME_LOST: //눌렀을 때 지뢰면 패배함 
            return {...state,lost:true, timer : 0};

        case RESTART: 
            const board_Restart = initBoard(WIDTH, HEIGHT, MINE_COUNT);
            const opened_Restart  = Array.from( {length : HEIGHT}, () => Array.from({length : WIDTH}, () => false) );
            const flagged_Restart  = Array.from( {length : HEIGHT}, () => Array.from({length : WIDTH}, () => false) );
            return {...state, 
                board:board_Restart, opened:opened_Restart, 
                flagged:flagged_Restart, lost:false, 
                win:false, counter:0, flagNum : 50,
                timer : 0
            };
        
        case INC_TIMER:
            const incrementTimer = state.timer + 1;

            return {...state, timer : incrementTimer }; 
        
        case RESET_TIMER:
            return {...state, timer : 0 }; 

        default:
            return state;
    }
}