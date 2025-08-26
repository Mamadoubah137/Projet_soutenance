import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Champs requis manquants" });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
};
