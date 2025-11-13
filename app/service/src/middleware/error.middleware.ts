import { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../helpers/ErrorMessage";


export function ErrorMiddleware  (error:any,req:Request,res:Response,next:NextFunction):any{
      
        console.log(error.message) 
        if(error instanceof ErrorMessage){
            res.status(error.status).json({message:error.message})
            return 
        }
       
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.'});
}