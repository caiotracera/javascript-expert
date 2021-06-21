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

## Tipo de Valor vs Tipo de Referência (Immutability vs Mutability)

Ao criar duas variáveis diferentes, sendo `counter` e `counter2`, e inicializá-las com o numero 0 e `counter`, respectivamente, qual será o valor de `counter2` se eu fizer um `counter2++`?

```jsx
let counter = 0;
let counter2 = counter;
counter2++;

console.log(counter); // 0
console.log(counter2); // 1
```

Repare que o valor de `counter` é 0, mas o valor de `counter2` é 1. Isso se dá porque, após definir que a variável `counter2` será inicilizada com o valor de `counter`, o Javascript copia o valor do endereço de memória para outro endereço. Dessa forma, o que for feito no `counter` não reflete no `counter2`, e vice-versa.

E se, ao invés de usarmos variáveis do tipo inteiro, usarmos objetos? Criando a variável `item` que recebe o objeto `{ counter: 0 }` e definindo que a variável `item2` receberá a variável `item`, qual será o valor de `item2.counter` após tentarmos incrementá-lo?

```jsx
const item = { counter: 0 };
const item2 = item;

item2.counter++;
console.log(item); // { counter: 1 }
console.log(item2); // { counter: 1 }
```

Com isso, percebemos que os tipos primivos são armazenados de uma forma e os tipos de referência são guardadas de outra forma. Ou seja, repare que quando jogamos uma variável de um lado para o outro, estávamos alterando somente o endereço que, no fim, apontavam para a mesma variável.

**Resumindo**: o tipo primitivo gera uma cópia em memória, e o tipo de referência copia o endereço de memória e aponta para o mesmo lugar.

## Coerção de Tipos & Objects Lifecycle

Coerção de tipos é um conceito bastante utilizado no Javascript para explicar os comportamentos bizarros da linguagem. Em resumo, a coerção de tipos é um processo de conversão de um valor para qualquer outro tipo, como converter uma string para um number.

No Javascript qualquer tipo de dados está sujeito a coerção, só que só existem três tipos de coerção no fim: string, number ou boolean. Existem dois tipos de coerção:

- Implicita: geralmente usada com operadores, quando somamos uma string com um numero, por exemplo. Para evitar problemas, é recomendado substiutir o _Loose Equality Operator_ (`==`) pelo _Strict Equality Operator_ (`===`).
- Explícita: é feita quando o programador expressa a intensão de converter um tipo para o outro através do código certo, como em `Number(value)` ou em `String(123)`.

Quando falamos sobre objetos, a coisa funciona de forma diferente. No Javascript, todo objeto tem alguns métodos por padrão, como `.toString()`, `.isPrototypeOf()`, `.hasOwnProperty()`, `.valueOf()`, entre outros. Na hora de converter o objeto para string, ele vai seguir uma ordem de chamada:

1. Verifica se o tipo já é primitivo. Se for, ele não faz nada e retorna.
2. Chama a função `.toString()` do objeto. Se o resultado desse método for um tipo primitivo ele retorna.
3. Chama o método `.valueOf()`.

Caso nenhum desses retorne um valor primitivo, o Javascript estoura um `type error`. Além disso, é importante saber que a ordem de chamada entre o `.toString()` e o `.valueOf()` podem mudar de acordo com o tipo de conversão. Se for um tipo numérico, primeiro ele chamada o `.valueOf()`.

Junto com o ES6, veio uma teceira opção chamada `Symbol.toPrimitive()`, que tem uma ordem de prioridade maior do que o `.toString()` e o `.valueOf()`, e quando implementado, ele ignora todo o resto.
