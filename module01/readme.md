# Javascript Testing

Testes, em geral, são como um jogo. Você especifica checkpoints e testa suas funções do ponto A para o ponto B.

## O que são mocks?

Os mocks servem para que você evite duplicação de testes, criando objetos que partem do principio que o teste A está funcionando, e guardando o resultado deles em um objeto fixo para que você consiga testar o fluxo do ponto B para o ponto C, sem depender do ponto A.

Um _use case_ real é imaginar que você possui um sistema que receve um arquivo csv e transforma em JSON, e precisa validar o conteúdo, verificar se o arquivo está vazio, se está no formato correto e se possui as propriedades desejadas. Para cada um desses casos, é necessário criar um mock para garantir o comportamento esperado, mantendo os testes desacoplados e mais inteligentes.
