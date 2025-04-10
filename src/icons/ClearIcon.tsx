import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

export default function ClearIcon({ width = 20, height = 20 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M6 6L18 18"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
