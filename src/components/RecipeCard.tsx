import { Receita } from "@/database/useRecipes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface Props {
  deletable: boolean;
  data: Receita;
  onPress?: () => void;
  onDelete?: () => void;
}

const RecipeCard = ({ data, onDelete, onPress, deletable }: Props) => {
  const renderLeftActions = () => (
    <Pressable
      style={{
        backgroundColor: "#CC0000",
        width: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        !deletable &&
          Alert.alert(
            "Deletar",
            "Não é possível deletar receitas de outros usuários!",
          );
        deletable &&
          Alert.alert("Deletar", "Deseja realmente deletar a receita?", [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Deletar",
              style: "destructive",
              onPress: onDelete,
            },
          ]);
      }}
    >
      <Feather name="trash" size={24} color="white" />
    </Pressable>
  );

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.title}>{data.nome}</Text>
        <View style={styles.footer}>
          <Text>Enviado por {data.nome_usuario}</Text>
          <View style={styles.preparationTime}>
            <Feather name="clock" size={16} color="black" />
            <Text>{data.tempo_preparo_minutos}</Text>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    minHeight: 100,
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  preparationTime: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
