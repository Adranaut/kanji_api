const KanjiHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "kanji",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const kanjiHandler = new KanjiHandler(service, validator);
    server.route(routes(kanjiHandler));
  },
};
