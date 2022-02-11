import {navigationContainer} from @react-navigation/Native;
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './views/Home';
import Main from './views/Main';

const Stack = createStackNavigator();

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