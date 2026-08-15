# Idle Poke Grid: perguntas frequentes

## Instalação e atualização

### Atualizar apaga minhas configurações e scripts?
Não. Tudo fica em `%APPDATA%\idlepokegrid`, fora do programa. Atualizar, reinstalar ou trocar de versão não mexe nessa pasta.

### Existe um config.ini?
Não. Backup = copiar a pasta `%APPDATA%\idlepokegrid`. Só as senhas não migram pra outro PC (são criptografadas pelo Windows); o resto vai junto. O menu também tem **💾 Exportar config** e **📂 Importar config** pra levar as configurações de um PC pro outro (senhas ficam fora).

### O processo abre mas a janela não aparece
O app anota cada etapa da abertura no relatório de erros. Abra o menu **☰ Opções → 🐞 Erros** e veja até onde ele chegou (janela criada / conteúdo pronto / bandeja pronta). O problema mais comum é rodar duas cópias do app ao mesmo tempo: só a primeira abre a janela. Feche tudo em executar de novo.

### Qual navegador o app usa?
Electron (Chromium, o motor do Chrome). Cada conta roda numa sessão separada, então os logins não se misturam.

## Uso diário

### Uma conta fica "fora do ar" e aparece um número vermelho na bandeja?
Esse é o **distintivo da bandeja**: quando um painel cai, o ícone na bandeja do Windows ganha um círculo vermelho com a quantidade de contas fora do ar. Clique no painel, veja o status e use **⟳** pra recarregar — ou espere, que ele loga sozinho se tiver login salvo.

### Mudei a cor do tema e some tudo?
Não, o tema muda na hora. Use **☰ Opções → 🎨** e escolha entre violeta, azul, verde, rosa e âmbar. A escolha fica salva.

### Reordenei os painéis e depois abri de novo: voltou ao normal?
Não deveria. A ordem fica salva. Se um painel for removido (você diminuiu o número de painéis), a ordem se ajusta pra nova quantidade.

### Como desligo ou ligo um painel?
Os painéis são ligados e desligados pela tecla **1**, **2**, **3** ou **4** (liga/desliga o painel correspondente). Desligado, o painel fica vazio até você ligar de novo.

### E o captcha?
O app nunca resolve captcha. É sempre você, na janela da conta. Proposital, não vai mudar.

### Como troco a quantidade de painéis?
**☰ Opções → 🔢 Painéis: N**. De 1 a 4. Diminuir remove os painéis do fim; aumentar traz novos.

### O que faz cada opção do menu?

- **🔔 Alertas**: avisa por notificação do Windows quando uma conta cai.
- **🎯 Hunt**: mostra por cima de cada painel o que a conta está farmando e há quanto tempo.
- **👁 Esconder**: escolhe o que esconder no jogo de todas as contas (chat, janelas, barras…).
- **🔊 Som**: liga/desliga o som de todos os painéis de uma vez.
- **⚡ Eco**: segura o uso de CPU (deixa o jogo mais leve).
- **💤 Dormir**: impede o PC de dormir enquanto farma (a tela ainda pode desligar).
- **📥 Minimiza p/ bandeja**: o botão minimizar esconde na bandeja em vez da barra de tarefas.
- **🚀 Abrir com o Windows**: cria um atalho na pasta Inicializar pra abrir junto com o sistema.
- **▦ Grade**: alterna o arranjo entre grade (2×2), uma coluna e uma linha.
- **🖼 Proporção original**: mantém a proporção do jogo sem esticar a imagem (sobra fundo escuro).
- **🌐 Idioma**: português, inglês ou espanhol (o jogo continua em pt/en).

### Escondi o chat (ou uma janela) e agora não consigo usar o jogo?
É só desmarcar no **☰ Opções → 👁 Esconder** — o que foi escondido volta na hora, sem recarregar. O escondido nunca é apagado: o app só esconde na visualização.

### A pílula 🎯 Hunt diz "sem hunt" mas eu estou caçando?
A pílula lê a janela de hunt do jogo. Se ela mostra "sem hunt", o jogo não está mostrando a janela de hunt daquele painel (hunt terminou, mudou de mapa ou a janela está fechada no jogo). Ajuste a janela de hunt no jogo que a pílula acompanha na sequência.

## Projeto

### Como contribuo?
Faça um fork, rode `npm test` e abra um pull request. A `main` é protegida, tudo entra por PR.
