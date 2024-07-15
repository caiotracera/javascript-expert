const { readFile } = require('fs/promises');

const { error } = require('./constants');

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf-8');

    const validation = this.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    return this.parseCSVToJSON(content);
  }

  static isValid(content, options = DEFAULT_OPTION) {
    const [header, ...lines] = content.split(/\r?\n/);
    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: error.FILE_INVALID_HEADERS_ERROR_MESSAGE,
        valid: false,
      };
    }

    if (!lines.length || lines.length > options.maxLines) {
      return {
        error: error.FILE_INVALID_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(content) {
    const lines = content.split(/\r?\n/);
    const firstLine = lines.shift();

    const header = firstLine.split(',');

    const users = lines.map((line) => {
      const columns = line.split(',');
      const user = {};

      for (const index in columns) {
        user[header[index]] = columns[index].trim();
      }

      return user;
    });

    return users;
  }
}

module.exports = File;
