const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 


// melakukan prediksi klasifikasi menggunakan model dan gambar yang di inputkan
async function predictClassification(model, image) {

    // implementasi custom eror 
    try {
    // mengubah gambar menjadi tensor
    const tensor = tf.node //menangani inference di node.js
        .decodeJpeg(image) //decode image
        .resizeNearestNeighbor([224, 224]) //resize image
        .expandDims() //menambah dimensi
        .toFloat() //mengubah data yang dihasilkan menjadi float


    // melakukan prediksi menggunakan model
    const prediction = model.predict(tensor);
    // mengambil skor hasil prediksi
    const score = await prediction.dataSync(); //mendapatkan hasil prediksi
    const confidenceScore = Math.max(...score) * 100; //konversi ke persen

    // labeling dan harus urut sesuai dengan model
    const classes = ['Cancer', 'No Cancer'];

    let label;
    let suggestion;


    // jika nilai terbesar di atas 50%, maka hasilnya adalah cancer
    if (confidenceScore > 50) {
        label = classes[0]; // 'Cancer'
        suggestion = "Segere periksa ke dokter !";
    } else {
        label = classes[1]; // 'No Cancer'
        suggestion = "Anda tidak perlu khawatir, namun tetap periksa ke dokter untuk memastikan";
    }

    
    return {
        label,
        suggestion
    };

    
    }catch(error){
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
 


}

module.exports = predictClassification;