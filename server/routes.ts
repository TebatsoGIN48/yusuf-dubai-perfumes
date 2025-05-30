import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all perfumes
  app.get("/api/perfumes", async (req, res) => {
    try {
      const filter = req.query.filter as string || 'all';
      const sortBy = req.query.sortBy as string || 'default';
      
      let perfumes = await storage.getPerfumesByFilter(filter);
      perfumes = storage.sortPerfumes(perfumes, sortBy);
      
      res.json(perfumes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch perfumes" });
    }
  });

  // Get single perfume
  app.get("/api/perfumes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const perfume = await storage.getPerfume(id);
      
      if (!perfume) {
        return res.status(404).json({ error: "Perfume not found" });
      }
      
      res.json(perfume);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch perfume" });
    }
  });

  // Generate WhatsApp link
  app.post("/api/whatsapp-link", async (req, res) => {
    try {
      const { productName, price, message } = req.body;
      
      const defaultMessage = message || `Hi, I'm interested in ${productName} - R${price}`;
      const whatsappNumber = "27713003566";
      const encodedMessage = encodeURIComponent(defaultMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      res.json({ url: whatsappUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate WhatsApp link" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
