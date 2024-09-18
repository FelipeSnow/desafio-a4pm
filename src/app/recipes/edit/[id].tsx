import { RecipeForm } from "@/components/RecipeForm";
import { useCategoriaDatabase } from "@/database/useCategorias";
import { Receita, useRecipesDatabase } from "@/database/useRecipes";
import { useAuth } from "@/hooks/useAuth";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function EditRecipe() {
  const { id: recipeId } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Receita>();
  const [recipeName, setRecipeName] = useState<string>();
  const [prepareTime, setPrepareTime] = useState<number>(0);
  const [portionCount, setPortionCount] = useState<number>(0);
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [prepareMethod, setPrepareMethod] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [categories, setCategories] = useState<
    { value: number; label: string }[]
  >([]);

  const { edit, getById } = useRecipesDatabase();
  const { getAllAsync } = useCategoriaDatabase();
  const { user } = useAuth();

  useEffect(() => {
    const handleFetch = async (recipeId: number) => {
      const result = await getById(recipeId);
      if (result) {
        setRecipe(result);
        setRecipeName(result.nome);
        setPrepareTime(result.tempo_preparo_minutos);
        setPortionCount(result.porcoes);
        setIngredientes(result.ingredientes.split("|"));
        setPrepareMethod(result.modo_preparo.split("|"));
      }
    };
    handleFetch(Number(recipeId));
  }, [recipeId]);

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    const ingredientesJoined = ingredientes?.join("|");
    const prepareMethodJoined = prepareMethod?.join("|");

    const body = {
      id: Number(recipeId),
      id_usuarios: user?.id,
      id_categorias: 1,
      nome: recipeName as string,
      tempo_preparo_minutos: prepareTime,
      porcoes: portionCount,
      modo_preparo: prepareMethodJoined as string,
      ingredientes: ingredientesJoined as string,
      criado_em: recipe?.criado_em as string,
      alterado_em: new Date().toISOString(),
    };

    console.log(body);
    await edit(body);

    router.back();
  };

  useEffect(() => {
    const handleAsync = async () => {
      const result = (await getAllAsync()).map((x) => ({
        value: x.id,
        label: x.nome,
      }));
      setCategories(result);
    };

    handleAsync();
  }, [getAllAsync]);

  return (
    <RecipeForm
      recipeId={Number(recipeId)}
      recipeName={recipeName}
      setRecipeName={setRecipeName}
      prepareTime={prepareTime}
      setPrepareTime={setPrepareTime}
      portionCount={portionCount}
      setPortionCount={setPortionCount}
      ingredientes={ingredientes}
      setIngredientes={setIngredientes}
      prepareMethod={prepareMethod}
      setPrepareMethod={setPrepareMethod}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      categories={categories}
      handleSubmit={handleSubmit}
    />
  );
}
