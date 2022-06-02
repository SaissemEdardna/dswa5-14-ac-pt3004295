var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');
module.exports = function()
{
	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID: 'a3e445c53572e7887d21',
    	clientSecret: 'a38f161b90dc7d56905dd3f0124782e28326fbc5',
    	callbackURL: 'http://localhost:5000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login" : profile.username},
			{ "nome" : profile.username},
			function(erro, usuario) {
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
			);
	}));
	passport.serializeUser
	(function(usuario, done)
	{
		done(null, usuario._id);
	}
	);

	passport.deserializeUser
	(function(id, done)
	{
		Usuario.findById(id).exec().then
		(
			function(usuario)
			{
				done(null, usuario);
			}
			);
	}
	);
};