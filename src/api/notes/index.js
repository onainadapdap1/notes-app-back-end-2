const NotesHandler = require("./handler");
const routes = require("./routes");


/*
    *"Hapi plugin notes ini akan bertanggung jawab untuk menangani setiap permintaan yang mengarah ke url /notes".
    *1. menggunakan router dan handler pada plugin notes
*/ 
// fungsi register Dua parameter fungsi ini adalah server dan objek options yang menampung service.
notesPlugin = {
    name: 'notes',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        // membuat instance NotesHandler
        const notesHandler = new NotesHandler(service, validator);
        // daftarkan routes yang sudah kita buat di server hapi
        // setelah menetapkan nilai route, gunakan nilainya menggunakan method server.route()
        // panggil fungsi routes dan berikan instance notesHandler sebagai parameternya
        server.route(routes(notesHandler));
    },
};
module.exports = notesPlugin;