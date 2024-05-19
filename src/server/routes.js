const {postPredictHandler, getHistoriesHandler} = require('../server/handler');
 
const routes = [
  {
    // menggunakan path /predict dengan method POST
    path: '/predict',
    method: 'POST',
    // memanggil handler postPredictHandler
    handler: postPredictHandler,
    options: {
      payload: {
        allow: ['multipart/form-data','image/png'],
        multipart: true,
        // membatasi ukuran file yang diupload
        maxBytes : 1000 * 1000        
      }
    }
  },
  
  {
    // menggunakan get untuk memperoleh history prediksi
    path:'/predict/histories',
    method : 'GET',
    handler : getHistoriesHandler

  }
]
 
module.exports = routes;