import { Stack } from "expo-router";

import { initializeDatabase } from "@/database/intializeDatabase";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="app.db" onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/list" />
        <Stack.Screen name="recipe/[id]" />
        <Stack.Screen name="recipe" />
      </Stack>
    </SQLiteProvider>
  );
}
