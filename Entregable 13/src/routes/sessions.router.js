import {Router} from 'express';
import { REPL_MODE_STRICT } from 'repl';
import userService from '../models/User.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();

router.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),async (req,res)=>{
    console.log(req.user)
    res.send({status:"succes",payload:req.user._id})
})
router.get('/registerfail',(req,res)=>{
    res.render('error',{mensaje:"Ya estas registrado"})
    res.send({status:'error',payload:'Ya estas regsitrado'})
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}),async(req,res)=>{

    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:'succes',payload:req.session.user})
})
router.get('/loginfail',(req,res)=>{
    res.status(500).send({status:"error",error:""})
    res.send("Hay un error grave")
})
export default router;