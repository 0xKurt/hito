import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IconContext } from 'react-icons/lib';

// props:
//   backgroundColor
//   hoverColor
//   color
//   tooltip
//   split
//   icon
//   caption

const GeneralButton = (props) => {
  const [backgroundColor, setBackgroundColor] = useState(props.backgroundColor ? props.backgroundColor : 'white')
  const [smallHovColor, setSmallHovColor] = useState(props.color)

  const onMouseEnter = () => {
    if (!props.split) if (props.hoverColor) setBackgroundColor(props.hoverColor);
    if (props.split) setSmallHovColor(props.hoverColor ? props.hoverColor : props.color)
  }

  const onMouseLeave = () => {
    if (!props.split) setBackgroundColor(props.backgroundColor ? props.backgroundColor : 'white');
    if (props.split) setSmallHovColor(props.color)
  }

  const miniButton = (<div style={{
    minWidth: '20.2%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: smallHovColor,
    color: 'white',
  }}
    onMouseEnter={props.split ? onMouseEnter : null} onMouseLeave={props.split ? onMouseLeave : null}
    onClick={props.onClick}>
    <IconContext.Provider value={{ size: '18px' }}>
      {props.icon}
    </IconContext.Provider>
  </div>)

  return (<div>
    <div
      onClick={props.split ? null : props.onClick}
      style={{
        minWidth: '220px',
        maxWidth: '220px',
        height: '100%',
        display: 'flex',
        color: props.color,
        borderColor: props.color,
        fontWeight: '400',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        userSelect: 'none',
        fontSize: '1rem',
        lineHeight: '1.5',
        borderRadius: '.25rem',
        border: '1px solid',
        backgroundColor: backgroundColor,
        cursor: props.split ? 'unset' : 'pointer',
      }}>
      <div onMouseEnter={props.split ? null : onMouseEnter} onMouseLeave={props.split ? null : onMouseLeave} style={{ fontWeight: '550', minWidth: props.split ? '80%' : '100%', height: '100%', marginTop: '1px', padding: '.375rem .75rem', }}>
        <div>{props.text}</div>
      </div>
      {props.split && props.tooltip &&
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 100 }}
          overlay={(p) => (<Tooltip id="button-tooltip" {...p}> {props.tooltip} </Tooltip>)}
        >
          {miniButton}
        </OverlayTrigger>}
      {props.split && !props.tooltip && miniButton}
    </div>
    <div style={{ minWidth: '200px', maxWidth: '220px', fontSize: '.8rem' }}>
      {props.caption}
    </div>
  </div>
  );
}

export default GeneralButton;