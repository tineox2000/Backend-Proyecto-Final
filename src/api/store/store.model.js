const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: { type: String, required: true},
    category: { type: String, required:true},
    address: { type: String, required: true},
    phone: { type: Number, required: true},
    web: { type: String}, 
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}] 
},{
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;