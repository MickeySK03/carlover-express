require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const carRoute = require("./routes/car-route");

const app = express();

/*cors ให้ server กำหนดสิทธิ์การเข้าถึงทรัพยากรได้ เมื่อwebsiteมี domain อื่นเข้ามาrequest */
app.use(cors());
/*morgan = middleware เก็บ log จาก http request ติดตามการrequest */
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/", carRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`server runningon port ${PORT}`));
