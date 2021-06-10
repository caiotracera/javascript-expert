const { readFile } = require("fs/promises");
const { join } = require("path");

const { error } = require("./constants");
const User = require("./user");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);

    const validation = await File.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return File.parseCSVToJSON(content);
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, "..", filePath);
    return (await readFile(fileName)).toString("utf-8");
  }

  static async isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...lines] = csvString.split("\n");

    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      lines.length > 0 && lines.length <= options.maxLines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    const counts = {};
    lines.map((line) => (counts[line] = (counts[line] || 0) + 1));
    if (Object.values(counts).filter((item) => item > 1).length > 0) {
      return {
        error: error.FILE_DUPLICATED_LINES_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split("\n");

    /**
     * Remove o primeiro item do array, que é o header, e joga na variável.
     * Dessa forma, o array lines fica somente com as linhas e sem o header.
     */
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    return lines.map((line) => {
      const columns = line.split(",");
      const user = {};

      for (const index in columns) {
        /**
         * Pego o header que tem o index e atribuo ao valor da coluna que tem o index.
         * Dessa forma, no caso do index = 0, o valor do header no index 0 é o id,
         * e o valor da coluna no index 0 é, por exemplo, 123.
         *
         * Isso será equivalente à:
         * user.id = 123
         */
        user[header[index]] = columns[index];
      }
      return new User(user);
    });
  }
}

module.exports = File;
