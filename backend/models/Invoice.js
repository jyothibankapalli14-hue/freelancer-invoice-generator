const mongoose = require("mongoose");

const invoiceSchema =
  new mongoose.Schema({

    client: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

  }, {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    "Invoice",
    invoiceSchema
  );