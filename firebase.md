# Firebase

## Regras
Para teste é aberta, com leitura e escrita:

````
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
````

### adicionando index:
Adiciona index ao title, para poder filtrar itens por titulo na `"rota"`, `ingredients`

````
{
  "rules": {
    ".read": true,
    ".write": true,
    "ingredients":{
      ".indexOn":["title"]
    }  
  }
}
````