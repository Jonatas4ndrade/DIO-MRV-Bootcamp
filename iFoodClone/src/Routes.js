import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import Main from './views/Main';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

const Routes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes