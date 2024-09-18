import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

interface AccountInputProps {
  label: string;
  value: string;
  showValue?: boolean;
  onChangeText: (text: string) => void;
  invalid?: boolean;
}

export const Input = ({
  invalid,
  label,
  value,
  showValue = true,
  onChangeText,
}: AccountInputProps) => {
  return (
    <View style={styles.Container}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
      <TextInput
        style={[styles.TextBox, { borderColor: invalid ? "red" : "#d9d9d9" }]}
        secureTextEntry={!showValue}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
};

export const NumberInput = ({
  onChange,
  value,
  label,
}: {
  onChange: (value: number) => void;
  value: number;
  label: string;
}) => {
  return (
    <View style={styles.Container}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
      <TextInputMask
        style={styles.TextBox}
        onChangeText={(value) => onChange(Number.parseInt(value))}
        value={value.toString()}
        type={"only-numbers"}
        placeholderTextColor="#BBBBBB"
      />
    </View>
  );
};

export const CustomPicker = ({
  items,
  value,
  handleChange,
}: {
  items: { value: any; label: string }[];
  value: any;
  handleChange: (value: any) => void;
}) => {
  return (
    <Picker
      onValueChange={(value) => {
        handleChange(value);
      }}
      selectedValue={value}
      style={styles.TextBox}
    >
      {items.map((item, index) => (
        <Picker.Item key={`PICKER ${index}`} {...item} />
      ))}
    </Picker>
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
