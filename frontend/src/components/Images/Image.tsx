import React from "react";
import * as S from './imageStyle';

interface Props{
    imageUrl: string;
}

const image: React.FC<Props> = ({imageUrl}) => {
  return (
    <div>
        <S.Image src={imageUrl}/>
    </div>
  )
}

export default image