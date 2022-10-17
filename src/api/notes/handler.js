/*
    *1.untuk mengelola data crud tidak lagi digunakan di handler , karena sudah membuat NotesService
    *2. fungsi handler cukup memanggil fungsi public dari NotesService melalui this._service
*/
/*
    *1. create class NotesHandler dengan parameter constructor service
    *2. parameter service akan diberikan nilai instance dari NotesService
    *3. dengan begitu NotesHandler memiliki akses untuk mengelola resource notes melalui properti this._service
*/
class NotesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }
    // fungsi untuk handle response create note
    postNoteHandler(request, h) {
        try {
            // mengakses fungsi validateNotePayload dengan this._validator
            this._validator.validateNotePayload(request.payload);
            // 1.2 menangkap data dari client
            const { title = 'untitled', tags, body } = request.payload;
            // 1.2 proses insert note, panggil fungsi dari NotesService, fungsi ini mengembalikan id
            const noteId = this._service.addNote({ title, tags, body });
            console.log("value of note id", noteId)
            // 1.2 kembalikan fungsi handler dengan response 201
            const response = h.response({
                status: "success",
                message: "Catatan berhasil ditambahkan",
                data: {
                    noteId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    // fungsi untuk handle response get all notes
    getNotesHandler() {
        const notes = this._service.getNotes();
        return {
            status: "success",
            data: {
                notes,
            },
        };
    }
    // fungsi untuk handle response getNoteByIdHandler
    getNoteByIdHandler(request, h) {
        try {
          const { id } = request.params;
          const note = this._service.getNoteById(id);
          return {
            status: 'success',
            data: {
              note,
            },
          };
        } catch (error) {
          const response = h.response({
            status: 'fail',
            message: error.message,
          });
          response.code(404);
          return response;
        }
      }

    // fungsi untuk handle response editNoteById
    putNoteByIdHandler(request, h) {
        // 1.2 mendapatkan id note yang dikirim
        try {
            this._validator.validateNotePayload(request.payload);
            const { id } = request.params;
            // memanggil fungsi editNoteById, dengan mengirim param id dan request payload
            this._service.editNoteById(id, request.payload);
            return {
                status: "success",
                message: "Catatan berhasil diperbaharui",
            };
        } catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    // fungsi untuk handle response deleteNoteById
    deleteNoteByIdHandler(request, h) {
        // 1.2 mendapatkan id note yang dikirim
        try {
            const { id } = request.params;
            // 1.2 memanggil fungsi deleteNoteByIdHandler
            this._service.deleteNoteById({ id });

            return {
                status: "success",
                message: "Catatan berhasil dihapus",
            }
        } catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }
}

// export module
module.exports = NotesHandler;