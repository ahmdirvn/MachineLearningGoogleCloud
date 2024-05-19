const tf = require('@tensorflow/tfjs-node');



// menggunkaan loadGraphModel untuk memuat model yang sudah di training, karena model menggunakan saveModel
// atau bisa juga menggunakan loadLayersModel
// mengambil lokasi model dari environment variable MODEL_URL

async function loadModel() {
    return tf.loadGraphModel(process.env.MODEL_URL);

}

module.exports = loadModel;