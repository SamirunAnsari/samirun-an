//console.log('second code')
 const express =require('express');
 var cors = require('cors')
 const bodyParser=require('body-parser')
  const mongoose = require('mongoose');
async function dbConnect(){
    return await mongoose.connect('mongodb://localhost:27017/assignment');
 }
 dbConnect()
 .then((res)=>{
     console.log("data be connected")
    console.log(res)
 })
.catch((err)=>{
     console.log(err)
     console.log("database not connect")
 })
 const Schema = mongoose.Schema;
 const categorie =new Schema({
    name:String,
});
const catModel = mongoose.model('categories', categorie)

const Product =new Schema({
    name:String,
    catid:String,
});
const proModel = mongoose.model('Products', Product)
 const app = express();
 app.use(cors());
 app.use(bodyParser.json())
// show category
app.get("/api/Show-category",async(req,res)=>{
    console.log(req.body)
var show_cat = await catModel.find();
res.send(show_cat)
}) 
app.get("/api/Show-category/:id",async(req,res)=>{
    var ans_pro_by_id = await catModel.findById(req.params.id);
    var ans_cat = await catModel.find();
     res.send({
         catrecord:ans_cat,
         productRec:ans_pro_by_id
     });
 })
// // show product
app.get("/api/Show-product",async(req,res)=>{
    var ans_count = await proModel.countDocuments();
    
    var ans_product  = await proModel.aggregate([
        {"$lookup":{
            "let":{"catid":{"$toObjectId":"$catid"}},
            "from":"categories",
            "pipeline":[
                {"$match":{"$expr":{"$eq":["$_id",
            "$$catid"]}}}
            ],
            "as":"catvalues"
        }},
    {"$skip":0},{"$limit":10}
]);

    // console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})
app.get("/api/get-product-category/:id",async(req,res)=>{
    var ans_pro_by_id = await proModel.findById(req.params.id);
    var ans_cat = await catModel.find();
    res.send({catRec:ans_cat,
    proRec:ans_pro_by_id
});
})
    
app.get("/api/show-product/:skipvalue/:limitdata" , async(req,res)=>{
    var ans_count = await proModel.countDocuments();
    var ans_product  = await proModel.find().skip(req.params.skipvalue).limit(req.params.limitdata);
     var ans_product = await proModel.aggregate([
        {"$lookup":{
            "let":{"catid":{"$toObjectId":"$catid"}},
            "from":"categories",
            "pipeline":[
                {"$match":{"$expr":{"$eq":["$_id",
            "$$catid"]}}}
            ],
            "as":"catvalues"
        }},
    {"$skip":Number(req.params.skipvalue)},{"$limit":Number(req.params.limitdata)}
     ])
    // console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})

// delete category
app.delete("/api/cat-delete/:id",async(req,res)=>{
    var del_cat = await catModel.findByIdAndRemove(req.params.id);
    console.log(del_cat);
    res.send({msg:true})
})
// delete product
app.delete("/api/show-delete/:proid",async(req,res)=>{
    var del_cat = await proModel.findByIdAndRemove(req.params.proid);
    console.log(del_cat);
    res.send({msg:true})
})
// update category
   app.put('/api/cat-edit/:uid', async(req,res)=>{
//     console.log(req.body);
//     console.log(req.params);

     res.send({msg:"ROUTE CALLED"});
    var ans_cat  = await catModel.findByIdAndUpdate(req.params. uid, req.body);
    console.log(ans_cat);
    res.send({msg:true})
 })
app.put('/api/pro-edit/:proid', async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

     

    var ans_product  = await proModel.findByIdAndUpdate(req.params.proid, req.body);
    console.log(ans_product);
    res.send({msg:true})
}) 

// Add category
app.post("/api/add-category",async(req,res)=>{
     console.log(req.body)
     const instance = new catModel(req.body);
     const ans_cat = await instance.save()
    console.log("data insert")
     console.log( ans_cat)
    res.send({msg:"category post"});
})

    //Add products
    app.post("/api/add-product",async(req,res)=>{
        console.log(req.body)
        const instance = new proModel(req.body);
        const ans_pro = await instance.save()
        console.log("data insert")
        console.log( ans_pro)
        res.send({msg:"products post"});

})
 app.listen(3009);