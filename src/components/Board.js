import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import CellContainer from './CellContainer';
import { Modal } from 'antd';
import './Board.css';
import { restart, resetTimer } from '../reducers/Actions';
import {WIDTH, HEIGHT} from '../reducers/Reducers';

const Board = () => {
  const [width, setWidth] = useState(WIDTH); 
  const [height, setHeight] = useState(HEIGHT); 
  const dispatch = useDispatch();

  const lostAlert = useSelector( state => state.lost);
  const winAlert  = useSelector( state => state.win);

  const [lostText, setAlertText] = useState('패배하였습니다.');
  const [winText, setWinText] = useState('승리하였습니다.');

  const onClick = () => {
    dispatch(resetTimer())    
    dispatch(restart())
  };
    
  return (
    <>
      <Modal title="GAME LOST" visible={lostAlert} onOk={onClick} onCancel={onClick}>
      {lostText}
      </Modal>

      <Modal title="GAME WIN" visible={winAlert} onOk={onClick} onCancel={onClick}>
      {winText}
      </Modal>

      <div className = "form">
          { Array( width * height ).fill().map( (x,y) =>
            <CellContainer key = {y} x = {y % width} y = {Math.floor( y / width )}/>)
          }
      </div>
    </>
  )
}

export default React.memo(Board);
