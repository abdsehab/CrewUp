import mongoose from "mongoose";
import Event from "../model/event.js";
import Organization from "../model/organization.js";
import User from "../model/user.js";

const getDateRange = (dateFilter) => {
  if (dateFilter === "This Weekend") {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7;
    const weekendStart = new Date(now);
    weekendStart.setDate(now.getDate() + daysUntilSaturday);
    weekendStart.setHours(0, 0, 0, 0);
    const weekendEnd = new Date(weekendStart);
    weekendEnd.setDate(weekendStart.getDate() + 2);
    weekendEnd.setSeconds(-1);
    return { $gte: weekendStart, $lte: weekendEnd };
  }

  if (dateFilter === "Next 30 Days") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 30);
    return { $gte: start, $lte: end };
  }

  return null;
};

const buildFilter = (query) => {
  const filter = {};

  const { categories, date, city, q, organizer } = query;

  if (organizer) {
    filter.organizer = organizer;
  }

  if (categories) {
    const list = categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    if (list.length > 0) {
      filter.category = { $in: list };
    }
  }

  const dateRange = getDateRange(date);
  if (dateRange) {
    filter.start_time = dateRange;
  }

  if (city) {
    const regex = new RegExp(city.trim(), "i");
    filter.$or = [{ location: regex }, { address: regex }];
  }

  if (q) {
    const regex = new RegExp(q.trim(), "i");
    const qClause = { $or: [{ title: regex }, { location: regex }] };
    if (filter.$or) {
      filter.$and = [qClause, { $or: filter.$or }];
      delete filter.$or;
    } else {
      filter.$or = qClause.$or;
    }
  }

  return filter;
};

export const getEvents = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const events = await Event.find(filter)
      .populate("organizer")
      .select("-__v")
      .sort({ start_time: 1 });
    return res.status(200).json(events);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ id: Number(req.params.id) })
      .populate("organizer")
      .select("-__v");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };

    if (!eventData.id) {
      const lastEvent = await Event.findOne().sort({ id: -1 });
      eventData.id = lastEvent && lastEvent.id ? lastEvent.id + 1 : 1;
    }

    if (typeof eventData.description === "string") {
      eventData.description = eventData.description
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (eventData.description.length === 0) {
        eventData.description = ["No description provided."];
      }
    }

    if (eventData.organizer) {
      const isValid = mongoose.Types.ObjectId.isValid(eventData.organizer);
      if (!isValid) {
        let org = await Organization.findOne({ name: eventData.organizer });
        if (!org) {
          org = await Organization.create({
            name: eventData.organizer,
            desc: "Community organization on CrewUp",
            bio: "Organizing environmental and tech stewardship events.",
            image:
              "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=80",
          });
        }
        eventData.organizer = org._id;
      }
    } else {
      let org = null;
      if (req.user?.id) {
        const user = await User.findById(req.user.id);
        if (user?.displayName) {
          org = await Organization.findOne({ name: user.displayName });
          if (!org) {
            org = await Organization.create({
              name: user.displayName,
              desc: "Eco-tech community organization",
              bio: "Dedicated to driving positive environmental impact.",
              image:
                "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=80",
            });
          }
        }
      }
      if (!org) {
        org = await Organization.findOne();
      }
      if (org) {
        eventData.organizer = org._id;
      }
    }

    if (eventData.organizer) {
      await Organization.findByIdAndUpdate(eventData.organizer, {
        $inc: { events: 1 },
      });
    }

    if (eventData.capacity) {
      eventData.capacity = Number(eventData.capacity);
    }
    if (eventData.filled === undefined) {
      eventData.filled = 0;
    }
    if (eventData.participant_count === undefined) {
      eventData.participant_count = 0;
    }
    if (!eventData.status) {
      eventData.status = "Published";
    }
    if (!eventData.participant_previews) {
      eventData.participant_previews = [];
    }

    const newEvent = new Event(eventData);
    await newEvent.save();
    return res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true },
    ).select("-__v");

    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
