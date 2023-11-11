require("dotenv").config();

let PORT = process.env.PORT || 3003;
const MONGODB_URI =
  "mongodb+srv://abbosg5:3D3VO6Iw7ake1MIO@cluster0.y1y5vol.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  MONGODB_URI,
  PORT,
};
