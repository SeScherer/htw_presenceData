const userService = require('../services/userService');

const create = (req, res) => {
    userService.create(req.body).then(result => {
        res.status(200);
        res.json(result);
    })
        .catch(error => {
            res.status(400);
            res.end('Error: ' + error.message)
        });
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.end('Bad user ID given');
        return;
    }
    userService.getById(id)
        .then(user => {
            if (user) {
                res.status(200);
                res.json(user);
            } else {
                res.status(404);
                res.json(null)
            }
        })
        .catch(error => {
            res.status(400);
            res.end('Error: ' + error.message)
        });

}

const getAll = (req,res)=>{
    userService.getAll()
        .then(users => {
            res.status(200);
            res.json(users)
        })
        .catch(error => {
            res.status(500);
            res.end('Error: ' + error.message)
        });
}
const deleteById = (req,res)=> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.end('Bad user ID given');
        return;
    }
    userService.deleteById(id)
        .then(result => {
            status = result.affactedRows > 0 ? 200 : 404
            res.status(status);
            res.json(result);
        })
        .catch(error => {
            res.status(500);
            res.end('Error: ' + error.message)
        });

}

const update = (req,res)=>{
    const id = parseInt(req.body.id);
    if (isNaN(id)) {
        res.status(400);
        res.end('Bad user ID given');
        return;
    }

    userService.update(id ,req.body).then(result=>{
        res.status(200);
        res.json(result)
    }).catch(error => {
        if(error.code === 'DUPLICATE_USERNAME'){
            res.status(400);
        }else {
            res.status(500);
        }
        res.end('Error: ' + error.message)
    })
}

module.exports = {
    create,
    getById,
    getAll,
    deleteById,
    update,
};