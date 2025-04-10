import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};
export default function PlusIcon({width = 24, height = 24}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
