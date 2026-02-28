class KanjiHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postKanjiHandler = this.postKanjiHandler.bind(this);
    this.getKanjiHandler = this.getKanjiHandler.bind(this);
    this.getKanjiByIdHandler = this.getKanjiByIdHandler.bind(this);
    this.putKanjiByIdHandler = this.putKanjiByIdHandler.bind(this);
    this.deleteKanjiByIdHandler = this.deleteKanjiByIdHandler.bind(this);
    this.getTenKanjiRandomHandler = this.getTenKanjiRandomHandler.bind(this);
  }

  async postKanjiHandler(request, h) {
    this._validator.validateKanjiPayload(request.payload);
    const {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    } = request.payload;

    const kanjiId = await this._service.addKanji({
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    });

    const response = h.response({
      status: "success",
      message: "Soal kuis kanji berhasil ditambahkan",
      data: {
        kanjiId,
      },
    });
    response.code(201);
    return response;
  }

  async getKanjiHandler() {
    const kanji = await this._service.getKanji();
    return {
      status: "success",
      data: {
        kanji,
      },
    };
  }

  async getKanjiByIdHandler(request, h) {
    const { id } = request.params;
    const kanji = await this._service.getKanjiById(id);
    return {
      status: "success",
      data: {
        kanji,
      },
    };
  }

  async putKanjiByIdHandler(request, h) {
    this._validator.validateKanjiPayload(request.payload);
    const {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    } = request.payload;
    const { id } = request.params;

    await this._service.editKanjiById(id, {
      question,
      imgUrl,
      correctAnswer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
    });

    return {
      status: "success",
      message: "Soal kuis kanji berhasil diperbarui",
    };
  }

  async deleteKanjiByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteKanjiById(id);

    return {
      status: "success",
      message: "Soal kuis kanji berhasil dihapus",
    };
  }

  async getTenKanjiRandomHandler() {
    const kanji = await this._service.getTenKanjiRandom();
    return {
      status: "success",
      data: {
        kanji,
      },
    };
  }
}

module.exports = KanjiHandler;
