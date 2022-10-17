/*
    *FUNGSI : . membuat fungsi sebagai validator yang menggunakan schema dari schema.js
*/ 
const {NotePayloadSchema} = require('./schema')
/*
    *1. buat objek dengan nama NotesValidator
*/ 
const NotesValidator = {
    // fungsi ini  untuk melakukan validasi dan mengevaluasi apakah validasi itu berhasil atau tidak
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);
        // jika properti error tidak undefined, maka bangkitkan error
        if(validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    },
};

// export module
module.exports = NotesValidator