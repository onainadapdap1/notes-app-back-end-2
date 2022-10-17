/*
    *Berkas NotesService.js bertanggung jawab untuk mengelola resource notes yang disimpan pada memory (array). 
    *Pengelolaan resource bisa seperti menyimpan, membaca, mengubah, dan menghapus catatan
*/ 
/*
    *1. buat kelas NotesService yang memiliki properti this._notes 
*/ 
const {nanoid} = require('nanoid');

class NotesService {
    constructor() {
        this._notes = [];
    }

    /*1.1 memasukkan catatan pada array*/ 
    addNote({title, body, tags}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        // mengisi atribut kedalam sebuah objek
        const newNote = {
            title, tags, body, id, createdAt, updatedAt
        };
        // menambahkan objek newNote ke dalam array
        this._notes.push(newNote);
        // mengecek apakah objek newNote masuk ke dalam array dengan method filter, return array element
        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
        // jika isSuccess false, bangkitkan error, jika tidak return id
        if(!isSuccess) {
            throw new Error("Catatan gagal ditambahkan");
        }
        console.log("value id", id);
        return id;
    }
    /*1.2 membaca seluruh note*/ 
    getNotes() {
        return this._notes;
    }
    /*1.3 membaca note by id*/ 
    getNoteById(id) {
        // mendapatkan note berdasarkan id
        const note = this._notes.filter((n) => n.id === id)[0] ;
        // jika tidak dapat, bangkitkan error, jika tidak kembalikan objek note
        if(!note) {
            throw new Error("Catatan tidak ditemukan");
        }
        return note;
    }
    /*1.4 mengubah data catatan yang disimpan, param = id dan request payload yang akan diambil sebagian field*/ 
    editNoteById(id, {title, body, tags}) {
        // mendapatkan index array pada catatan sesuai id yg ditentukan
        const index = this._notes.findIndex((note) => note.id === id);
        // jika index array berdasarkan id tidak ditemukan, bangkitkan error
        if (index === -1) {
            throw new Error("Gagal memperbarui catatan. Id tidak ditemukan")
        }
        // jika index berdasarkan id ditemukan, maka
        // ubah field updatedAt
        const updatedAt = new Date().toISOString();
        this._notes[index] = {
            ...this._notes[index],
            title, 
            tags, 
            body, 
            updatedAt,
        };
    }
    /*1.5 menghapus data catatan yang disimpan, berdasarkan id*/ 
    deleteNoteById({id}) {
        // mendapatkan index array pada catatan sesuai id yang ditentukan
        const index = this._notes.findIndex((note) => note.id === id);
        // jika index array by id tidak ditemukan bangkitkan error
        if (index === -1) {
            throw new Error("Catatan gagal dihapus. Id tidak ditemukan");
        }
        // jika index ditemukan by id, hapus note by id tersebut
        this._notes.splice(index, 1);
    }
}

// export modul NoteService
module.exports = NotesService