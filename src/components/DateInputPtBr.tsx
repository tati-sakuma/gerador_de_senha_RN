import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const DateInputPtBr = () => {
  const [dataNascimento, setDataNascimento] = useState('');

  // Função para aplicar a máscara de data
  const handleDataNascimentoChange = (text: string) => {
    // Remove qualquer caracter não numérico
    let value = text.replace(/\D/g, '');

    // Aplica a máscara de data (DD/MM/YYYY)
    if (value.length <= 2) {
      value = value.replace(/(\d{2})/, '$1');
    } else if (value.length <= 4) {
      value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
    } else {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }

    setDataNascimento(value); // Atualiza o estado com o valor formatado
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Data de Nascimento:</Text>
      <TextInput
        value={dataNascimento}
        onChangeText={handleDataNascimentoChange} // Aplica a função de formatação
        style={{
          borderBottomWidth: 1,
          marginTop: 10,
          padding: 5,
        }}
        placeholder="DD/MM/YYYY"
        keyboardType="numeric" // Aceita apenas números
      />
      <Text style={{ marginTop: 10 }}>Data Digitada: {dataNascimento}</Text>
    </View>
  );
};

export default DateInputPtBr;
