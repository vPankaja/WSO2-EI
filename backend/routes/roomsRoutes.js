import express from "express";

const router = express.Router();

import {
  getAllRooms,
  getRoomsById,
  roomById,
  createRooms,
  deleteRoom,
  updateRoom,
  checkRoomAvailability,
} from "../controllers/roomsController.js";

router.post("/createrooms", createRooms);
router.post("/checkAvailability", checkRoomAvailability);
router.post("/roomsbyId", roomById);
router.get("/allrooms", getAllRooms);
router.route("/:id").get(getRoomsById).delete(deleteRoom).put(updateRoom);

export default router;