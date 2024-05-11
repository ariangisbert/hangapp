import React from "react";
import Svg, { Path } from "react-native-svg"

function Icon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 10 10" width={18} height={11}
      {...props}>
      <Path
        fillOpacity="0.85"
        d="M6.816 8.428a.76.76 0 00.577-.244l5.996-6.036a.789.789 0 00.234-.566.788.788 0 00-.8-.81.875.875 0 00-.577.234L6.357 6.914h.909l-5.89-5.908A.83.83 0 00.812.77.796.796 0 000 1.582c0 .225.088.42.234.566L6.24 8.184a.76.76 0 00.576.244z"
      ></Path>
    </Svg>
  );
}

export default Icon;