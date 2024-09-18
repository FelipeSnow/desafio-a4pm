import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  onPress: () => void;
  marginTop?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

const Button = ({
  onPress,
  children,
  style,
  marginTop,
  disabled,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <TouchableOpacity
      style={{ marginTop: marginTop || 16 }}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={{
          backgroundColor: disabled ? "gray" : "lightblue",
          alignItems: "center",
          borderRadius: 8,
          minHeight: 40,
          justifyContent: "center",
          ...style,
        }}
      >
        <Text style={{ fontSize: 16 }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
