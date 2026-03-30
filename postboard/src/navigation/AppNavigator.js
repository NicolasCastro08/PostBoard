import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import FeedScreen from '../screens/FeedScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import FormularioScreen from '../screens/FormularioScreen';
import SobreScreen from '../screens/SobreScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FeedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#064e3b' },
                headerTintColor: '#d1fae5',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={({ navigation }) => ({
                    title: 'PostBoard',
                    headerRight: () => (
                        <Text
                            style={{ color: '#fff', fontSize: 24, marginRight: 10 }}
                            onPress={() => navigation.navigate('FormularioTab')}
                        >
                            +
                        </Text>
                    ),
                })}
            />

            <Stack.Screen
                name="Detalhes"
                component={DetalhesScreen}
                options={{ title: 'Detalhes do Post' }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#059669',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopColor: '#e5e7eb',
                    borderTopWidth: 1,
                    paddingBottom: 4,
                    height: 60,
                },
                tabBarIcon: ({ focused }) => {
                    const icones = {
                        FeedTab: focused ? '📋' : '📄',
                        FormularioTab: focused ? '✏️' : '📝',
                        SobreTab: 'ℹ️',
                    };
                    return <Text style={{ fontSize: 22 }}>{icones[route.name]}</Text>;
                },
            })}
        >
            <Tab.Screen
                name="FeedTab"
                component={FeedStack}
                options={{ tabBarLabel: 'Posts' }}
            />

            <Tab.Screen
                name="FormularioTab"
                component={FormularioScreen}
                options={{
                    tabBarLabel: 'Novo Post',
                    title: 'Novo Post',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#064e3b' },
                    headerTintColor: '#d1fae5',
                }}
            />

            <Tab.Screen
                name="SobreTab"
                component={SobreScreen}
                options={{
                    tabBarLabel: 'Sobre',
                    title: 'Sobre',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#064e3b' },
                    headerTintColor: '#d1fae5',
                }}
            />
        </Tab.Navigator>
    );
}