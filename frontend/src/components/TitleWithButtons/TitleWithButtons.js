import React from 'react'
import Buttons from '../Buttons/Buttons';
import BorderContainer from '../BorderContainer/BorderContainer';

export default function TitleWithButtons({ title, buttons=[] }) {
  return (
    <BorderContainer>
        <h2 className='titleText'>{title}</h2>
        <Buttons buttons={buttons}/>
    </BorderContainer>
  );
}