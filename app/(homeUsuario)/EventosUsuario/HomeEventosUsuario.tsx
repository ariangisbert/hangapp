
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconoTabFesta from "../../../assets/iconos/IconoTabFesta"
import { Stack } from 'expo-router';
import { useHeaderHeight } from "@react-navigation/elements"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeEventosUsuario = () => {

  const alturaHeader = useHeaderHeight()

  return (
    <View style={{flex:1, marginTop: Platform.OS==="ios"? alturaHeader+60:20, borderWidth:2}}>
      
      <Text>Hola</Text>



    </View>
  );
};

export default HomeEventosUsuario;

const styles = StyleSheet.create({





})