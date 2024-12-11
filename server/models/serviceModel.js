const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    photo: {
      type: String,
      required: [true, "Photo is required"],
      trim: true,
    },

    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },

    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
    },

    details: {
      type: String,
      required: [true, "details is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre("save", function (next) {
  if (this.icon) {
    this.icon = this.icon.replace(/class=/g, "className=");
  }
  next();
});

const Service = model("Service", serviceSchema);

module.exports = Service;
