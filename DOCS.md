# Documentação da API

Essa documentação segue o seguinte padrão:

- ### `%rota%`

``{ body da request }``

**`status_code`** : _mensagem/mensagens_

*Nota: status_code 500 é padrão de toda response com a mensagem "erro interno"*

## Rotas

- ### POST `/users/login`

``{ username: $username, password: $password }``

**`200`** : _`{ token: $token }`_

**`400`** : _body incompleto || nome de usuário inválido || usuário não existe_

**`401`** : _senha inválida_

- ### POST `/users/register`

``{ username: $username, password: $password }``

**`201`** : _`{ token: $token }`_

**`400`** : _body incompleto || nome de usuário inválido || usuário já existente_

- ### POST `/users/change-password`

``{ username: $username, password: $password, newPassword: $newPassword, token: $token }``

**`200`** : _senha alterada_

**`400`** : _body incompleto_

**`401`** : _senha inválida_

**`403`** : _acesso bloqueado_

- ### POST `/users/logout`

``{ token: $token }``

**`200`** : _token invalidado_

**`400`** : _body incompleto_

- ### POST `/users/validate-token`

``{ token: $token }``

**`200`** : _token válido_

**`400`** : _body incompleto_

**`404`** : _token inválido_

- ### GET `/users/<username>`

``sem body``

**`200`** : _-1 (user não encontrado) || 0 (usuário sem curso) || 1 (usuário com curso) || 2 (staffer) || 3 (administrador)_

- ### POST `/users/delete-account`

``{ username: $username, password: $password, token: $token }``

**`200`** : _usuário deletado_

**`401`** : _usuário inexistente || senha inválida_

**`400`** : _body incompleto_

- ### PATCH `/users/<username>`

``{ auth: $admin_key,  userLevel: $userLevel }``

**`200`** : _`{ $userJSON }`_

**`400`** : _body incompleto_