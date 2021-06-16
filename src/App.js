import React from 'react';
import './App.css';
import Board from './components/Board';
import { MINE_COUNT } from './reducers/Reducers'
import { useDispatch, useSelector } from 'react-redux';
import { restart } from './reducers/Actions';
import { useEffect } from 'react';
import { incrementTimer, resetTimer } from './reducers/Actions';

function App() {
  const dispatch  = useDispatch();
  const lostState = useSelector( state => state.lost )
  const winState = useSelector( state => state.win ) 
  const flagCountState = useSelector( state => state.flagNum )  
  const timer = useSelector( state => state.timer )

  //타이머 
  useEffect ( () => {
    let interval = null; 
    if ( winState === false || lostState === false ){
      clearInterval(interval);
      interval = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000)
    }

    if ( winState === true || lostState === true ){
      return resetTimer(); 
    }

    return () => {
      clearInterval(interval);
    }
  }, []); 

  const onClickButton = () => {
    dispatch(resetTimer())    
    dispatch(restart())
  };

  return (
    <div className="Form_maker">
        <div className="size_title1">MINESWEEPER</div>
        <button className ="btn btn-primary" onClick={onClickButton}>Restart</button><br/>
        <div className="size_title3">{timer}</div>
        <div className="size_title2">{MINE_COUNT}💣</div>
        <div className="size_title4">{flagCountState}🚩</div>
        <Board/>
    </div>
  );
}

export default React.memo(App);
