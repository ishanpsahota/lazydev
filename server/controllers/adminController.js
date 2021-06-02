const Categories = require('../models/categories')

exports.newCategory = async function(req, res) {

    try
    {
        let category = req.body.category

        let new_cat = new Categories(category)

        let save = await new_cat.save()

        return res.json({save});
        
    }
    catch(error)
    {
        return res.json({error})
    }

}