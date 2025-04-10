import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};

export default function DeleteIcon({width = 24, height = 24}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6M10 11v6M14 11v6"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
