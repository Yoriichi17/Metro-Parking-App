require('dotenv').config();
const Vehicle = require('../models/Vehicle');
const Parking = require('../models/Parking');
const client = require('../config/twilioConfig');


exports.register = async (req, res) => {
  const { vehicleNumber, phoneNumber, pickupTime } = req.body;
  
  try {
    const newVehicle = new Vehicle({ vehicleNumber, phoneNumber });
    await newVehicle.save();

    const newParking = new Parking({
      vehicleNumber,
      pickupTime: new Date(pickupTime),
      cost: 0 
    });
    await newParking.save();

    const convertToLocalTime = (utcDateString) => {
      const date = new Date(utcDateString);
      return date.toLocaleString(); 
    };
    
    const localPickupTime = convertToLocalTime(pickupTime);

    
    await client.messages.create({
      body: `Vehicle Number: ${vehicleNumber}, Drop Time: ${localPickupTime}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.search = async (req, res) => {
  const { vehicleNumber, dropoffTime } = req.body;

  try {
    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const parking = await Parking.findOne({ vehicleNumber });
    if (!parking) {
      return res.status(404).json({ success: false, message: 'Parking record not found' });
    }

    
    if (dropoffTime) {
      const pickupTime = new Date(parking.pickupTime);
      const dropoffDate = new Date(dropoffTime);
      const duration = dropoffDate - pickupTime; 

      const hours = Math.ceil(duration / (1000 * 60 * 60));
      parking.cost = hours * 15; 
      await parking.save();

      res.json({
        success: true,
        vehicle,
        parking,
      });
    } else {
      res.json({
        success: true,
        vehicle,
        parking,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    
    await Vehicle.findOneAndDelete({ vehicleNumber });
    await Parking.findOneAndDelete({ vehicleNumber });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting records' });
  }
};


exports.getPhoneNumber = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    const vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json({ phoneNumber: vehicle.phoneNumber });
  } catch (error) {
    console.error('Error fetching phone number:', error);
    res.status(500).json({ error: 'Failed to fetch phone number', details: error.message });
  }
};
