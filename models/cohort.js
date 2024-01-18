const mongoose = require('mongoose')

const cohortSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a cohort name"]
        },
        start_date: {
            type: String,
            required: true,
            default: 0
        },
        end_date: {
            type: String,
            required: true,
        },
        professor_name: {
            type: String,
            required: false,
        },
        
    },
    {
        timestamps: true
    }
)


const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;