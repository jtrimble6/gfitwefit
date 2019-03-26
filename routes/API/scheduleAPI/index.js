const router = require("express").Router();
const scheduleRoutes = require("./schedule");

router.use("/api/schedules", scheduleRoutes);

module.exports = router;
