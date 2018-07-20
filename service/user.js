const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const urils = require('utility');

const _filter = {'pwd': 0, '__v': 0};

Router.get('/list', (req, res) => {
    const {type} = req.query;
    let data = {};
    if(type) {
        data = {type}
    }

    User.find(data, (err, doc) => {
        return res.json({code: 0, data: doc});
    });
});
Router.get('/remove', (req, res) => {
    User.remove({}, (err, doc) => {
        return res.json('已经清理');
    });
}); 

Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body;
    User.findOne({
        user
    }, _filter, (err, doc) => {
        if(doc) {
            return res.json({
                code: 1,
                msg: '用户名已存在'
            })
        }

        const userModel = new User({
            user, type, pwd: md5Pwd(pwd)
        });
        userModel.save((err, doc) => {
            if(err) {
                return res.json({code: 1, msg: '后端出错了'});
            }
            const {user, type, _id} = doc;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}})
        });

        // User.create({user, pwd: md5Pwd(pwd), type}, (err, doc) => {
        //     if(err) {
        //         return res.json({code: 1, msg: '后端出错了'});
        //     }
        //     return res.json({code: 0})
        // })
    });
});

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({
        user,
        pwd: md5Pwd(pwd)
    }, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '查询用户失败'});
        }
        if (doc) {
            res.cookie('userid', doc._id);
            return res.json({
                code: 0,
                data: doc
            }); 
        } else {
            User.findOne({
                user
            }, {'pwd': 0}, (err, doc) => {
                if(err || !doc) {
                    return res.json({code: 1, msg: '没有这个用户'});
                }else{
                    return res.json({code: 1, msg: '密码输入错误'});
                }
            });
            
        }
    });
});

Router.post('/update', (req, res) => {
    const userid = req.cookies.userid;
    console.log(userid, 'userid**')
    if(!userid){
        // 用户没有cookie
        return res.json({code: 1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code: 0, data});
    });
});

Router.get('/info', (req, res) => {
    const userid = req.cookies.userid;

    if(!userid){
        // 用户没有cookie
        return res.json({code: 1});
    }
    User.findOne({
        _id: userid
    }, _filter, (err, doc) => {
        if(err) {
            return res.json({code: 1, msg: '后端出错了'});
        }
        if(doc) {
            return res.json({code: 0, data: doc});
        }
    });
    
});

const md5Pwd = (pwd) => {
    const salt = 'imooc_is_good_3957x87za6!@!@#$%%~~';
    return urils.md5(urils.md5(pwd + salt));
}

module.exports = Router;