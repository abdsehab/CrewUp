import Registration from "../model/registration.js";
import User from "../model/user.js";
import Event from "../model/event.js";

export const getRegistrations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.event) {
      filter.event = req.query.event;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.user) {
      filter.user = req.query.user;
    }

    const registrations = await Registration.find(filter)
      .populate("user", ["-password", "-__v"])
      .populate("event", "-__v")
      .select("-__v");

    return res.status(200).json(registrations);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const registrations = await Registration.find({ user: userId })
      .populate("event", "-__v")
      .select("-__v");

    return res.status(200).json(registrations);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createRegistration = async (req, res) => {
  try {
    // 1. Verify User Identity
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 2. Role Check (Only volunteer can register)
    const user = await User.findById(userId);
    if (!user || user.role !== "volunteer") {
      return res.status(403).json({ error: "Only volunteers can register for events" });
    }

    // 3. Event existence check
    const eventId = req.body.event;
    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // 4. Duplicate registration check
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId
    });
    
    if (existingRegistration) {
      return res.status(409).json({ error: "You are already registered for this event" });
    }

    // 5. Create registration
    const newRegistration = new Registration({
      ...req.body,
      user: userId,
      event: eventId
    });
    await newRegistration.save();
    return res.status(201).json({ message: "Registration successful", registration: newRegistration });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateRegistration = async (req, res) => {
  try {
    const updated = await Registration.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ error: "Registration not found" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const deleted = await Registration.findOneAndDelete({ _id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }
    return res.status(200).json({ message: "Registration removed" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
