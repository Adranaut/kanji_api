const routes = (handler) => [
  {
    method: "POST",
    path: "/kanji",
    handler: handler.postKanjiHandler,
  },
  {
    method: "GET",
    path: "/kanji",
    handler: handler.getKanjiHandler,
  },
  {
    method: "GET",
    path: "/kanji/{id}",
    handler: handler.getKanjiByIdHandler,
  },
  {
    method: "PUT",
    path: "/kanji/{id}",
    handler: handler.putKanjiByIdHandler,
  },
  {
    method: "DELETE",
    path: "/kanji/{id}",
    handler: handler.deleteKanjiByIdHandler,
  },
  {
    method: "GET",
    path: "/kanji/random",
    handler: handler.getTenKanjiRandomHandler,
  },
];

module.exports = routes;
