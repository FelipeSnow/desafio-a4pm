import { Link, Stack } from "expo-router";

import { initializeDatabase } from "@/database/intializeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Touchable, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="app.db" onInit={initializeDatabase}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen
              name="recipes/[id]"
              options={{
                headerTitle: "Detalhes da Receita",
              }}
            />
            <Stack.Screen
              name="recipes/index"
              options={{
                headerTitle: "Receitas",
                headerBackVisible: false,
                headerRight: () => (
                  <Link href="/recipes/create">
                    <AntDesign name="plus" size={24} color="black" />
                  </Link>
                ),
              }}
            />
            <Stack.Screen
              name="recipes/create"
              options={{
                headerTitle: "Nova Receita",
              }}
            />
          </Stack>
        </AuthProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

/*
 * (auth)
 *  login
 *  register
 * (main)
 *  recipes
 *    details
 *    list
 *    blabla
 *  user
 *    details
 *    edit
 * */
