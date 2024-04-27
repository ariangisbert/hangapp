import { Tabs } from "expo-router";
import IconoTabFesta from "../../assets/iconos/IconoTabFesta"

export default function TabLayout() {
    return (
      <Tabs screenOptions={{ tabBarActiveTintColor: '#4e54c8', headerShown:false  }}>
        
        {/* Per a que no se mostre */}
        <Tabs.Screen name="index" options={{href:null}}></Tabs.Screen> 
        
        <Tabs.Screen
          name="EventosUsuario"
          options={{
            title: 'Eventos',
            tabBarIcon: ({ focused, color, size }) => (
              <IconoTabFesta fill={color} height={size} width={size}/>
            )
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