import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingHorizontal: 30,
        alignSelf: "center",
        display: "flex",
      }}
    >
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Header />
      </View>
      <View>
        <AccountInput
          onChangeText={(value) => {
            setUsername(value);
          }}
          label="Nome de usuário"
          value={username}
        />
        <AccountInput
          onChangeText={(value) => {
            setPassword(value);
          }}
          label="Senha"
          value={password}
          showValue={false}
        />
        <RegisterNav />
      </View>
      <TouchableOpacity
        onPress={() => Alert.alert("Não esquece de implementar o login")}
      >
        <View
          style={{
            backgroundColor: "lightblue",
            padding: 20,
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>Entrar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Header = () => (
  <View>
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Olá,</Text>
    <Text>Bem vindo de volta!</Text>
  </View>
);

const RegisterNav = () => (
  <View>
    <Text>Não tem uma conta?</Text>
    <TouchableOpacity>
      <Text>Criar conta</Text>
    </TouchableOpacity>
  </View>
);

interface AccountInputProps {
  label: string;
  value: string;
  showValue?: boolean;
  onChangeText: (text: string) => void;
}

const AccountInput = ({
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
    flexDirection: "column",
    //padding: 10,
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
