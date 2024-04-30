import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import TextoDegradado from "./TextoDegradado"; // Asegúrate de que la importación sea correcta

const CabeceraDegradado = ({ title }:any) => {
  return (
    <View style={styles.headerContainer}>
      <TextoDegradado 
        children={title}
        color={{ color1: Colors.DegradatMorat.color1, color2: Colors.DegradatMorat.color2 }} // Ejemplo de colores de degradado
        style={styles.headerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 100, // Altura adecuada para un encabezado grande
    justifyContent: "flex-end",
    paddingHorizontal:20, 
  },
  headerText: {
    fontSize: 34, // Tamaño de texto grande para Large Title
    fontWeight: "700",
  }
});

export default CabeceraDegradado;