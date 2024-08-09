const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    ref: 'Vehicle'
  },
  pickupTime: {
    type: Date,
    required: true,
  },
  dropoffTime: {
    type: Date,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Parking', ParkingSchema);
