import {OPEN_CELL,FLAG_CELL,GAME_LOST,RESTART,INC_TIMER, RESET_TIMER} from './Reducers';

export const openCell = (x,y) => ({
    type : OPEN_CELL,
    payload : {x,y}
});

export const flagCell = (x,y) => ({
    type : FLAG_CELL,
    payload : {x,y}
});

export const lost = () => ({
    type : GAME_LOST
});

export const restart = () => ({
    type : RESTART
});

export const incrementTimer = () => ({
    type : INC_TIMER
});

export const resetTimer = () => ({
    type : RESET_TIMER
});