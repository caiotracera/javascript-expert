const assert = require('node:assert');

const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv';
    const expected = new Error(error.FILE_INVALID_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const expected = new Error(error.FILE_INVALID_HEADERS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/five-items-invalid.csv';
    const expected = new Error(error.FILE_INVALID_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/three-items-valid.csv';
    const expected = [
      { id: 1, name: 'John', profession: 'Dentist', age: 30 },
      { id: 2, name: 'Jane', profession: 'Engineer', age: 25 },
      { id: 3, name: 'Jack', profession: 'Teacher', age: 40 },
    ];
    const result = await File.csvToJSON(filePath);

    assert.deepEqual(result, expected);
  }
})();
