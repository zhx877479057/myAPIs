const router = require('koa-router')();
var ServiceDao=require('../dao/ServiceDao');

var Dao=new ServiceDao();

router.get('/personinfo',async(ctx,next)=>{
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

router.get('/allperson',async(ctx,next) =>{  //接口名称，与前端componentDidMount()中的api保持一致
    let result = await Dao.allperson();

    console.log(result);

    ctx.body=result;
})

module.exports = router;