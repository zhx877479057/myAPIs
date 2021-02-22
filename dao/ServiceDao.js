const DyBatis = require('dy-batis')//数据库链接插件
const path = require('path')//路径插件
const config = require('../config/config.json')//引入数据库配置文件
const koaRequest = require('koa2-request')//koa封装的请求第三方接口的方法

class demodao {
    constructor() {
        this.state = {
            corpid: 'wxb524c9f7b768dad6',
            corpsecret: '1IN1d8-kZ4UJG7PwQgTi5wcKHwd9VLDRhoUwTh-gRh0'
        }
    }

    async personinfo(id) {
        console.log('personinfo');

        const db = new DyBatis(config, path.resolve(__dirname, '../config/mapper.xml'));

        let result = await db.select('personinfo', { id: id })

        return result;
    }

    async requestwechat() {
        let corpid = this.state.corpid;
        let corpsecret = this.state.corpsecret;
        //koa封装的请求第三方接口的方法(koa2-request)
        //获取access_token
        let res1 = await koaRequest({
            url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`,
            method: 'get'
        });

        let ACCESS_TOKEN = JSON.parse(res1.body).access_token;

        //获取企业微信API域名IP段
        let res2 = await koaRequest(`https://qyapi.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=${ACCESS_TOKEN}`)
        // let res = await koaRequest('http://api.douban.com/v2/movie/subject/26942674');
        // let res1 = await koaRequest({
        //     url: 'localhost:3030/test',
        //     method: 'post',
        //     form: resData
        // })
        // console.log(JSON.parse(res1.body))

        let result = {ACCESS_TOKEN:ACCESS_TOKEN,res:res2.body}

        return result;
    }

    async getuserinfo(code){
        let result=await this.requestwechat();
        let ACCESS_TOKEN=result.ACCESS_TOKEN;
        let res=await koaRequest(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${ACCESS_TOKEN}&code=${code}`);
        let USERID=JSON.parse(res.body).UserId;
        let userdata=await koaRequest(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${ACCESS_TOKEN}&userid=${USERID}`);       
        return userdata.body
    }
    
}

module.exports = demodao;