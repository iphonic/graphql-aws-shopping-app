import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function LogoutIcon({
  width = 20,
  height = 20,
  color = '#4f46e5',
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 17L21 12L16 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12H9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
