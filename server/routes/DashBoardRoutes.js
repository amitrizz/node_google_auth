import express from 'express';
const router = express.Router();
import DashBoardController from '../controllers/DashBoardController.js';


//public routes
router.get('/loaddata', DashBoardController.loadUser);
router.post('/loaddata', DashBoardController.loadUser);

router.post('/userbyid/:id', DashBoardController.getUserByid);
  

router.post('/adduser', DashBoardController.Adduser);
router.put('/updateuser/:id', DashBoardController.updateUserByid);
router.delete('/deleteuser/:id', DashBoardController.deleteUserByid);



// router.post('/showdata', DashBoardController.showData);
// router.post('/filter', DashBoardController.filterdata);



export default router;