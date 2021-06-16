import React from 'react';
import {Button} from 'antd';
const Cell = ({open, content, onLeftClick, onRightClick}) => {
    return (
        <Button style = {{ width:'30px', height:'30px', margin:'2px', color:'black', fontSize:'15px'}} 
                size = 'small' 
                type = 'primary' 
                onClick = {onLeftClick} 
                disabled = {open}
                onContextMenu = {onRightClick}> 
        {content}
        </Button>
    )
}

export default  React.memo(Cell);
