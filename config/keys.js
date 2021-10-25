require('dotenv').config()

module.exports = {
	mongoURI: `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.8c0pz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
	jwt: 'dev-jwt',
}
