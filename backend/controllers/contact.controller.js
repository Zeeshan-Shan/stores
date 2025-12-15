import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
	try {
		const { subject, message } = req.body;

		if (!message || !message.trim()) {
			return res.status(400).json({ message: "Message is required" });
		}

		const contact = await Contact.create({
			user: req.user._id,
			subject,
			message,
		});

		res.status(201).json({
			message: "Message sent successfully",
			contact,
		});
	} catch (error) {
		console.error("Error in createContact:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getMyContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user._id }).sort({
			createdAt: -1,
		});

		res.json(contacts);
	} catch (error) {
		console.error("Error in getMyContacts:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};