import RecipeCard from "@/components/RecipeCard";
import { Receita, useRecipesDatabase } from "@/database/useRecipes";
import { useAuth } from "@/hooks/useAuth";
import { router, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

export default function List() {
  const [data, setData] = useState<Receita[]>([]);
  const { filterByName, deleteByID } = useRecipesDatabase();
  const { user } = useAuth();

  const handleFilter = useCallback(async () => {
    const result = await filterByName("");
    setData(result);
  }, [filterByName]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RecipeCard
            deletable={item.id_usuarios === user?.id}
            data={item}
            onPress={() => router.navigate(`/recipes/${item.id}`)}
            onDelete={async () => {
              await deleteByID(item.id);
              handleFilter();
            }}
          />
        )}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}

const EmptyList = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Nenhuma receita encontrada!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
