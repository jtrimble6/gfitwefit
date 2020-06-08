const router = require("express").Router();
const videoRoutes = require("../../../routes2/file");

router.use("/api/files", videoRoutes);

module.exports = router;
