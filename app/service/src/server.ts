import express ,{Request,Response,NextFunction,ErrorRequestHandler}from 'express'
import rateLimit from 'express-rate-limit';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import route from './route/auth.route';
import { ErrorMiddleware } from 'middleware/error.middleware';
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});
const app = express()

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
    },
  })
);
if(process.env.MODE !=="test"){
  app.set('trust proxy',1)
}
app.use(cors({
  methods:['POST'],
  credentials:true,
  origin:"https://market.aubertdev.com.br"
}))
app.use( cookieParser())
app.use( globalLimiter )

app.use(route)

app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
      
        if(process.env.MODE !== "test"){
            app.listen(process.env.PORT,()=>{console.log('server running'+process.env.PORT)});
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;