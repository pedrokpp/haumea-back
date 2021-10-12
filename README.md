# Haumea API
Esse README contém os endpoints e funcionará como TODO list para o backend.

## Endpoints
Cada endpoint tem uma marcação indicando se já foi concluído ou não

- [ ] ``/login`` **POST**

Responsável por confirmar logins.

```json
// caso as credenciais estejam corretas (conversar sobre cookies)
{
    "error": null,
    "username": $username,
    "userLevel": $level,
    "session-token": $token
}

// caso as credenciais estejam incorretas
{
    "error": "invalid credentials"
}
```

- [ ] ``/register`` **POST**

Responsável por registrar usuários.

```json
// caso a request dê certo (conversar sobre cookies)
{
    "error": null,
    "session-token": $token
}

// caso o usuário já exista
{
    "error": "usuário já existente"
}

// caso o usuário não passe dos checks de username
{
    "error": "usuário inválido"
}
```
- [ ] ``/fetch-aulas`` **GET**

Responsável por dar fetch nas aulas disponíveis

_Conversar sobre apenas mostrar as aulas proporcionalmente à porcentagem de conclusão do curso_

_response não definida ainda_

## User Level
- ### 0

Usuário comum, ainda não tem o curso

- ### 1

Usuário VIP, que já comprou o curso

- ### 2

Usuário Staffer

- ### 3

Usuário Administrador