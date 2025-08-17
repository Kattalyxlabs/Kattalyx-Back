import userRoutes from "../../routes/v1/user.route.js";
import packageRoutes from '../../routes/v1/packege.route.js';

const RouteHandler = (app: any) => {
<<<<<<< HEAD
  app.use("/user", userRoutes);
=======
  app.use('/user', userRoutes);
  app.use('/package', packageRoutes);
>>>>>>> eb2a204 (package all operation complited)
};



export default RouteHandler;
