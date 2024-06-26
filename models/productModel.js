const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Please tell us your desc'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please tell us your price'],
      trim: true,
    },
    priceSale: {
      type: Number,
      required: [true, 'Please tell us your priceSale'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Please tell us your sku'],
    },
    soldQuality: {
      type: Number,
      required: [true, 'Please tell us your soldQuality'],
      trim: true,
      default: 0,
    },
    origin: {
      type: String,
      required: [true, 'Please tell us your origin'],
      trim: true,
    },
    style: {
      type: String,
      required: [true, 'Please tell us your style'],
      trim: true,
    },
    material: {
      type: String,
      required: [true, 'Please tell us your material'],
      trim: true,
    },
    idSupplier: {
      type: mongoose.Schema.ObjectId,
      ref: 'Supplier',
    },
    inventoryType: {
      type: String,
      default: 'còn hàng',
    },
    status: {
      type: String,
      default: 'mới',
    },
    idCate: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    idBrand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    idObjectUse: {
      type: mongoose.Schema.ObjectId,
      ref: 'ObjectUse',
    },
    urlImage :{
      type: String,
    },
    // idProductImages: [
    //   'https://cdn.tgdd.vn/Products/Images/9980/295241/giay-lifestyle-nam-nike-air-max-97-dm0027-001-1.jpg',
    //   'https://cdn.tgdd.vn/Products/Images/9980/295241/giay-lifestyle-nam-nike-air-max-97-dm0027-001-2.jpg',
    //   'https://cdn.tgdd.vn/Products/Images/9980/295241/giay-lifestyle-nam-nike-air-max-97-dm0027-001-3.jpg',
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'idBrand',
  })
    .populate({
      path: 'idObjectUse',
    })
    .populate({
      path: 'idCate',
    })
    .populate({
      path: 'idProductImages',
    })
    .populate({
      path: 'idSupplier',
    });

  next();
});

productSchema.virtual('productDetail', {
  ref: 'ProductDetail',
  foreignField: 'idProduct',
  localField: '_id',
});

productSchema.virtual('productImages', {
  ref: 'ProductImages',
  foreignField: 'idProduct',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
