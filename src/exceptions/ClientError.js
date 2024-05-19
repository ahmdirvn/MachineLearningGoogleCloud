// menangani eror dari turunan Error
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message); // menggunakan syntax super untuk mengakses properti dari parent class
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
 
module.exports = ClientError;