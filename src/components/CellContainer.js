import React, { useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Cell from './Cell';
import { openCell, flagCell, lost } from '../reducers/Actions';

const CellContainer = ({x,y}) => {
    const dispatch  = useDispatch();
    const OpenState = useSelector( state => state.opened[x][y] )  // 오픈인지 
    const FlagState = useSelector( state => state.flagged[x][y] ) // 깃발인지 
    const Content   = useSelector( state => state.board[x][y] )   // 폭탄인지 깃발인지 

    const onLeftClick = useCallback( () => {
        if(!OpenState){
            dispatch(openCell(x, y))
        }; 
        // 왼쪽클릭했을때 open된 상태가 아니면(false) 오픈된 상태로 만든다. 
    }, [OpenState, x, y, dispatch] );

    const onRightClick = useCallback( (evt) => {
        evt.preventDefault();

        if(!FlagState){
        dispatch(flagCell(x, y))}; 
        // 오른쪽 클릭했을 때, 깃발꽂기 

    }, [FlagState, x, y, dispatch] );

    const getContent = useCallback ( (content) => {
        if(OpenState){ //오픈된 상태일 때, 
            if(content==='💣'){
                dispatch(lost());
                return '💥'; // 폭탄이면 뻥 
            }
            return content;
        }else{             // 오픈 아닐때 
            if(FlagState){ //깃발인 상태이면 깃발을 추가
                return '🚩';
            }else{
                return ' ';
            }
        }
    }, [FlagState, OpenState, dispatch] );

    return (
        <>
            <Cell   
                open         = {OpenState} 
                content      = {getContent(Content)}
                onLeftClick  = {onLeftClick} 
                onRightClick = {onRightClick} 
            />
        </>
    )
}

export default React.memo(CellContainer);
