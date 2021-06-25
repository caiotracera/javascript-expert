"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    // console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });

const file = new File();
/**
 * Dessa forma ele ignore o 'this' da class File,
 * e herda o 'this' do watch!
 */
// watch(__filename, file.watch);

/**
 * Para nao herdar o this do watch, uma alternativa é usar arrow function.
 * Mas não é legal usar assim, por questões de arquitetura.
 *
 * A melhor forma de fazer isso é deixar explicito qual é o contexto que a função deve seguir
 */
// watch(__filename, (event, filename) => file.watch(event, filename));

watch(__filename, file.watch.bind(file));

file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("call: hey sinon!") }, [
  null,
  __filename,
]);
