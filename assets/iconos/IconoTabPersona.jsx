import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 0 166 110"
      {...props}
    >
      <Path
        d="M13.574 138.281h101.953c8.594 0 13.672-3.906 13.672-10.449 0-19.824-24.804-47.168-64.648-47.168C24.805 80.664 0 108.008 0 127.832c0 6.543 5.078 10.449 13.574 10.449zm50.977-71.289c16.406 0 30.86-14.746 30.86-33.984C95.41 13.868 80.956 0 64.55 0 48.242 0 33.789 14.258 33.789 33.203c0 19.043 14.453 33.79 30.762 33.79z"
        fillOpacity={0.85}
      />
    </Svg>
  )
}

export default SvgComponent