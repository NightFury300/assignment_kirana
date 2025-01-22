import { Router } from "express";
import { GetJobStatus, SubmitJob } from "../controllers/Job.controller.js";

const router = Router()

router.route("/submit").post(SubmitJob)
router.route("/status").get(GetJobStatus)

export default router