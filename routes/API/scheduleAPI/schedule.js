const router = require("express").Router();
const scheduleController = require("../../../controllers/scheduleController");

router.route("/")
  .post(scheduleController.create)
  .get(scheduleController.getSchedules)

router.route("/:id")
  .get(scheduleController.getSchedule)
  .delete(scheduleController.delete)

// router.route("/checksession")
//   .get(scheduleController.checkSession)

// router.route("/logout")
//   .delete(scheduleController.logout)

module.exports = router;