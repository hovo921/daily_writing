const Word = require('../models/word');
const moment = require("moment");

exports.addWordForUser = async (req, res, next) => {
	try{
		const text = req.body.text;
		const date = req.body.date;
		const owner = req.user._id;

		const word = new Word({
			owner,
			text
		});

		const wordExist = await Word.findOne({owner, created: date});

		if(wordExist){
			wordExist.text = text;
			wordExist.updated = new Date();
			await wordExist.save()
			res.json(wordExist)
		} else {
			word.save((err) => {
				if (err) { return next(err) }
				res.json({word})
			});
		}


	} catch(e){
		next(e)
	}

};

exports.getWordsCountForCurrentUser = (req, res, next) => {
	const owner = req.user._id;
	const createdAt = req.body.date;
	Word.find({owner}).then((data, error) => {
		if(error) {
			res.status(403).send({error})
		}
		res.json({data: data[0]})
	});
};
