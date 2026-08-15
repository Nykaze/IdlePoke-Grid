# Como usar o Idle Poke Grid (versão sem instalador)

Guia para quem nunca mexeu com isso. Essa versão roda direto do código. Parece complicado, mas são 4 passos e a parte "difícil" você só faz uma vez.

## Passo 1: instalar o Node.js (só na primeira vez)

O Node.js é o "motor" que faz o app rodar.

1. Entre em **nodejs.org**
2. Baixe o botão verde grande escrito **LTS**
3. Abra o arquivo que baixou e vá clicando em **Avançar / Next** até o **Concluir / Finish**. Não precisa mudar nada, só ir clicando.

Pronto, isso não precisa fazer de novo.

## Passo 2: baixar o Idle Poke Grid

1. Aqui em cima nesta página, clique no botão verde **Code**
2. Clique em **Download ZIP**
3. Vá na sua pasta **Downloads**, clique com o **botão direito** no arquivo `.zip` e escolha **Extrair tudo**. Vai aparecer uma pasta com o mesmo nome.

## Passo 3: instalar as dependências (só na primeira vez)

1. Entre na pasta que apareceu
2. Abra um **terminal** nela: clique na barra de endereço do Explorer, digite `cmd` e aperte Enter
3. Digite `npm install` e aperte Enter. Espere terminar (aparece uma mensagem final sem erro)
4. Feche essa janela preta

## Passo 4: abrir o app

1. Dê **dois cliques** no arquivo **Abrir Idle Poke Grid** (`.vbs`). Ele abre o app **sem janela preta**.

> Se o Windows mostrar uma tela azul ("O Windows protegeu seu computador"), clique em **Mais informações** e depois **Executar assim mesmo**. Isso acontece porque o app não tem assinatura paga, mas o código é aberto e você pode conferir tudo aqui.

**Quer um atalho na área de trabalho?** Clique com o **botão direito** no arquivo **Abrir Idle Poke Grid** e escolha **Enviar para: Área de trabalho (criar atalho)**. Pronto, vira um clique só.

> O `iniciar.bat` continua na pasta e funciona igual, mas ele deixa uma janela preta aberta: se você fechar essa janela, o app fecha junto. Pelo **Abrir Idle Poke Grid** isso não acontece.

**No Mac ou Linux:** abra o Terminal dentro da pasta, rode `npm install` uma vez e depois `bash iniciar.sh`.

## Passo 5: usar

1. Em cada quadradinho, entre na sua conta do Idle Poke (ou crie uma)
2. O **"Confirme que é humano"** é sempre você que resolve. O app nunca faz isso no seu lugar.
3. Clique em **👤 Treinadores**, preencha e-mail/usuário e senha de cada conta e salve. Da próxima vez o app entra sozinho.

## Para atualizar depois

Baixe o ZIP de novo (Passo 2) e substitua a pasta antiga (mantenha o mesmo caminho, pra salvar os painéis). Suas contas continuam salvas.

## Deu algum problema?

- **"Abrir Idle Poke Grid" abre e fecha na hora:** provavelmente o `npm install` do Passo 3 não foi feito ou o Node.js não está instalado. Refaça os Passos 1 e 3.
- **Uma conta não entra sozinha:** abra os **👤 Treinadores** e confira se o e-mail/usuário e a senha daquela conta estão certos.
- **Trava ou fica lento:** ligue o **⚡ Eco** no menu **☰ Opções**, ele segura o uso de CPU.
- **A janela não aparece:** o app pode já estar aberto na bandeja. Procure o ícone perto do relógio do Windows. Se não achar, abra **☰ Opções → 🐞 Erros** pra ver o relatório.
