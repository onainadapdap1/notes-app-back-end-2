/*
    *FUNGSI : . membuat dan menuliskan objek schema data notes
*/ 
const Joi = require('joi')
/*
    *1. membuat objek schema dengan nama NotePayloadSchema, kemudian
    *, menetapkan spesifikasi schema
*/ 
const NotePayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };
