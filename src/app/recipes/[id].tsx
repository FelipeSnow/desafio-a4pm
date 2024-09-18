import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useRecipesDatabase, Receita } from "@/database/useRecipes";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";

export default function RecipeId() {
  const { id } = useLocalSearchParams();
  const { getById } = useRecipesDatabase();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Receita | null>();

  const ingredients = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipe.ingredientes
      .split("|")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
  }, [recipe]);

  const preparation = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipe.modo_preparo
      .split("|")
      .map((step) => step.trim())
      .filter(Boolean);
  }, [recipe]);

  const fetchRecipe = async (id: number) => {
    console.log("called?");
    setLoading(true);
    const recipe = await getById(id);

    setRecipe(recipe);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchRecipe(Number(id));
      }
    }, [id]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe?.nome}</Text>
      <View style={styles.preparationWrapper}>
        <View style={styles.preparationContainer}>
          <Feather name="clock" size={24} color="black" />
          <Text style={styles.preparationTitle}>Preparo</Text>
          <Text style={styles.preparationText}>
            {recipe?.tempo_preparo_minutos} min
          </Text>
        </View>
        <View style={styles.preparationContainer}>
          <Feather name="users" size={24} color="black" />
          <Text style={styles.preparationTitle}>Porções</Text>
          <Text style={styles.preparationText}>{recipe?.porcoes}</Text>
        </View>
      </View>

      <View style={styles.ingredientsWrapper}>
        <Text style={styles.subtitle}>Ingredientes:</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientsTextWrapper}>
            <View style={styles.bulletPoint} />
            <Text>{ingredient}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>Modo de preparo:</Text>
      <View style={styles.ingredientsWrapper}>
        {preparation.map((step, index) => (
          <Text key={index}>{step}</Text>
        ))}
      </View>
      {user?.id === recipe?.id_usuarios && (
        <Button
          style={{ backgroundColor: "#fa5518" }}
          onPress={() => router.navigate(`/recipes/edit/${id}`)}
          textStyle={{ color: "white", fontWeight: "bold" }}
        >
          Editar Receita
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
  },
  preparationWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  preparationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  preparationTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  preparationText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fa5518",
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fa5518",
  },
  ingredientsWrapper: {
    gap: 4,
    marginTop: 8,
  },
  ingredientsTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
