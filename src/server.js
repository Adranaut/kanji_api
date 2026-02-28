require("dotenv").config();

const Hapi = require("@hapi/hapi");
const kanji = require("./api/kanji");
const KanjiService = require("./services/postgres/KanjiService");
const KanjiValidator = require("./validator/kanji");
const ClientError = require("./exceptions/ClientError");

const init = async () => {
  const kanjiService = new KanjiService();
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: kanji,
      options: {
        service: kanjiService,
        validator: KanjiValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
