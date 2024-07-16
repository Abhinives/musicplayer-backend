const patient = require("../../../models/login");
const doctor = require("../../../models/doctorRegister");
const slots = require("../../../models/slots");

const slotBooking = async (req, res) => {
  try {
    const patientId = req.params.pid;
    const doctorId = req.params.did;
    const { bookingDate, startTime, endTime } = req.body;
    const isDoctor = await slots.findOne({ doctorId: doctorId });

    if (!isDoctor) {
      const payload = {
        doctorId: doctorId,
        schedule: [
          {
            date: bookingDate,
            slotSchedule: [
              {
                startTime: startTime,
                endTime: endTime,
                patientId: patientId,
              },
            ],
          },
        ],
      };

      const bookSlot = new slots(payload);
      await bookSlot.save();

      return res.status(200).json({ status: "Booked successfully", bookSlot });
    } else {
      let slotExist = false;
      let dateFound = false;

      for (const sched of isDoctor.schedule) {
        const schedDate = new Date(sched.date).toISOString().split("T")[0];
        console.log(schedDate);
        console.log(bookingDate);
        if (schedDate === bookingDate) {
          dateFound = true;
          console.log(dateFound);
          for (const slot of sched.slotSchedule) {
            const slotStartTime = new Date(slot.startTime).toISOString();
            const reqStartTime = new Date(startTime).toISOString();
            if (slotStartTime === reqStartTime) {
              slotExist = true;
              break;
            }
          }
          break;
        }
      }
      console.log(slotExist);

      if (slotExist) {
        return res.status(500).json({ status: "Slot not available" });
      } else {
        if (dateFound) {
          const updateSchedule = await slots.updateOne(
            { doctorId: doctorId, "schedule.date": bookingDate },
            {
              $push: {
                "schedule.$.slotSchedule": {
                  startTime: startTime,
                  endTime: endTime,
                  patientId: patientId,
                },
              },
            }
          );

          if (!updateSchedule)
            throw new Error("Error occurred while updating slots");

          return res.status(200).send({ message: "Slot booked successfully" });
        } else {
          isDoctor.schedule.push({
            date: bookingDate,
            slotSchedule: [
              {
                startTime: startTime,
                endTime: endTime,
                patientId: patientId,
              },
            ],
          });
          await isDoctor.save();
          return res.status(200).send({ message: "Slot booked successfully" });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = slotBooking;
