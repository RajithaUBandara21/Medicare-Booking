import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"

//create a booking

export const createBooking = async (req, res) => {
    const doctorId = req.params.doctorId;

    const appointmentDate = new Date(req.body.appointmentDate);
    const now = new Date();
    // compare in UTC: appointmentDate parses a date-only string ("YYYY-MM-DD") as UTC
    // midnight, so a local-midnight "today" would misclassify today as past west of UTC.
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    if (isNaN(appointmentDate.getTime()) || appointmentDate < today) {
        return res
            .status(400)
            .json({ success: false, message: "A valid, non-past appointmentDate is required" })
    }

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" })
        }

        if (doctor.ticketPrice == null) {
            return res
                .status(400)
                .json({ success: false, message: "This doctor hasn't set a ticket price yet" })
        }

        const newBooking = new Booking({
            doctor: doctorId,
            user: req.userId,
            ticketPrice: doctor.ticketPrice,
            appointmentDate,
        })

        const savedBooking = await newBooking.save();

        res
            .status(200)
            .json({ success: true, message: "Successfully created a booking", data: savedBooking })

    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message })
    }
}
