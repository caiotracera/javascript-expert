# Javascript Life Cycle

## Strict mode

O Javascript, de modo geral, é conhecido por suas falhas e considerado uma linguagem inconfiável. Isso se dá pelo fato de ser possível cancatenar objetos, somar strings com classes, alterar comportamentos de funções core da linguagem e por aí vai ([WTF Javascript?](https://wtfjs.com/)).

No entanto, é valido lembrar que o Javascript atual não é o mesmo que rodava nos navegadores de antigamente. A linguagem vem evoluindo rapidamente ao longo dos anos e em 2015 uma nova diretiva foi adicionada com uma série de regras com o objetivo de evitar erros semanticos "silenciosos", conhecido como **use strict**.

Adicionando a string `'use strict';` no topo do seu arquivo, o compilador irá fazer uma verificação para encontrar erros no seu código, evitando, por exemplo, que você defina valores para variaveis inexistentes, crie variaveis com palavras chaves reservadas ou até force a remoção de instâncias em memória.

```jsx
'use strict';

/**
* You cannot assign values to not initialized variables
* Error: Uncaught ReferenceError: x is not defined
*/
x = 3.14;
x = { p1: 10, p2: 20 };

/**
* Deleting a function or variable is also not allowed
* Error: Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
*/
const y = 3.14;
function z(p1, p2) {};

delete z;
delete y;

/**
* Duplicating a parameter name is not allowed
* Error: Uncaught SyntaxError: Duplicate parameter name not allowed in this context
*/
function x(p1, p1) {};

/**
* Escape characters are not allowed
* Error: Uncaught TypeError: Cannot assign to read only property 'x' of object '#<Object>'
*/
let obj = {};
Object.defineProperty(obj, "x", {value: 0, writable: false});
obj.x = 3.14;
```

O Javascript é uma linguagem que é convertida para binário no motor do NodeJS e existe um processo de otimização que verifica o código a todo momento, analizando se consegue gerar uma nova classe otimizada, se consegue encurtar caminhos e por aí vai. Quanto mais otimizado for o código, mais rápido e fácil o processo de transpilação para a linguagem intermediária.
