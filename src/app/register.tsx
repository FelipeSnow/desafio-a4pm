import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Input } from "@/components/AccountInput";
import { Link, router } from "expo-router";
import { useUserDatabase } from "@/database/useUser";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [passwordInputState, setPasswordInputState] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { create } = useUserDatabase();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (password !== passwordConfirmation) {
        setPasswordInputState(true);
        return;
      }
      await create({ nome: userName, login: login, senha: password });
      setLoading(false);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
    }
  };

  return loading ? (
    <View style={{ height: "100%" }}>
      <ActivityIndicator color={"lightblue"} />
    </View>
  ) : (
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
        <Input
          onChangeText={(value) => {
            setUserName(value);
          }}
          label="Nome"
          value={userName}
        />
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
        <Input
          onChangeText={(value) => {
            setPasswordConfirmation(value);
          }}
          label="Confirme a Senha"
          value={passwordConfirmation}
          showValue={false}
          invalid={passwordInputState}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 50 }}
        onPress={() => handleSubmit()}
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
    <Link href={"/recipes/12"}>
      <Text style={{ color: "blue" }}>Faça Login!</Text>
    </Link>
  </View>
);
