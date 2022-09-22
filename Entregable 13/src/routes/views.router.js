import  { Router } from 'express';
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const router = Router();

router.get('/',(req,res)=>{
    res.render('register');
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/home',async(req,res)=>{
    if(!req.session.user) return res.render('error',{mensaje:"Credenciales Invalidas"})
    res.render('data',{user:req.session.user})
})
router.get('/logout',(req,res)=>{
    if(!req.session.user) return res.redirect('/login')
    let user = req.session.user.name
    req.session.destroy()
    res.render('logout',{user})
})
export default router;