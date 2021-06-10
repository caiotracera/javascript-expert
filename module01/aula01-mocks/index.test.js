const { deepStrictEqual, rejects } = require("assert");

const { error } = require("./src/constants");
const File = require("./src/file");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-invalid.csv";
    const rejection = new Error(error.FILE_DUPLICATED_LINES_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Caio Tracera",
        id: 123,
        profession: "Javascript Expert",
        birthday: 1999,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "Javascript Specialist",
        birthday: 1941,
      },
      {
        name: "Joaozinho",
        id: 231,
        profession: "Java Developer",
        birthday: 1991,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
