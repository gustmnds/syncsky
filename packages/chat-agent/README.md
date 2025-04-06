# @syncsky/chat-agent
Um agente que roda em segundo plano para capturar as mensagens das plataformas de streaming e enviar para os serviços conectados

## Gerenciamento de estado
Quando nenhum serviço esta conectado ao agente o mesmo para de buscar por novas mensagens para poupar recursos, mas assim que recebe alguma conexão o mesmo volta a capturar mensagens normalmente
