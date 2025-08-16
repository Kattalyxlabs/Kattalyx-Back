import userRoutes from "../../routes/v1/user.route.js";


const RouteHandler = (app: any) => {
  app.use('/user', userRoutes);
  // app.use('/package', packageRoutes);
};



export default RouteHandler;
