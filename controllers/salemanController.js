const Salesman = require("../models/saleman")

async function createSaleman(req, res) {
    try {
        const {name, email, phone} = req.body;
        const salesman = new Salesman({name, email, phone});
        await salesman.save();
        res.status(201).json(salesman)
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
        
    }
    
};

async function getAllSaleman(req, res) {
      try {
        const salesman = await Salesman.find();
        res.json(salesman)
        
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
        
    }
}
async function getSalemanById(req, res) {
      try {
        const {id} = req.params;
        const salesman = await Salesman.findById(id);
        if (!salesman) return res.status(404).json({msg:"Salesman not found"})
        res.json(salesman)
        
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
    }
}

async function updateSaleman(req, res) {
      try {
        const {id} = req.params;
        const salesman = await Salesman.findByIdAndUpdate(id, {new:true});
        if (!salesman) return res.status(404).json({msg:"Salesman not found"})
        res.json(salesman)
        
    } catch (error) {
        res.status(500).json({msg: "Server Error"})
        
    }
}

async function deleteSaleman(req, res) {
      try {
        const {id} = req.params;
        const salesman = await Salesman.findByIdAndDelete(id);
        if (!salesman) return res.status(404).json({msg:"Salesman not found"})
        res.json(salesman) 
    } catch (error) {
        res.status(500).json({msg: "Server Error"}) 
    }
}

module.exports = {
    createSaleman,
    getAllSaleman,
    getSalemanById,
    updateSaleman,
    deleteSaleman
}