import Registration from "../model/registration.js";
import User from "../model/user.js";
import Event from "../model/event.js";
import Organization from "../model/organization.js";

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

    // Role-based scoping for organizations
    const userId = req.user?.id;
    if (userId) {
      const dbUser = await User.findById(userId);
      if (dbUser && dbUser.role === "organization") {
        // Find organizations matching user's displayName
        const orgs = await Organization.find({
          name: new RegExp(`^${dbUser.displayName.trim()}$`, "i"),
        });
        const orgIds = orgs.map((o) => o._id);

        // Find events created by this user or belonging to their organization
        const userClauses = [{ created_by: dbUser._id }];
        if (orgIds.length > 0) {
          userClauses.push({ organizer: { $in: orgIds } });
        }
        const myEvents = await Event.find({ $or: userClauses }).select("_id");
        const myEventIds = myEvents.map((e) => e._id);

        if (filter.event) {
          const matches = myEventIds.some(
            (id) => id.toString() === filter.event.toString(),
          );
          if (!matches) {
            return res.status(200).json([]);
          }
        } else {
          filter.event = { $in: myEventIds };
        }
      }
    }

    const registrations = await Registration.find(filter)
      .populate("user", ["-password", "-__v"])
      .populate("event", "-__v")
      .select("-__v")
      .sort({ _id: -1 });

    const result = registrations.map((r) => {
      const obj = r.toObject();
      if (!obj.volunteer && obj.user) {
        obj.volunteer = obj.user;
      }
      return obj;
    });

    return res.status(200).json(result);
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
    const existing = await Registration.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Registration not found" });
    }

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).select("-__v");

    // If status transitioned to Approved, increment participant_count and filled on Event
    if (existing.status !== "Approved" && req.body.status === "Approved") {
      await Event.findByIdAndUpdate(existing.event, {
        $inc: { participant_count: 1, filled: 1 },
      });
    } else if (
      existing.status === "Approved" &&
      req.body.status &&
      req.body.status !== "Approved"
    ) {
      await Event.findByIdAndUpdate(existing.event, {
        $inc: { participant_count: -1, filled: -1 },
      });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }

    // If the removed registration was Approved, decrementing participant_count and filled on Event
    if (deleted.status === "Approved") {
      await Event.findByIdAndUpdate(deleted.event, {
        $inc: { participant_count: -1, filled: -1 },
      });
    }

    return res.status(200).json({ message: "Registration removed" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
