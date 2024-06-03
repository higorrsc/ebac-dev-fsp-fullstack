# Rede Social - Social H

Rede social criada como projeto final para o curso "Profissão: Desenvolvedor Full Stack Python v2" da EBAC - Escola Britânica de Artes Criativas & Tecnologia

## Instalação - Back-end

### Altere para a branch _backend_ e execute os comandos

```bash
  python -m pip install poetry
  poetry install
```

### Execute os comandos de inicialização do Django

```bash
  poetry run python manage.py migrate
  poetry run python manage.py createsuperuser
  poetry run python manage.py runserver
```

## Documentação da API

### Endpoint: users

#### Retorna todos os usuários

```http
  GET /api/users
```

#### Retorna um usuário específico

```http
  GET /api/users/${id}
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do usuário que você quer |

#### Cria um usuário

```http
  POST /api/users/
```

| Parâmetro  | Tipo     | Descrição                            |
| :--------- | :------- | :----------------------------------- |
| `username` | `string` | **Obrigatório**. ID do usuário       |
| `email`    | `string` | **Obrigatório**. O e-mail do usuário |
| `password` | `string` | **Obrigatório**. A senha do usuário  |

### Endpoint: profiles

#### Retorna todos os perfis os usuários

```http
  GET /api/profiles
```

#### Retorna um perfil específico

```http
  GET /api/profiles/${id}
```

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do usuário que você quer |

#### Cria o perfil do usuário logado

```http
  POST /api/profiles/
```

| Parâmetro       | Tipo     | Descrição                                                                   |
| :-------------- | :------- | :-------------------------------------------------------------------------- |
| `first_name`    | `string` | Primeiro nome do usuário                                                    |
| `last_name`     | `string` | Último nome do usuário                                                      |
| `gender`        | `string` | **Obrigatório**. Opções válidas: male, female, other                        |
| `dob`           | `date`   | Data de nascimento                                                          |
| `phone`         | `string` | Telefone de contato                                                         |
| `works_at`      | `string` | Endereço de trabalho                                                        |
| `lives_in`      | `string` | Endereço residencial                                                        |
| `studies_at`    | `string` | Endereço da escola                                                          |
| `profile_image` | `image`  | Imagem a ser usada no perfil, selecionada a partir do computador do usuário |

#### Altera o perfil do usuário logado

```http
  PUT /api/profiles/${id}
```

| Parâmetro | Tipo     | Descrição                                                                                 |
| :-------- | :------- | :---------------------------------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do perfil que você quer alterar (não necessariamente o ID do usuário) |

Dados a serem alterados
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :------------------------------------------ |
| `gender` | `string` | **Obrigatório**. Opções válidas: male, female, other |
| `dob` | `date` | Data de nascimento |
| `phone` | `string` | Telefone de contato|
| `works_at` | `string` | Endereço de trabalho |
| `lives_in` | `string` | Endereço residencial |
| `studies_at` | `string` | Endereço da escola|
| `profile_image` | `image` | Imagem a ser usada no perfil, selecionada a partir do computador do usuário|

#### Exclui o perfil do usuário logado

```http
  DELETE /api/profiles/${id}
```

| Parâmetro | Tipo     | Descrição                                                                                 |
| :-------- | :------- | :---------------------------------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do perfil que você quer excluir (não necessariamente o ID do usuário) |

### Endpoint: posts

#### Retorna todas as postagens feitas

```http
  GET /api/posts
```

#### Retorna uma postagem específica

```http
  GET /api/posts/${id}
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da postagem |

#### Cria um post

```http
  POST /api/posts/
```

| Parâmetro    | Tipo     | Descrição                                                             |
| :----------- | :------- | :-------------------------------------------------------------------- |
| `content`    | `string` | **Obrigatório**. Conteúdo da postagem                                 |
| `post_image` | `image`  | Imagem a ser publicada, selecionada a partir do computador do usuário |
| `category`   | `string` | Identificadores da postagem (hashtags)                                |

#### Altera uma postagem do usuário logado

```http
  PUT /api/posts/${id}
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da postagem |

Dados a serem alterados
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :------------------------------------------ |
| `content` | `string` | **Obrigatório**. Conteúdo da postagem |
| `post_image` | `image` | Imagem a ser publicada, selecionada a partir do computador do usuário |
| `category` | `string` | Identificadores da postagem (hashtags) |

#### Exclui uma postagem do usuário logado

```http
  DELETE /api/posts/${id}
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da postagem |

### Endpoint: comments

#### Retorna todos os comentários

```http
  GET /api/comments
```

#### Retorna um comentário específico

```http
  GET /api/comments/${id}
```

| Parâmetro | Tipo     | Descrição                         |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do comentário |

#### Cria um comentário

```http
  POST /api/comments/
```

| Parâmetro       | Tipo     | Descrição                                                             |
| :-------------- | :------- | :-------------------------------------------------------------------- |
| `comment`       | `string` | **Obrigatório**. Conteúdo do comentário                               |
| `comment_image` | `image`  | Imagem a ser publicada, selecionada a partir do computador do usuário |
| `post`          | `string` | **Obrigatório**. ID do post a ser comentado                           |

#### Altera um comentário do usuário logado

```http
  PUT /api/comments/${id}
```

| Parâmetro | Tipo     | Descrição                         |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do comentário |

Dados a serem alterados
| Parâmetro | Tipo | Descrição |
| :---------- | :--------- | :------------------------------------------ |
| `comment` | `string` | **Obrigatório**. Conteúdo do comentário |
| `comment_image` | `image` | Imagem a ser publicada, selecionada a partir do computador do usuário |
| `post` | `string` | **Obrigatório**. ID do post a ser comentado |

#### Exclui um comentário do usuário logado

```http
  DELETE /api/comments/${id}
```

| Parâmetro | Tipo     | Descrição                         |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Obrigatório**. ID da comentário |

### Endpoint: votes

#### Retorna todos os likes/dislikes

```http
  GET /api/votes
```

#### Retorna um voto específico (like/dislike)

```http
  GET /api/votes/${id}
```

| Parâmetro | Tipo     | Descrição                   |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Obrigatório**. ID do voto |

#### Cria um comentário

```http
  POST /api/votes/
```

| Parâmetro | Tipo      | Descrição                                                |
| :-------- | :-------- | :------------------------------------------------------- |
| `post`    | `string`  | **Obrigatório**. ID do post a ser votado                 |
| `up_vote` | `boolean` | **Obrigatório**. True para _like_ e False para _dislike_ |

#### Exclui um comentário do usuário logado

```http
  DELETE /api/votes/${id}
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. ID do like/dislike |
