require('dotenv').config();
 
const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');

// memanggil loadModel
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');


// membangun server js 
 
(async () => {
    const server = Hapi.server({
        port: 3000,
        // mendefinisikan host
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });
 
    const model = await loadModel();
    // menyimpan model ke dalam server.app agar tidak harus ke server dan mengurangi waktu load model
    server.app.model = model;
 
    // membuat routes dengan memanggil file routes.js
    server.route(routes);

    // membuat manipulasi response sebelum response dikirimkan menggunakan onPreResponse
    // server.ext digunakan untuk menangani berbagai macam extension, disini kita menggunakan onPreResponse
    // setelah server.route dijalankan makan kode brikut akan menangani response yang akan dikirimkan dan memanipulasi response tersebut
    server.ext('onPreResponse', function (request, h) {
        // mendapatkan response dari request
        const response = request.response;

        // menangani jika terjadi kesalahan input
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi'
            })
            newResponse.code(response.statusCode)
            return newResponse;
        }

        // boom akan menghasilkan true ketika terjadi eror server
        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }

        // mengembalikan response jika tidak terjadi eror sama sekali
        return h.continue;
    });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();