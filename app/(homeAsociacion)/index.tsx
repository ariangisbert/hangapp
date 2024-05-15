 import { Redirect } from 'expo-router';
import React from 'react';
 import { View, Text } from 'react-native';
 
 const MyComponent = () => {
   return (
     <Redirect href={"/EventosAsociacion"}></Redirect>
   );
 };
 
 export default MyComponent;