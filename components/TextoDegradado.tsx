import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"
{/*Este component, donat un text, aplicarà un degradat sobre ixe text i el tornará amb el mateix estil*/}
//Variables que acepta
//color
const TextoDegradado = (props:any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[props.color.color1, props.color.color2]}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default TextoDegradado;