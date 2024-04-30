import { Tabs } from "expo-router";
import IconoTabFesta from "../../assets/iconos/iconoTabFesta"
import IconoTabRifes from "../../assets/iconos/IconoTabRifes"
import IconoTabPersona from "../../assets/iconos/IconoTabPersona"
export default function TabLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: '#4e54c8', headerShown:false, tabBarStyle:{elevation:0 }, tabBarLabelStyle:{paddingBottom:3.5}}}>
        
        {/* Per a que no se mostre */}
        <Tabs.Screen name="index" options={{href:null}}></Tabs.Screen> 
        
        <Tabs.Screen
          name="EventosUsuario"
          options={{
            title:"Eventos",
            tabBarIcon: ({ focused, color, size }) => (
              <IconoTabFesta fill={color} height={size} width={size}/>
            )
          }}
        />


        <Tabs.Screen
          name="RifasUsuario"
          options={{
            title: 'Rifas',
            tabBarIcon: ({ focused, color, size }) => (
              <IconoTabRifes fill={color} height={size} width={size}/>
            )
          }}
        />
        

        <Tabs.Screen
          name="PersonalUsuario"
          options={{
            title: 'Zona personal',
            tabBarIcon: ({ focused, color, size }) => (
              <IconoTabPersona fill={color} height={size} width={size}/>
            )
          }}
        />
      </Tabs>
    );
  }