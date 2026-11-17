const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// IMPORTANTE: o Render fornece a porta automaticamente
const PORT = process.env.PORT || 3000;

// Permite que o front-end acesse o back-end
app.use(cors());

// Permite receber JSON
app.use(express.json());

// Serve os arquivos do site dentro da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// ROTA DA API: Simula os dados dos sensores em tempo real
app.get('/api/sensores', (req, res) => {

    // Simulação dos sensores
    const umidadeSolo = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    const temperatura = (Math.random() * (32 - 22) + 22).toFixed(1);
    const consumoAgua = (Math.random() * (150 - 50) + 50).toFixed(1);

    // Envia os dados para o site
    res.json({
        umidade: umidadeSolo,
        temperatura: temperatura,
        consumo: consumoAgua,
        status: umidadeSolo < 50 ? "Irrigando..." : "Estável",
        timestamp: new Date().toLocaleTimeString('pt-BR')
    });
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`💧 Sistema de Irrigação AgroSmart ativo!`);
});