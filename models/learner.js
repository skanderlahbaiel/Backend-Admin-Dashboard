const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const learnerSchema = mongoose.Schema(
  {

    id: {
      type: Number, // use ObjectId type
      required: [true, "Please enter learner id"],
      unique: true
    },
    name: {
      type: String,
      required: [true, "Please enter learner name"],
      unique: true
    },

    cohort: {
      type: String,
      required: [true, "Please enter the cohort of the learner"],
    },
    dateOfBirth: {
      type: String,
      required: [false]
    },
    email: {
      type: String,
      required: [true, "Please enter learner email"]
    },
    number: {
      type: Number,
      required: [true, "Please enter learner number"]
    },

    attendance: [{
      date: {
        type: Date,
        required: true
      },
      present: {
        type: Boolean,
        default: false
      }
    }],
    absences: {
      type: Number
    }
  },

  
  {
    timestamps: true
  }

)

const Learner = mongoose.model('Learner', learnerSchema);

module.exports = Learner;