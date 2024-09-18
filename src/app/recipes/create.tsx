import { CustomPicker, Input, NumberInput } from "@/components/AccountInput";
import Button from "@/components/Button";
import { useCategoriaDatabase } from "@/database/useCategorias";
import { useRecipesDatabase } from "@/database/useRecipes";
import { useAuth } from "@/hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { TextInput, TextInputProps, View, ScrollView } from "react-native";

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
    <View>
      <ScrollView
        style={{ padding: 20, backgroundColor: "lightred", height: "100%" }}
      >
        <CustomPicker
          value={selectedCategory}
          handleChange={(value: number) => setSelectedCategory(value)}
          items={categories}
        />
        <Input
          label={"Nome da receita"}
          value={recipeName as string}
          onChangeText={(value) => setRecipeName(value)}
        />
        <NumberInput
          label={"Tempo de preparo (Em minutos)"}
          value={prepareTime}
          onChange={(value: number) => setPrepareTime(value)}
        />
        <NumberInput
          label={"Quantidade de porções"}
          value={portionCount}
          onChange={(value: number) => setPortionCount(value)}
        />
        {ingredientes?.map((value, index) => (
          <Input
            label={`Ingrediente ${index + 1}`}
            onChangeText={(text) =>
              setIngredientes((prevState) => {
                if (prevState?.length) {
                  prevState[index] = text;
                  return [...prevState];
                } else {
                  return [value];
                }
              })
            }
            value={value}
            key={index}
          />
        ))}
        <Button
          onPress={() =>
            setIngredientes((prevState) => {
              if (prevState?.length) {
                return [...prevState, ""];
              } else {
                return [""];
              }
            })
          }
        >
          Adicionar ingrediente
        </Button>
        {prepareMethod?.map((value, index) => (
          <Input
            label={`Instrução ${index + 1}`}
            onChangeText={(text) =>
              setPrepareMethod((prevState) => {
                if (prevState) {
                  prevState[index] = text;
                  return [...prevState];
                } else {
                  return prevState;
                }
              })
            }
            value={value}
            key={index}
          />
        ))}
        <Button
          onPress={() =>
            setPrepareMethod((prevState) => {
              if (prevState?.length) {
                return [...prevState, ""];
              } else {
                return [""];
              }
            })
          }
        >
          Adicionar modo de preparo
        </Button>

        <Button
          disabled={
            !ingredientes.length ||
            !prepareMethod.length ||
            !portionCount ||
            !prepareTime
          }
          onPress={handleSubmit}
        >
          Criar receita
        </Button>
      </ScrollView>
    </View>
  );
}
