import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface AccountInputProps {
  label: string;
  value: string;
  showValue?: boolean;
  onChangeText: (text: string) => void;
}

export const AccountInput = ({
  label,
  value,
  showValue = true,
  onChangeText,
}: AccountInputProps) => {
  return (
    <View style={styles.Container}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
      <TextInput
        style={styles.TextBox}
        secureTextEntry={!showValue}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginVertical: 10,
    flexDirection: "column",
  },
  TextBox: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    borderColor: "#d9d9d9",
    color: "black",
    padding: 8,
  },
});
