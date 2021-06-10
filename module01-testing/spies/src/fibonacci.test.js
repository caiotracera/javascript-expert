const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

const Fibonacci = require("./fibonacci");

/**
 * Fibonacci: o próximo valor corresponde à soma dos dois anteriores.
 * Ou seja, dado o numero 3, o resultado será 0,1,1.
 * Dado o numero 5, o resultado será 0,1,1,2,3
 */
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    /**
     * Os generatores retornam iterators (funções que possuem o .next)
     * existem 3 formas de ler os dados:
     *
     * 1. usar as funções .next
     * 2. for/await
     * 3. rest/spread
     */
    for await (const i of fibonacci.execute(3)) {
    }

    /**
     * Nosso algoritmo vai sempre começar do 0, então a quantidade de chamadas
     * esperadas será sempre N+1, sendo N o valor informado na função.
     */
    const expectedCallCount = 4;
    deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    /**
     * [0] input = 5; current = 0; next = 1
     * [1] input = 4; current = 1; next = 1
     * [2] input = 3; current = 1; next = 2
     * [3] input = 2; current = 2; next = 3
     * [4] input = 1; current = 3; next = 5
     * [5] input = 0; -> Para a execução, seguindo a regra de negócio.
     */

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResult);
  }
})();
