import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { AccountInput } from "@/components/AccountInput";
import { Link } from "expo-router";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignSelf: "center",
        display: "flex",
      }}
    >
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Header />
      </View>
      <View style={{ justifyContent: "space-between" }}>
        <AccountInput
          onChangeText={(value) => {
            setUserName(value);
          }}
          label="Nome"
          value={userName}
        />
        <AccountInput
          onChangeText={(value) => {
            setLogin(value);
          }}
          label="Login"
          value={login}
        />
        <AccountInput
          onChangeText={(value) => {
            setPassword(value);
          }}
          label="Senha"
          value={password}
          showValue={false}
        />
        <AccountInput
          onChangeText={(value) => {
            setPasswordConfirmation(value);
          }}
          label="Confirme a Senha"
          value={passwordConfirmation}
          showValue={false}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => Alert.alert("Não esquece de implementar o register")}
      >
        <View
          style={{
            backgroundColor: "lightblue",
            padding: 20,
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 18 }}>Registrar-se</Text>
        </View>
      </TouchableOpacity>
      <LoginNav />
    </SafeAreaView>
  );
}

const Header = () => (
  <View>
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Registre-se Hoje!</Text>
    <Text>
      Faça parte de um espaço onde todos podem ser criativos na cozinha.
    </Text>
  </View>
);

const LoginNav = () => (
  <View>
    <Text>Já tem uma conta?</Text>
    <Link href={"/"}>
      <Text style={{ color: "blue" }}>Faça Login!</Text>
    </Link>
  </View>
);
