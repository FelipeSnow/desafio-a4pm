import { RecipeForm } from "@/components/RecipeForm";
import { useCategoriaDatabase } from "@/database/useCategorias";
import { useRecipesDatabase } from "@/database/useRecipes";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState<string>();
  const [prepareTime, setPrepareTime] = useState<number>(0);
  const [portionCount, setPortionCount] = useState<number>(0);
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [prepareMethod, setPrepareMethod] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [categories, setCategories] = useState<
    { value: number; label: string }[]
  >([]);

  const { create } = useRecipesDatabase();
  const { getAllAsync } = useCategoriaDatabase();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    const ingredientesJoined = ingredientes?.join("|");
    const prepareMethodJoined = prepareMethod?.join("|");

    create({
      id_usuarios: user?.id,
      id_categorias: 1,
      nome: recipeName as string,
      tempo_preparo_minutos: prepareTime,
      porcoes: portionCount,
      modo_preparo: prepareMethodJoined as string,
      ingredientes: ingredientesJoined as string,
    });
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
