import { Tabs } from "expo-router";
import { Svg } from "react-native-svg";
import iconoTabFiesta from "../../assets/iconos/iconoTabFesta"
export default function TabLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: '#4e54c8' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Eventos',
            tabBarIcon:


          }}
        />
        <Tabs.Screen
          name="RifasUsuario"
          options={{
            title: 'Rifas',
          }}
        />
        <Tabs.Screen
          name="PersonalUsuario"
          options={{
            title: 'Zona personal',
          }}
        />
      </Tabs>
    );
  }