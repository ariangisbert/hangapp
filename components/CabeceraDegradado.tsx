import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import TextoDegradado from "./TextoDegradado"; // Asegúrate de que la importación sea correcta

//Props 
//mediaAltura - Per a que soles tinga


const CabeceraDegradado = (props:any) => {
  return (
    <View style={[styles.headerContainer,{height:props.mediaAltura?50:50}]}>
      <TextoDegradado 
        children={props.title}
        color={{ color1: Colors.DegradatMorat.color1, color2: Colors.DegradatMorat.color2 }} // Ejemplo de colores de degradado
        style={styles.headerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "flex-end",
    paddingHorizontal:20,
    alignSelf:"flex-start"
  },
  
  headerText: {
    fontSize: 34, // Tamaño de texto grande para Large Title
    fontWeight: "700",
  }
});

export default CabeceraDegradado;