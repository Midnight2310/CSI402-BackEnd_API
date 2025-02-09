import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// use try catch
app.post("/purchase/collectPoints" , (req:Request,res:Response) =>{
    try{
        const {studentId,amount} = req.body
        let currentPoints = 1000;
        const pointsEarned = Math.floor(amount / 100) * 10;
        const totalPoints = currentPoints + pointsEarned;
    
    if (!studentId || !amount || amount <= 0 ) {
        res.status(400).json({
            status:"400",
             msg:"pls check studentId and amount"
        })
    } else {
        res.status(200).json({
            status:"200",
            msg:"ok",
            data:{
                studentId: studentId,
                amountpoints: pointsEarned,
                totalPoints: totalPoints,
            }
        })
    }
    }catch(error){
        res.status(500).json({
            status:"500",
            code: "ERROR-TempAccount",
            msg: error
        })
    }
});


app.listen(3000, () => {
    console.log("server is running on port 3000");
});