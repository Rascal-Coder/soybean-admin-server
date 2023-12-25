const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

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
    res.type('svg');
    res.status(200).send({
        code:200,
        data:captcha.data
    });
});

module.exports = router;
