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

## Call Stack e Memory Heap

Javascript é muito semelhante a outras linguagens quando falamos sobre mecanismos para saber a sequência de eventos em um programa e principalmente mecanismos eficientes para guardar dados em memórias.

O **Call Stack** nada mais é do que uma pilha de operações onde é armazenada a sequência de ações que um programa vai executar linha por linha. Dessa forma, um callback chama outro callback, que chama outro callback, que chama outro callback, e assim sucessivamente, de forma ordenada. É usado para guardar as informações futuras de execução do nosso programa seguindo a estrutura de dados Pilha, com o padrão FIFO (_First In, First Out_). Assim ele adiciona a chamada da função no topo da pilha, a executa e então a remove logo após a execução.

Como as chamados do Javascript acontecem de forma assíncrona, ela usa o call stack para entender como executar essa quantidade de instruções de forma ordenada. De forma simplicada, podemos comparar a uma tabela, onde a chave é o endereço em meória e o valor pode ser um tipo primitivo de dado ou um apontamento para outro endereço na memória. Além disso, é o lugar onde todos os valores de tipo primitivo (string, big int, boolean, undefined e single) são armazenados.

No entanto, como só podemos armazenar tipos primitivos na call stack, para executarmos funções e manipular variáveis e arrays que podem crescer dinamicamente, usamos a **Memory Heap**, ou a pilha de memória. Lá ficam armazenados os endereços de memória que podem ser apontados pelo call stack para trabalhar o valor de funções, variáveis, objectos, arrays e etc.

A principal diferença entre um e outro é que o call stack guarda dados de tipos de valor primitivos, enquanto o memory heap guarda dados de tipos de referência que podem crescer dinamicamente, como funções, arrays e outros.
