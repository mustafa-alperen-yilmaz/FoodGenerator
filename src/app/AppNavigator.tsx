import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SearchScreen from '../screens/SearchScreen';
import RecipesScreen from '../screens/RecipesScreen';
import DetailScreen from '../screens/DetailScreen';


export type RootStackParamList = {
Splash: undefined;
Search: undefined;
Recipes: { selected: string[] };
Detail: { recipe: any };
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Recipes" component={RecipesScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);
}