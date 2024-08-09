const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Vehicle', VehicleSchema);
