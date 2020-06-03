var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
res.status(200).json({
msn: "Hola mundo"
});
});
router.post('/test', function(req, res, next) {
    req.body["msn"] = "Por el servidor";
    var data = req.body
    res.status(200).json(data);
    });
//divisas
router.post('/divisas', (request, response, next) =>{
    var params= request.body;
    if(params.source ==null && params.cant == null && params.destination == null){
        response.status(200).json({
            "msm":"Parametros Incorrectos"
        });
        return;
    }
    var dictionary = {
        CAD:1.3518883122,
        HKD:7.7509396814,
        ISK:135.1351351351,
        PHP:50.1798818686,
        DKK:6.6709325219,
        HUF:309.3520672991,
        CZK:23.845534276,
        GBP:0.7972346519,
        RON:4.3335421514,
        SEK:9.3538571684,
        IDR:14414.9991050653,
        INR:75.2094147127,
        BRL:5.3247717917,
        RUB:68.7310721317,
        HRK:6.7879004833,
        JPY:108.1349561482,
        THB:31.5652407374,
        CHF:0.9612493288,
        EUR:0.8949346698,
        MYR:4.2775192411,
        BGN:1.7503132271,
        TRY:6.7744764632,
        CNY:7.106944693,
        NOK:9.5577232862,
        NZD:1.5822444962,
        ZAR:17.2503132271,
        USD:1.0,
        MXN:21.8764990156,
        SGD:1.4021836406,
        AUD:1.4596384464,
        ILS:3.4780741006,
        KRW:1221.0667621264,
        PLN:3.9370860927,
        BO:6.96 
    }
    if (dictionary[params.source] > 1){
        var todollar = Number(params.cant) / dictionary[params.source]
    } else {
        var todollar = Number(params.cant) * dictionary[params.source]
    } 
    if (dictionary[params.destination] > 1){
        var todestination =todollar * dictionary[params.destination] 
    }else {
        var todestination =todollar / dictionary[params.destination] 
    }
    response.status(200).json({
        "source": params.source,
        "destination": params.destination,
        "result": todestination
    });
});
//interes
router.post('/interes', (req, res, next) => { 
    var parametros= req.body;
    if(parametros.require == null || parametros.interest == null || parametros.time == null){
        res.status(200).json({
            "msm":"Parametros Incorrectos"
        });
        return;
    }
    var annualinterest={
        corto :0.06,
        largo:0.1
    }
    if (Number (parametros.time) >= 12){
        var monto=Number(parametros.require)+(Number(parametros.require)*(parametros.interest))
    }
    if (Number (parametros.time) < 12 && Number(parametros.time) > 6){
        var monto=Number(parametros.require)+(Number(parametros.require)*(parametros.interest))
    }
    if (Number (parametros.time) < 7 && Number(parametros.time) > 2){
        var monto=Number(parametros.require)+(Number(parametros.require)*(parametros.interest))
    }
    if (Number (parametros.time) < 3 && Number(parametros.time) > 0){
        var monto=Number(parametros.require)+(Number(parametros.require)*(parametros.interest))
    }
    res.status(200).json({
        "require": parametros.require,
        "interest": parametros.interest,
        "time": parametros.time,
        "result":monto
    });
    });
module.exports = router;