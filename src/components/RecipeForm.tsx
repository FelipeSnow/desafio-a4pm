import { View, ScrollView } from "react-native";
import { CustomPicker, Input, NumberInput } from "./AccountInput";
import Button from "./Button";

interface RecipeFormProps {
  recipeId?: number;
  categories: { value: number; label: string }[];
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  recipeName: string | undefined;
  setRecipeName: React.Dispatch<React.SetStateAction<string | undefined>>;
  prepareTime: number;
  setPrepareTime: React.Dispatch<React.SetStateAction<number>>;
  portionCount: number;
  setPortionCount: React.Dispatch<React.SetStateAction<number>>;
  ingredientes: string[];
  setIngredientes: React.Dispatch<React.SetStateAction<string[]>>;
  prepareMethod: string[];
  setPrepareMethod: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => void;
}

export const RecipeForm = ({
  recipeId,
  categories,
  selectedCategory,
  setSelectedCategory,
  recipeName,
  setRecipeName,
  prepareTime,
  setPrepareTime,
  portionCount,
  setPortionCount,
  ingredientes,
  setIngredientes,
  prepareMethod,
  setPrepareMethod,
  handleSubmit,
}: RecipeFormProps) => {
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
          {!!recipeId ? "Editar Receita" : "Criar receita"}
        </Button>
      </ScrollView>
    </View>
  );
};
