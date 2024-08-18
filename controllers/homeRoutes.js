const router = require("express").Router();
const { User, Track } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.findAll({
      include: [{model: User}, {model: , include: [{model: User}]}], //Define value for model key
      // attributes: [{username}]
      
    });

    const posts = tracks.map((post) => post.get({ plain: true })); //making database data useful for front end.



    res.render("homepage", {
      posts, //making data available to use in handlebars homepage file.
      // Pass the logged in flag to the template
      logged_out: !req.session.logged_in,
      logged_in: req.session.logged_in,
      //giving to handlebars the user's logged in status.
      onHomePage: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get('/profile', async (req, res) => {

});

module.exports = router;