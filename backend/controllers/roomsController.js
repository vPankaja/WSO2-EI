import asyncHandler from "express-async-handler";
import Rooms from "../models/roomModel.js";

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Rooms.find({});
  res.json(rooms);
});

const getRoomsById = asyncHandler(async (req, res) => {
  const rooms = await Rooms.findById(req.params.id);

  if (rooms) {
    res.json({
      _id: rooms._id,
      name: rooms.name,
      maxcount: rooms.maxcount,
      features1: rooms.features1,
      features2: rooms.features2,
      features3: rooms.features3,
      features4: rooms.features4,
      rentperday: rooms.rentperday,
      features5: rooms.features5,
      imageUrls: rooms.imageUrls,
      currentBookings: rooms.currentBookings,
      type: rooms.type,
      description: rooms.description,
    });
  } else {
    res.status(404);
    throw new Error("room not found");
  }
});

const roomById = asyncHandler(async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const rooms = await Rooms.findOne({ _id: req.body.roomid });
    res.json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

const createRooms = asyncHandler(async (req, res) => {
  const {
    name,
    rentperday,
    maxcount,
    features1,
    features2,
    features3,
    features4,
    features5,
    description,
    type,
    imageUrl1,
    imageUrl2,
    imageUrl3,
  } = req.body;

  const newroom = new Rooms({
    name,
    maxcount,
    rentperday,
    features1,
    features2,
    features3,
    features4,
    features5,
    type,
    imageUrls: [imageUrl1, imageUrl2, imageUrl3],
    description,
    currentbookings: [],
  });
  try {
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const deleteRoom = asyncHandler(async (req, res) => {
  const rooms = await Rooms.findById(req.params.id);

  if (rooms) {
    await rooms.remove();
    res.json({ message: "Room removed" });
  } else {
    res.status(404);
    throw new Error("Room not found");
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  const {
    name,
    rentperday,
    maxcount,
    features1,
    features2,
    features3,
    features4,
    features5,
    description,
    type,
    imageUrl1,
    imageUrl2,
    imageUrl3,
  } = req.body;

  const rooms = await Rooms.findById(req.params.id);

  if (rooms) {
    (rooms.name = name),
      (rooms.rentperday = rentperday),
      (rooms.maxcount = maxcount),
      (rooms.features1 = features1),
      (rooms.features2 = features2),
      (rooms.features3 = features3),
      (rooms.features4 = features4),
      (rooms.features5 = features5),
      (rooms.description = description),
      (rooms.type = type),
      (rooms.imageUrls = [imageUrl1, imageUrl2, imageUrl3]);

    const updateRoom = await rooms.save();
    res.json(updateRoom);
  } else {
    res.status(404);
    throw new Error("Room Not Found");
  }
});

const formatDate1 = (fullDate) => {
  var day = fullDate;
  var month = "";
  var year = "";
  var arr = fullDate.split("-");
  year = arr[2];
  month = arr[1];
  day = arr[0];
  var formattedDate = month + "-" + day + "-" + year ;
  // console.log(formattedDate)
  return formattedDate;
};

const formatDate2 = (fullDate) => {
  var day = fullDate;
  var month = "";
  var year = "";
  var arr = fullDate.split("-");
  year = arr[0];
  month = arr[1];
  day = arr[2];
  var formattedDate = month + "-" + day + "-" + year ;
  // console.log(formattedDate)
  return formattedDate;
};

const checkRoomAvailability = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const query = {
      _id: req.body.id,
      // status: "booked",
    };

    //get current bookings
    const sDate = req.body.fromdate.split('T')[0];
    const eDate = req.body.todate.split('T')[0];
    var availability = true;

    await Rooms.find(query).then((data) => {
      const allBookings = data[0].currentBookings;
      allBookings.forEach((element) => {
        // var element = {
        //   fromdate: "05-15-2021",
        //   todate: "05-20-2021 23:59:59",
        // };
        var formDate = formatDate1(element.fromdate);
        var toDate = formatDate1(element.todate);
        //Check date
        var dateS1 = new Date(formatDate2(sDate)).getTime();
        var dateS2 = new Date(formatDate2(eDate) + " 23:59:59").getTime();
        var dateD1 = new Date(formDate).getTime();
        var dateD2 = new Date(toDate).getTime();

        if (dateS1 < dateD1) {
          if (dateS2 > dateD1) {
            availability = false;
          }
        } else {
          if (dateS1 < dateD2) {
            availability = false;
          } else if (dateS2 < dateD2) {
            availability = false;
          }
        }
      });

      res.send(availability);
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});



export {
  getAllRooms,
  getRoomsById,
  roomById,
  createRooms,
  deleteRoom,
  updateRoom,
  checkRoomAvailability,
};
