# 🌱 EcoTrip - Calculadora de Emissão de CO₂

[![Deploy to GitHub Pages](https://github.com/nicollasfrazao/eco-trip/actions/workflows/deploy.yml/badge.svg)](https://github.com/nicollasfrazao/eco-trip/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Uma calculadora interativa de emissão de CO₂ para viagens, desenvolvida para ajudar pessoas a fazerem escolhas mais sustentáveis em seus deslocamentos. Compare diferentes meios de transporte e veja o impacto ambiental de cada um.

![EcoTrip Preview](https://via.placeholder.com/800x400?text=EcoTrip+Screenshot)

## 🚀 Funcionalidades

- **Cálculo Automático de Distância**: Selecione origem e destino entre 40+ cidades brasileiras e a distância é calculada automaticamente
- **Comparação de Meios de Transporte**: Compare emissões entre bicicleta, carro, ônibus e caminhão
- **Visualização Intuitiva**: Gráficos e cards coloridos para fácil compreensão dos resultados
- **Cálculo de Economia**: Veja quanto CO₂ você economiza escolhendo transportes mais sustentáveis
- **Créditos de Carbono**: Calcule quantos créditos de carbono seriam necessários para compensar suas emissões
- **Entrada Manual**: Opção de inserir distância manualmente para rotas não cadastradas
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com variáveis CSS e gradientes
- **JavaScript (ES5+)**: Lógica de cálculo e manipulação DOM
- **BEM**: Metodologia para nomenclatura de classes CSS
- **GitHub Actions**: Deploy automatizado para GitHub Pages

### Arquitetura do Projeto

O projeto utiliza arquitetura modular com separação de responsabilidades:

- `routes-data.js` - Banco de dados de rotas brasileiras
- `config.js` - Configurações globais e fatores de emissão
- `calculator.js` - Lógica de cálculo de emissões
- `ui.js` - Renderização e manipulação de interface
- `app.js` - Inicialização e orquestração da aplicação

## 📊 Fatores de Emissão

Os cálculos são baseados em fatores médios de emissão de CO₂ (kg CO₂ por km):

| Meio de Transporte | Emissão (kg CO₂/km) | Ícone |
|-------------------|---------------------|-------|
| Bicicleta         | 0.000               | 🚲    |
| Ônibus            | 0.089               | 🚌    |
| Carro             | 0.120               | 🚗    |
| Caminhão          | 0.960               | 🚚    |

## 🎯 Como Usar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/nicollasfrazao/eco-trip.git
   cd eco-trip
   ```

2. **Abra o projeto**
   
   Simplesmente abra o arquivo `index.html` em seu navegador. Não há necessidade de build ou instalação de dependências.

3. **Use a calculadora**
   - Selecione a cidade de origem
   - Selecione a cidade de destino
   - A distância será preenchida automaticamente
   - Escolha o meio de transporte
   - Clique em "Calcular Emissão"
   - Visualize os resultados, comparações e créditos de carbono

## 📁 Estrutura do Projeto

```
eco-trip/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Workflow de deploy
├── css/
│   └── style.css            # Estilos da aplicação
├── js/
│   ├── routes-data.js       # Banco de dados de rotas
│   ├── config.js            # Configurações e setup
│   ├── calculator.js        # Lógica de cálculos
│   ├── ui.js                # Gerenciamento de interface
│   └── app.js               # Inicialização da app
├── index.html               # Página principal
├── LICENSE                  # Licença MIT
└── README.md               # Este arquivo
```

## 🌐 Deploy

O projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### Configuração do GitHub Pages

1. Vá em **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Faça push para a branch `main`
4. O deploy será executado automaticamente
5. Acesse seu site em: `https://nicollasfrazao.github.io/eco-trip/`

### Deploy Manual

Para disparar o deploy manualmente:

1. Vá na aba **Actions** do repositório
2. Selecione **Deploy to GitHub Pages**
3. Clique em **Run workflow**

## 🗺️ Rotas Disponíveis

O sistema inclui 40 rotas entre cidades brasileiras, cobrindo:

- Conexões entre capitais (São Paulo-Rio, Brasília-Goiânia, etc.)
- Rotas regionais do Sudeste (São Paulo-Campinas, Rio-Niterói, etc.)
- Rotas do Sul (Curitiba-Florianópolis, Porto Alegre-Gramado, etc.)
- Rotas do Nordeste (Salvador-Recife, Fortaleza-Natal, etc.)
- Rotas do Norte (Manaus-Belém)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaRota`)
3. Commit suas mudanças (`git commit -m 'Adiciona novas rotas do Centro-Oeste'`)
4. Push para a branch (`git push origin feature/NovaRota`)
5. Abrir um Pull Request

### Ideias para Contribuição

- Adicionar mais rotas brasileiras
- Incluir rotas internacionais
- Adicionar outros meios de transporte (avião, trem, etc.)
- Melhorar fatores de emissão com dados mais recentes
- Adicionar gráficos interativos
- Implementar modo escuro
- Adicionar idiomas (i18n)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Nícollas**

Desenvolvido com ❤️ para a [DIO - Digital Innovation One](https://dio.me) como parte do projeto de aprendizado com GitHub Copilot.

---

## 🌟 Agradecimentos

- DIO pela oportunidade de aprendizado
- GitHub Copilot pela assistência no desenvolvimento
- Comunidade open source pelas inspirações

---

<div align="center">
  <p>Se este projeto te ajudou, considere dar uma ⭐</p>
  <p>Feito com 🌱 pensando no futuro do planeta</p>
</div>
