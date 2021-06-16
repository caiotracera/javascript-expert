# Javascript Testing

Testes, em geral, são como um jogo. Você especifica checkpoints e testa suas funções do ponto A para o ponto B.

- Os testes não devem depender de serviços externos nem de internet.

## O que são mocks?

Os mocks servem para que você evite duplicação de testes, criando objetos que partem do principio que o teste A está funcionando, e guardando o resultado deles em um objeto fixo para que você consiga testar o fluxo do ponto B para o ponto C, sem depender do ponto A.

Um _use case_ real é imaginar que você possui um sistema que receve um arquivo csv e transforma em JSON, e precisa validar o conteúdo, verificar se o arquivo está vazio, se está no formato correto e se possui as propriedades desejadas. Para cada um desses casos, é necessário criar um mock para garantir o comportamento esperado, mantendo os testes desacoplados e mais inteligentes.

## O que são stubs?

Supondo que você está desenvolvendo um serviço que faz uma consulta à uma API terceira que cobra por _request_. Se cada vez que exercutarmos os testes, eles fizerem uma ou mais requisições para essa API, a conta ficará cara. Para resolver esse problema, existem os **stubs**. Eles são usados para substituir um comportamento do sistema por objetos estáticos, onde você cria diferentes mocks para cada cenário específico.

Um _use case_ real é imaginar que você precisa fazer uma requisição para uma API de CEP, e o sistema possui diversas regras de negócio que dependem das respostas dessa API. No entanto, numa sexta-feira, a API de CEP sai do ar e, por conta disso, nenhum dos testes estão passando.

Os stubs substituem o comportamento da função, dizendo que, quando a função que acessa a API de CEP for acessada, ela retornará um resultado pré-definido.

## O que são spies?

AInda no ambiente de trabalho, depois de todos os testes, é feito um deploy para produção e o sistema começa a se comportar de forma inapropriada. Após investigar, você percebe que o sistema em looping infinito e batendo na API do cliente. Para evitar esse tipo de problema, devemos usar os **spies**.

Eles observam as funções e validam a quantidade de vezes que foram chamadas, com quais paramêtros e quais resultados elas retornaram.

## O que são testes end-to-end (e2e)?

Pode ser que, no dia-a-dia, não seja possível priorizar o refatoramento de todo o sistema para garantir que todas as funções individuais estejam testadas. Entretanto, talvez seja necessário garantir que o sistema está funcionando à nível de funcionalidades completas ou a nível de rotas da API. Para isso servem os testes **end-to-end**: testar o funcionamento da sua função do ponto de vista do usuário. Dessa forma, supondo que você queira testar o processo de login, você cria um teste que chama o endpoint de login e espera que ele retorne o token do cliente.

Os testes end-to-end são a melhor forma de garantir, em um sistema que não tem uma cobertura efetiva de testes, que tudo continue funcionando depois de alguma alteração.

## Como pensar sobre os testes?

### Test-Driven Development (TDD)

O TDD prega que devemos seguir um ciclo de processos, primeiro escrevendo um teste que falha, em seguida adicionamos a implementação no código para que o teste passe, depois refatoramos o código e o fluxo se repete até que as funções fiquem atômicas com a menor interdependência possível. A ideia é que a gente deve pensar e planejar o que será codificado e criar os testes antes de codificar de fato.

### Behaviour-Driven Development (BDD)

É um conjunto de práticas que, na teoria, deveria ser usado junto com o TDD na criação de testes unitários. Tem uma relação mais próxima com a área de negócios, e diz o que você precisa testar de forma mais detalhada com o uso da linguagem obliquoa, onde os analistas escrevem as regras do ponto de vista de negócios/não tecnico. Algo como: _Como usuário do sistema, eu quero saber o resultado da multiplicação de dois valores. Quando inserir dois valores, sendo 2 e 5, então o sistema deve retornar 10 e imprimir na tela_.

A específicação, no geral, é focada na linguagem de negócio e funcionalidades, ao invés de falar como deve funcionar. No exemplo acima, o que sabemos é que entram dois valores e sai um valor, mas não diz nada sobre como multiplicar/calcular os valores.
