# Haumea API
Esse README contém os endpoints e funcionará como TODO list para o backend.

## Endpoints
Cada endpoint tem uma marcação indicando se já foi concluído ou não

- [ ] **POST** ``/users/login``

Responsável por confirmar logins.

### Responses

- **200** _``logado com sucesso``_

Ocorre caso a request seja bem sucedida

- **401** _``senha inválida``_

Ocorre caso a senha enviada falhe na comparação de hash

- **400** _``usuário não existe``_

Ocorre caso o username enviado não exista no banco de dados

- **500** _``erro interno``_

Caso o try/catch da database falhe

---

- [ ] **POST** ``/users/register``

Responsável por registrar usuários.

### Responses

- **201** _``usuário criado``_

Ocorre caso a request seja bem sucedida

- **400** _``username muito grande``_ ou _``username muito pequeno``_

Ocorre caso o username enviado tenha mais de 16 e menos de 3 caracteres

- **400** _``username contém caracteres inválidos``_

Ocorre caso o check da regex ``^[a-zA-Z0-9_]*$`` falhe

- **400** _``usuário já existente``_

Caso o usuário já exista

- **500** _``erro interno``_

Caso o try/catch da database falhe

---

- [ ] **PATCH** ``/:username``

Responsável por dar update no ``userLevel`` de um usuário

### Responses

- **200** _``{ user json }``_

Ocorre quando a request foi bem sucedida

- **401** _``acesso não autorizado``_

Ocorre quando não é passado key como parâmetro "auth" no body ou a key não é igual

- **500** _``erro interno``_

Caso o try/catch da database falhe

---

- [ ] **GET** ``/aulas``

Responsável por dar fetch nas aulas disponíveis

_Conversar sobre apenas mostrar as aulas proporcionalmente à porcentagem de conclusão do curso_

_response não definida ainda_

---

## User Level
- ### 0

Usuário comum, ainda não tem o curso

- ### 1

Usuário VIP, que já comprou o curso

- ### 2

Usuário Staffer

- ### 3

Usuário Administrador
