const router = require('express').Router();
const {Track} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res)=> {
    try {
        console.log(req.body);
        const newtrack = await track.create({
            ...req.body, //Replace body with whatever the track body needs
            user_id: req.session.user_id,
        });
        res.status(200).json(newtrack);
    }   catch (err) {
        res.status(400).json(err);
        console.log(err);
    }

});
  
  module.exports = router;