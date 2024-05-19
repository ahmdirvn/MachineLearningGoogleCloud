  const predictClassification = require('../services/inferenceService');
  const crypto = require('crypto');
  const storeData = require('../services/storeData'); 
  const getHistories = require('../services/getHistories'); 


  // membuat fungsi postPredictHandler dengan parameter request dan h untuk menghandle request dan response
  
  async function postPredictHandler(request, h) {


    // mengambil image dari payload dan model dari server.app
    const { image } = request.payload;
    const { model } = request.server.app;

    // menjalankan fungsu predictClassification engan parameter model dan image yang telah dibuat di file inferenceService.js
    const { confidenceScore, label, suggestion } = await predictClassification(model, image);

    // membuat id dan createdAt yang dibutuhkan response  
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();


    // menampung data yang akan disimpan
    const data = {
      "id": id,
      "result": label,
      "suggestion": suggestion,
      "createdAt": createdAt
    }

    

    await storeData(id, data);
  
    const response = h.response({
      status: 'success',
      // mengembalikan success 
      message:  'Model is predicted successfully.',
      data
    })

    // mengembalikan response dengan code 201 jika tidak terjadi eror
    response.code(201);
    return response;
  }


  // membuat handler untuk history prediksi
  async function getHistoriesHandler() {
    const data = await getHistories();
    return {
      status: 'success',
      data
      
    }
  }
  
  module.exports = {postPredictHandler, getHistoriesHandler};