import { Input } from "@/components/AccountInput";
import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [login, setLogin] = useState<string>(__DEV__ ? "admin" : "");
  const [password, setPassword] = useState<string>(__DEV__ ? "admin" : "");

  const { login: handleLogin } = useAuth();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        padding: 30,
        alignSelf: "center",
        display: "flex",
      }}
    >
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Header />
      </View>
      <View>
        <Input
          onChangeText={(value) => {
            setLogin(value);
          }}
          label="Login"
          value={login}
        />
        <Input
          onChangeText={(value) => {
            setPassword(value);
          }}
          label="Senha"
          value={password}
          showValue={false}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => handleLogin(login, password)}
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
      <RegisterNav />
    </SafeAreaView>
  );
}

const Header = () => (
  <View>
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      Faça Login e Comece a Cozinhar!
    </Text>
    <Text>Acesse suas receitas favoritas em um só lugar.</Text>
  </View>
);

const RegisterNav = () => (
  <View>
    <Text>Não tem uma conta?</Text>
    <Link href={"/register"}>
      <Text style={{ color: "blue" }}>Registre-se Hoje!</Text>
    </Link>
  </View>
);
