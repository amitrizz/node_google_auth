import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
    vendor_name: String,
    acc_no: Number,
    bank_name: String,
    address_1: String,
    address_2: String,
    city: String,
    country: String,
    zipcode: Number,
});

// Create the model
const DataModel = mongoose.model("vendor", dataSchema);

export default DataModel;
