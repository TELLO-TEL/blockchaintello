const express =  require('express')
const bodyparser = require('body-parser')
const bitcore = require('bitcore-lib')
const request = require('request')
var app =  express();


app.use(bodyparser.urlencoded({
    extended:true
}))
 
app.use(bodyparser.json())
app.set("view engine","ejs")

function brainWallet(uinput, callback){
    var input = new Buffer(uinput);
   var hash =bitcore.crypto.Hash.sha256(input);
   var bn =  bitcore.crypto.BN.fromBuffer(hash);
   var pk = new bitcore.PrivateKey(bn).toWIF()
   var addy = new bitcore.PrivateKey(bn).toAddress()
   callback(pk ,addy)

}

request({
    url:"https://btc-e.com/api/3/ticker/btc_usd" ,
    jso: true
},(err,res,body)=>{
    price = body.btc_usd.last
})


app.get('/',(req , res)=>{
   res.render('index',{ 
   lastPrice : price}
)
})


app.post('/wallet',(req , res)=>{
   var brainsrc = req.body.brainsrc;
   brainWallet(brainsrc,(priv ,addr)=>{
    res.send( "blockchain name  "+ brainsrc + " <br> blockchain crypto   " + addr+ "<br>"+" privatekey   " + priv)
   })


})

app.listen(3000,()=>{
    console.log('running on 3000')
})
