
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconoTabFesta from "../../../assets/iconos/IconoTabFesta"
import { Stack } from 'expo-router';
import { useHeaderHeight } from "@react-navigation/elements"

const HomeEventosUsuario = () => {

  const alturaHeader = useHeaderHeight()

  return (
    <SafeAreaView>
      <Text></Text>
    </SafeAreaView>
  );
};

export default HomeEventosUsuario;