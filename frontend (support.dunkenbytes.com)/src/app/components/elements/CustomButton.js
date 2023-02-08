import React from 'react'
import { Button } from 'antd';
import styles from './stylesheets/customButton.module.css'


const CustomButton = (props) => {
    const onClick = () => {
        props.onClickHandler()
    }
  let buttonStyles;  
  if(props.type==="NoBorder"){
    buttonStyles = styles.buttonNoBorder
  }
  return (
    <Button onClick={onClick} className={buttonStyles}>
        {/* <span>{props.text}</span> */}
        {props.text}
    </Button>
  )
}

export default CustomButton