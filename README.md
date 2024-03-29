# Cowtwin Backend

## Introdução

Esta é a documentação do Cowtwin Backend, que oferece recursos para criar usuários, autenticar usuários, enviar mensagens e obter mensagens.

## URL base

```
https://cowtwin.vercel.app/
```

## Autenticação

A autenticação é necessária para acessar determinados endpoints. A autenticação é feita por meio de um token de sessão, que deve ser enviado nos cookies da solicitação.

## Middlewares

A API utiliza dois middlewares:

- **Autenticação**: Garante que o usuário esteja autenticado para acessar determinados recursos.
- **Validação**: Valida os dados enviados nas solicitações de acordo com os esquemas definidos.

## Endpoints

### Criar Usuário

#### `POST /create-user`

Este endpoint cria um novo usuário.

##### Parâmetros

- `password` (string, obrigatório): A senha do usuário.

##### Resposta

- **200 OK**: Usuário criado com sucesso.
- **400 Bad Request**: Falha na validação dos parâmetros.

##### Exemplo de solicitação

POST /create-user
Content-Type: application/json

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/create-user`

    const data = {
        password: "senha123"
    }

    const response = axios.post(url, data)
})();
```

##### Exemplo de resposta

```json
{
    "id": "94c49e01-27c6-4283-bdd9-ed5b586d2e60",
    "createdAt": 1707489030893,
    "writeResult": {...}
}
```

### Login de Usuário

#### `POST /login-user`

Este endpoint realiza a autenticação do usuário.

##### Parâmetros

- `password` (string, obrigatório): A senha do usuário.

##### Resposta

- **200 OK**: Usuário autenticado com sucesso.
- **401 Unauthorized**: Falha na autenticação.

##### Exemplo de solicitação

POST /login-user
Content-Type: application/json

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/login-user`

    const data = {
        password: "senha123"
    }

    const response = axios.post(url, data)
})();
```

##### Exemplo de resposta

```json
{
    "userId": "9af75d83-90b4-4417-93fc-626cbafa2db3",
    "sessionId": "e80b82ec-ee8b-4507-828d-d4b0d7175e5b",
    "isValidLogin": true
}
```

### Pegar dados de usuário

#### `POST /login-user`

Este endpoint pega dados de um usuário.

##### Parâmetros

- `id` (string, obrigatório): O id do usuário.

##### Resposta

- **200 OK**: Usuário autenticado com sucesso.
- **401 Unauthorized**: Falha na autenticação.

##### Exemplo de solicitação

GET /get-user
Content-Type: application/json

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/get-user`

    const data = {
        sessionId: "37549202-1b28-476c-8f60-3ab4bbce19b0",
        id: "37549202-1b28-476c-8f60-3ab4bbce19b0"
    }

    const response = axios.post(url, data)
})();
```

##### Exemplo de resposta

```json
{
    "id": "37549202-1b28-476c-8f60-3ab4bbce19b0",
    "createdAt": 1707498051492
}
```

### Enviar Mensagem

#### `POST /create-message`

Este endpoint envia uma nova mensagem.

##### Parâmetros

- `sessionId` (string, obrigatório): Id do da sessão do usuário.
- `parentId` (string, optional): A mensagem pai.
- `createdAt` (number, obrigatório): O timestamp da criação da mensagem.
- `content` (string, obrigatório): O conteúdo da mensagem.

##### Resposta

- **200 OK**: Mensagem enviada com sucesso.
- **400 Bad Request**: Falha na validação dos parâmetros.

##### Exemplo de solicitação

POST /create-message
Content-Type: application/json

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/create-message`

    const data = {
        sessionId: "e80b82ec-ee8b-4507-828d-d4b0d7175e5b",
        createdAt: 1707489030893,
        content: "Olá, mundo!",        
    }

    const response = axios.post(url, data)
})();
```

##### Exemplo de resposta

```json
{
    "authorId": "p80bj2ec-ee8b-4507-828d-d4b0d7175e89",
    "createdAt": 1707489030893,
    "content": "Olá, mundo!",
    "writeResult": {...}
}
```

### Obter Mensagens

#### `GET /get-messages`

Este endpoint retorna mensagens com base nos parâmetros fornecidos.

##### Parâmetros

- `sessionId` (string, obrigatório): Id do da sessão do usuário.
- `ids` (array de strings, opcional): IDs das mensagens a serem recuperadas.
- `mode` (string, opcional): Modo de recuperação das mensagens (`first` ou `last`).
- `count` (number, opcional): Número máximo de mensagens a serem retornadas.

##### Resposta

- **200 OK**: Mensagens recuperadas com sucesso.

##### Exemplo de solicitação

GET /get-messages

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/get-messages`

    const data = {
        sessionId: "e80b82ec-ee8b-4507-828d-d4b0d7175e5b",
        ids: [ "d408897a-a166-4e92-b09c-7a1189b775c0", "a408897a-a166-4e92-b09c-7a1189b775c9" ]
    }

    const response = axios.post(url, data)
})();
```

Ou:

```typescript
import axios from "axios"

;(async () => {
    const url = `https://cowtwin.vercel.app/get-messages`

    const data = {
        sessionId: "e80b82ec-ee8b-4507-828d-d4b0d7175e5b",
        mode: "last"
        count: 10,
    }

    const response = axios.post(url, data)
})();
```

##### Exemplo de resposta

```json
[
    {
        "id": "d408897a-a166-4e92-b09c-7a1189b775c9",
        "authorId": "bdea0b5b-fa60-4ab7-baaf-2bdbebf30672",
        "content": "Olá, mundo!",
        "createdAt": 1644410400
    },
    {
        "id": "37feb4bf-acae-42c4-832f-c06c5c865879",
        "authorId": "3ea6e4bc-d635-46a3-9ff2-35fc01e7187e",
        "content": "Olá de volta!",
        "createdAt": 1644410500
    }
]
```

## Erros

A API retorna os seguintes códigos de erro:

- **400 Bad Request**: A solicitação foi malformada ou contém parâmetros inválidos.
- **401 Unauthorized**: Falha na autenticação.
- **403 Forbidden**: O acesso ao recurso é proibido.
- **500 Internal Server Error**: Ocorreu um erro no servidor.