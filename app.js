var app=require('express')();
var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var methodOverride=require("method-override");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs'); 
var conn      = mongoose.createConnection('mongodb://localhost/restaurant_site');
var conn2     = mongoose.createConnection('mongodb://localhost/orders');

// stored in 'testA' database
var Item    = conn.model('Item', new mongoose.Schema({
    name:String,
    image:String,
    price:String
}));

// stored in 'testB' database
var Order   = conn2.model('Order', new mongoose.Schema({
  name : String
}));
// mongoose.connect("mongodb://localhost/restaurant_site");
// mongoose.connect("mongodb://localhost/orders");
// var itemSchema=new mongoose.Schema({
//     name:String,
//     image:String,
//     price:String
// });
// var item1Schema=new mongoose.Schema({
//     name:String
// });
// var Item=mongoose.model("Item",itemSchema);
// Item.create({
//     name: "Cheese Garlic Bread",image:"https://b.zmtcdn.com/data/dish_photos/ed4/a5de73671dd54a40e4196bdd3902ded4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",price:"$ 1.2"}
//     ,function(err,item){
//         if(err)
//         console.log(err);
//         else
//         console.log(item);
//     }
// );
app.get("/",function(req,res){
    res.render("intro");
});
app.get("/menu",function(req,res){
    var arr=[];
      Item.find({},function(err,items){
          if(err){
              console.log(err);
          }
          else
          {
          res.render("menu.ejs",{items:items,arr:arr});}
      });
});
app.post("/menu",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var item={name:name,image:image,price:price};
    Item.create(item,function(err,item){
        if(err)
        console.log(err);
        else
        console.log(item);
    });
    res.redirect("/menu");
});
app.delete("/menu/orders/:id",function(req,res){
    Order.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/menu/orders");
        else
        res.redirect("/menu/orders");
    });
});
app.post("/menu/orders",function(req,res){
    var name=req.body.order;
    var order={name:name};
    Order.create(order,function(err,order){
        if(err)
        console.log(err);
        else
        console.log(order);
    });
    res.redirect("/menu");
});
app.get("/menu/orders",function(req,res){
    Order.find({},function(err,orders){
        if(err){
            console.log(err);
        }
        else
        {
        res.render("orders.ejs",{orders:orders});}
    });
})
app.get("/menu/new",function(req,res){
    res.render("new.ejs");
});
app.get("/menu/:id/edit",function(req,res){
        Item.findById(req.params.id,function(err,founditem){
            if(err)
            res.redirect("/menu");
            else
            res.render("edit.ejs",{item:founditem});
        });
});
app.put("/menu/:id",function(req,res){
    Item.findByIdAndUpdate(req.params.id,req.body.item,function(err,updateditem){
        if(err)
        res.redirect("/menu");
        else
        res.redirect("/menu");
    });
});
app.delete("/menu/:id/",function(req,res){
    Item.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.redirect("/menu");
        else
        res.redirect("/menu");
    })
});
app.listen(3000,function(){
    console.log("Working");
});