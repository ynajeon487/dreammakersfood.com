import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ví dụ: endpoint kiểm tra server hoạt động
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Bạn có thể thêm các route khác liên quan đến storage hoặc business logic của dự án tại đây
  // Ví dụ:
  // app.get("/api/items", (req, res) => {
  //   res.json(storage.getAllItems());
  // });

  const httpServer = createServer(app);
  return httpServer;
}