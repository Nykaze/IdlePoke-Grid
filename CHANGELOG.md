# Changelog

## 1.1.0

Esconder elementos do jogo e pílula de hunt.

- **👁 Esconder**: caixas no menu para esconder do jogo (vale para todas as contas): todas as janelas do jogo, chat, janela de hunt, menu de ícones e combat. O escondido volta na hora ao desmarcar.
- **🎯 Hunt**: pílula por cima de cada painel com o que a conta está farmando e há quanto tempo, atualizada sozinha (mostra "sem hunt" quando não está caçando).
- Esconder usa `visibility`/`opacity` (nunca `display:none`), então o jogo segue calculando a própria tela normalmente; a reaplicação em troca de tela é feita por um observer leve dentro do próprio painel.

## 1.0.0

Versão inicial pública. Reescrita completa, sem código herdado.

- **Grade de 1 a 4 contas** em uma janela, cada painel com sessão própria (`persist:conta1` a `conta4`).
- **Login automático**: salve o login uma vez em "Treinadores" e o app entra sozinho — inclusive quando a sessão cai no meio do farm.
- **Reordenar painéis por arrastar**: segure o cabeçalho de um painel e solte sobre outro; a ordem fica salva.
- **5 temas de cor** (violeta, azul, verde, rosa, âmbar) no menu Opções, com a cor aplicada a botões, destaques e brilho de fundo.
- **Distintivo na bandeja**: círculo vermelho com o número de contas fora do ar, atualizado na hora.
- **Modo Eco** que segura o uso de CPU; **Alertas** de conta caída; **Som** mudo geral.
- **Painéis independentes**: liga/desliga (teclas 1–4), expandir (Ctrl+1–4 ou ⛶), zoom por painel, renomear com dois cliques e recarregar individual.
- **Arranjos**: grade, uma coluna e uma linha; **proporção original** sem esticar a imagem.
- **Bandeja**, minimizar para a bandeja, **abrir com o Windows**, **exportar/importar configurações** e **backup automático semanal**.
- **Idioma**: português, inglês e espanhol na interface.
- **Segurança**: senhas criptografadas pelo `safeStorage` do sistema, painéis presos ao domínio do jogo, interface sem rede própria (CSP), captcha sempre resolvido pelo usuário.
- **Teste de inicialização**: `npm test` simula o Electron recusando canal de IPC duplicado e confere que o app sempre abre.
