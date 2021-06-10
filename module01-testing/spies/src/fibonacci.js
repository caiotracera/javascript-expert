class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }

    /**
     * A palavra-chave yield serve para retornar valores sobre demanda quando necessário.
     * Quando ela é seguida de um *, como em "yield*", significa que, ao invés de retornar o valor,
     * ela vai chamar a função de forma recursiva, mas sem retornar o valor.
     */
    yield current;
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
