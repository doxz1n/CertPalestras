// pages/formulario.tsx
"use client";

import { useState } from 'react';

const Formulario: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [resposta, setResposta] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para processar o CPF
    setResposta(`CPF inserido: ${cpf}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Inserir CPF</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Enviar
          </button>
        </form>
        {resposta && (
          <div style={styles.responseBox}>
            {resposta}
          </div>
        )}
        <div style={styles.resultBox}>
          {resposta && <p style={styles.resultText}>{resposta}</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ffffff', // Fundo branco
  },
  formContainer: {
    backgroundColor: '#ADD8E6', // Azul claro
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '400px',
  },
  title: {
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    fontWeight: 'bold', // Negrito
    fontSize: '24px',   // Fonte maior
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold', // Negrito
  },
  responseBox: {
    marginTop: '20px',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontWeight: 'bold', // Negrito
  },
  resultBox: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#ffffff', // Caixa em branco para resposta
    color: '#333',
    minHeight: '50px', // Altura mínima para a caixa
  },
  resultText: {
    fontWeight: 'bold', // Negrito
  },
};

export default Formulario;
