var express = require('express');
const router = express.Router();

const UserService = require('../service/service');
const service = new UserService();
const { generateAccessToken, authenticateToken } = require('../auth/jwt');
router.get('/homepage', (req, res) => {
    console.log({ "success": "Welcome on the home page!" });
    res.send({ "success": "Welcome on the home page!" })
})

router.post('/signup', async (req, res) => {
    service.create(req.body).then((data) => {

        console.log({ "success": "Successfully signed up" });
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})
router.get('/getAll', authenticateToken, (req, res) => {
    try {
        service.findAll().then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', authenticateToken, (req, res) => {

    service.findById(req.params.id).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
})

router.delete('/delete/:id', authenticateToken, (req, res) => {
    service.deleteById(req.params.id).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
})
router.put('/update/:id', authenticateToken, (req, res) => {
    service.updateById(req.params.id, req.body).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
})

router.get('/login/in', (req, res) => {
    service.loginById(req.body).then((data) => {
        const token=generateAccessToken({email:req.body.email})
        console.log(token)
        console.log('successfull login')
        res.cookie(token)
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
})
module.exports = router