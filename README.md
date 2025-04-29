# SyncSky

## Descrição Geral

O **SyncSky** é um repositório modular que integra diversas plataformas de chat, APIs e interfaces de usuário. Ele é composto por múltiplos pacotes que trabalham em conjunto para oferecer uma solução robusta e escalável. Abaixo, você encontrará uma descrição detalhada de cada pacote, suas funcionalidades e como eles se integram.

## Extensões

### **7tv-chat-extension**
Este pacote integra o sistema com a plataforma **7TV**, permitindo:
- Exibição e uso de emotes personalizados em chats.
- Gerenciamento de emotes.
- Interação com a API do 7TV para sincronização e atualização de emotes.

### **bttv-chat-extension**
O **bttv-chat-extension** conecta o sistema à plataforma **BetterTTV (BTTV)**, oferecendo:
- Suporte ao uso de emotes personalizados do BTTV.
- Funcionalidades adicionais oferecidas pela API do BTTV.
- Manipulação de eventos relacionados à plataforma.

## Chat

### **chat-agent**
O **chat-agent** é o núcleo de gerenciamento de agentes de chat. Ele é responsável por:
- Autenticação e configuração de conexões.
- Gerenciamento de conexões com diferentes plataformas de chat.
- Otimização de recursos, pausando a captura de mensagens quando não há conexões ativas.

### **chat-api**
O **chat-api** fornece uma interface unificada para interagir com diversas plataformas de chat. Suas funcionalidades incluem:
- Definição de eventos, tipos e classes para manipulação de mensagens e usuários.
- Base para pacotes que implementam funcionalidades específicas de plataformas.

### **chat-overlay**
O **chat-overlay** é um pacote baseado em **React**, **TypeScript** e **Vite**. Ele oferece:
- Interface gráfica para exibição de mensagens de chat em tempo real.
- Criação de sobreposições visuais (overlays) para transmissões ao vivo ou outras aplicações visuais.

### **chat-ui**
O **chat-ui** fornece componentes reutilizáveis de interface de usuário para interação com chats. Ele inclui:
- Elementos visuais como caixas de mensagens, listas de usuários e botões de interação.
- Ferramentas para construção de interfaces personalizadas para diferentes plataformas.

## Módulos

### **twitch-chat-module**
O **twitch-chat-module** integra o sistema com a plataforma **Twitch**, permitindo:
- Interação com o chat da Twitch.
- Gerenciamento de mensagens, eventos e usuários.
- Suporte a APIs específicas da Twitch.

### **youtube-chat-module**
O **youtube-chat-module** conecta o sistema ao chat do **YouTube**, oferecendo:
- Captura de mensagens e eventos pagos (como Super Chats).
- Suporte a interações no chat ao vivo do YouTube.
- Serviços auxiliares para lidar com ativos e eventos específicos da plataforma.

## Extra

### **node-builder**
O **node-builder** é um pacote utilitário que automatiza tarefas de build. Ele é usado para:
- Transpilar código TypeScript em executáveis personalizados.
- Adicionar ícones, informações de versão e outros metadados aos executáveis.
- Gerar arquivos otimizados e preparar pacotes para distribuição.
