import React, { useState } from 'react';
import { Text, TextProps, View, TextInput } from "react-native";


export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <View>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Olá,</Text>
        <Text>Bem vindo de volta!</Text >
      </View>
      <View>
        <AccountInput label="Email" value={email} />
        <AccountInput label="Senha" value={password} showValue={false} />
      </View>
    </View>
  );
}
interface AccountInputProps {
  label: string
  value: string
  showValue?: boolean
}

const AccountInput = ({ label, value, showValue = true }: AccountInputProps) => {
  return <View>
    <Text>{label}</Text>
    <TextInput>{value}</TextInput>
  </View>
}
