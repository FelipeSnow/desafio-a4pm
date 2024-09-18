import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useRecipesDatabase, Receita } from "@/database/useRecipes";
import { Feather } from "@expo/vector-icons";

const MOCK = {
  alterado_em: "2021-09-01 00:00:00",
  criado_em: "2021-09-01 00:00:00",
  id: 1,
  id_categorias: 1,
  id_usuarios: 1,
  ingredientes:
    "3 cenouras médias,| 4 ovos,| 1 xícara de óleo,| 2 xícaras de açúcar,| 2 xícaras de farinha de trigo,| 1 colher de sopa de fermento em pó",
  modo_preparo:
    "1. Preaqueça o forno a 180°C.| 2. Unte e enfarinhe uma forma de buraco no meio.| 3. No liquidificador, bata a cenoura, os ovos e o óleo.| 4. Em uma tigela, misture a farinha, o açúcar e o fermento.| 5. Junte a mistura do liquidificador com a mistura da tigela e mexa bem.| 6. Despeje a massa na forma e leve ao forno por 40 minutos.|",
  nome: "Bolo de cenoura",
  porcoes: 12,
  tempo_preparo_minutos: 60,
};

export default function RecipeId() {
  const { id } = useLocalSearchParams();
  const { getById } = useRecipesDatabase();

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
  }, [recipe?.id]);

  const preparation = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipe.modo_preparo
      .split("|")
      .map((step) => step.trim())
      .filter(Boolean);
  }, [recipe?.id]);

  const fetchRecipe = async () => {
    setLoading(true);
    const recipe = await getById(Number(id));

    setRecipe(recipe);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

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
