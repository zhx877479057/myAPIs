const router = require('koa-router')();
var ServiceDao=require('../dao/ServiceDao');

var Dao=new ServiceDao();

router.post('/personinfo',async(ctx,next)=>{
    var id=ctx.query.id;
    console.log(id);
    var result=await Dao.personinfo(id);
    ctx.body=result;
});

router.get('/requestwechat',async(ctx,next)=>{
    let result =await Dao.requestwechat();
    ctx.body=JSON.parse(result);
})

router.get('/userinfo',async(ctx,next)=>{
    let code=ctx.query.code;
    // console.log(code);
    let result=await Dao.getuserinfo(code);
    console.log(result);
    ctx.body=JSON.parse(result);
})

module.exports = router;