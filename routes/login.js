const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
/**
 * 登录验证码
 */
router.get('/captcha', function(req, res, next) {
    const width=req.query.width || 100;
    const height=req.query.height || 50;
    const captcha = svgCaptcha.create({
        size: 4,
        width,
        height,
        noise: 2,
        fontSize: 35,
        ignoreChars: '0o1i',
        color: true,
    });
    req.session.captcha = captcha.text;
    req.session.captchaDate=new Date().getTime();
    res.type('svg');
    res.status(200).send({
        code:200,
        data:captcha.data
    });
});
/**
 * 账号登录
 */
router.post('/password', function(req, res, next) {
    const userName=req.query.userName;
    const password=req.query.password;
    const captchaText=req.query.captcha;
    if(!userName || !password ||!captchaText){
        res.send({
            code:400,
            msg:'参数为空',
            data:null
        });
        return;
    }
    if(!req.session.captcha 
        || req.session.captcha !== captchaText 
        || !req.session.captchaDate 
        || (Date.now().getTime() - req.session.captchaDate) > 1000*60*5){
        res.send({
            code:400,
            msg:'验证码错误',
            data:null
        });
        return;
    }
    // TODO: 登录逻辑,验证用户名和密码,以及jwt生成token返回前端
    res.send({});
});
module.exports = router;
