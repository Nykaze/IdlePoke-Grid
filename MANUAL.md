# Manual do Idle Poke Grid

Guia curto do que cada coisa faz. Se você só quer resolver um problema pontual, veja o [FAQ](FAQ.md).

## A barra do topo

| Botão | O que faz |
|---|---|
| **▶ Logar equipe** | Loga todas as contas de uma vez, com as senhas salvas |
| **👤 Treinadores** | Cadastra e-mail/usuário e senha de cada conta. O 🗑 limpa o formulário |
| **⟳ Atualizar tudo** | Recarrega todos os painéis |
| **☰ Opções** | O menu com tudo o mais (detalhes abaixo) |
| **🔗** | Referral do criador, pra copiar e ajudar de graça |

Atalhos de teclado (só quando o foco está na interface, não dentro do jogo): **1 a 4** ligam/desligam o painel correspondente, **Ctrl + 1 a 4** expandem o painel, **L** loga equipe, **R** recarrega tudo, **T** abre Treinadores, **O** abre o menu, **Esc** sai do expandido. Dentro de um painel, **Ctrl + rolou o mouse** aplica zoom como o Ctrl +/-.

## ☰ Opções

| Opção | O que faz |
|---|---|
| **🔢 Painéis: N** | Quantas contas rodam ao mesmo tempo (1 a 4) |
| **🎯 Hunt** | Mostra sobre cada painel o que a conta está farmando e há quanto tempo |
| **👁 Esconder** | Escolhe o que esconder no jogo de cada conta (chat, janelas, barras…) |
| **🔔 Alertas** | Avisa por notificação quando uma conta cai |
| **🔊 Som** | Liga e desliga o som de todos os painéis de uma vez |
| **⚡ Eco** | Segura o uso de CPU, o jogo fica mais leve sem parar o progresso |
| **💤 Dormir** | Impede o PC de dormir enquanto farma (a tela ainda pode desligar) |
| **📥 Minimiza p/ bandeja** | O botão minimizar esconde na bandeja em vez da barra de tarefas |
| **🚀 Abrir com o Windows** | Cria um atalho na pasta Inicializar pra abrir junto com o sistema |
| **💾 Exportar config** | Salva um arquivo com as configurações (senhas ficam fora) |
| **📂 Importar config** | Restaura configurações de um arquivo exportado |
| **▦ Grade** | Alterna o arranjo: **Grade** (2×2), **▤ Uma coluna**, **▥ Uma linha** |
| **🖼 Proporção original** | Mantém a proporção do jogo, sem esticar a imagem (sobra fundo escuro) |
| **🎨** | Cor de destaque do app: violeta, azul, verde, rosa ou âmbar |
| **🌐** | Idioma da interface: português, inglês ou espanhol |
| **🐞 Erros** | Abre o relatório de erros. Se o app travar ou fechar sozinho, esse arquivo mostra onde parou |

## 👁 Esconder elementos do jogo e 🎯 Hunt

Dois botões novos no ☰ Opções pra quem farma e quer a tela limpa:

- **👁 Esconder** abre uma janelinha com caixas de seleção. O que você marcar **some do jogo de todas as contas** (a lista é igual pra todo mundo). As opções:
  - **🎛 Todas as janelas do jogo** — menu de cima, equipe (F1–F6), buffs, notificações, CP/Mark/Mercado e a barra do treinador
  - **💬 Chat** — a janela de conversa
  - **⏱ Janela de hunt** — o quadro com o nome da hunt e o tempo
  - **☰ Menu de ícones** — a barra de ícones do topo
  - **⚔ Combat (modo batalha)** — o aviso do modo batalha
  - O que esconder **fica escondido mesmo trocando de tela**: o app reaplica sozinho. Pra ver de novo, é só desmarcar. Tudo que foi escondido usa *esconder* (não apaga) e **volta na hora** ao desmarcar, sem recarregar o jogo.
- **🎯 Hunt** liga uma pílula por cima de cada painel mostrando **o que a conta está farmando e o tempo**: ex.: `🎯 Praia Slowpoke 49:01`. Se a conta não está caçando, aparece `🎯 sem hunt`. Ela atualiza sozinha a cada poucos segundos e não atrapalha os cliques no jogo.

> Dica: dá pra combinar — esconder quase tudo com o 👁 e deixar só a pílula 🎯 pra acompanhar a hunt sem poluição.

## Os painéis

Cada painel é uma conta, com a própria sessão. No cabeçalho de cada um:

- **●** bolinha de status: verde online, acinzentada desligado, vermelha/piscando quando cai
- **nome** — dê dois cliques pra renomear o painel
- **− / % / +** — diminuir zoom / porcentagem (clique na % volta pra 100%) / aumentar
- **⟳** — recarrega só aquele painel
- **⛶** — expande o painel pra tela toda (de novo ou Esc volta)

**Arraste o cabeçalho de um painel pra cima de outro** pra trocá-los de lugar. A ordem fica salva e vale em qualquer arranjo.

O **filete colorido** no topo do painel é a cor da conta (1 azul, 2 verde, 3 amarelo, 4 roxo), pra você saber qual conta é qual de relance.

## Bandeja

O ícone na bandeja do Windows mostra um **círculo vermelho com um número** quando há contas fora do ar: é a quantidade de painéis caídos naquele momento. Clicar com o botão direito mostra as opções de mostrar/ocultar a janela e sair.

## Coisas que confundem no começo

- **"Abrir Idle Poke Grid" (.vbs) não abre nada?** Confira o passo a passo do [TUTORIAL.md](TUTORIAL.md): na primeira vez ele instala as dependências e demora um pouco.
- **Dois apps abertos ao mesmo tempo**: só o primeiro mostra a janela. Feche tudo e abra de novo.
- **A conta não entra sozinha**: abra **👤 Treinadores** e confira se e-mail/usuário e senha estão certos e salvos.
- **Não consigo digitar no jogo**: clique dentro do painel do jogo primeiro; o teclado só vai pro jogo quando ele está em foco.
