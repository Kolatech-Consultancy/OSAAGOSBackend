import Router from "express" 
import mediaController from "../controllers/mediaController.js"


const mediaroutes = Router()
mediaroutes.post("/uploadMedia", mediaController.uploadMedia)
mediaroutes.get("/getMedia", mediaController.getMedia)
mediaroutes.get("/getMediaById/:id", mediaController.getMediaById)
mediaroutes.put("/updateMedia/:id", mediaController.updateMedia)
mediaroutes.delete("/deleteSingleMedia/:id", mediaController.deleteSingleMedia)
mediaroutes.delete("/deleteAllMedia", mediaController.deleteAllMedia)

export default mediaroutes