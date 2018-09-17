const express = require('express');
const app = express();
app.use(express.json());//使用json解析post的資料

var pt = [];
function  patient(id,nam){
    this.id = id;
    this.nam = nam;

}

//讀取all
app.get('/api/users',function(req,res){
    res.send(pt);
});

//讀取
app.get('/api/users/:id',function(req,res){
    var $id = req.params.id;
    var $idx = pt.findIndex(i=>i.id==$id);
   // pt[$idx].nam;
   if( $idx == -1)
    {
        res.send('you get id:' + $id + '，查無資料');
    }
    else{
        res.send('you get id:' + $id + '，nam是:' + pt[$idx].nam);
    }
});

//建立
app.post('/api/users',function(req,res){
    var $id = pt.length + 1;
    if(pt.length != 0 ){
        $id = pt[pt.length-1].id +1;
        while( pt.findIndex(i=>i.id==$id) != -1 ){
            $id++;
        }
    }
    
    
    var $nam = req.body.name;
    var $myPat  = new patient($id,$nam);
    pt.push($myPat);
    res.send({ok:true});
});

//刪除
app.delete('/api/users/:id', function (req, res) {
    var $id = req.params.id;
    var $idx = pt.findIndex(i=>i.id==$id);
    pt.splice($idx,1);
    res.send({ok:true});
  });

//更新
app.put('/api/users/:id/:nam',function(req,res){
    var $id = req.params.id;
    var $nam = req.params.nam;
    var $idx = pt.findIndex(i=>i.id==$id);
    var $myPat  = new patient($id,$nam);
    pt.splice($idx,1);
    pt.push($myPat);
    res.send('you put id:' + $id + '，目前nam:' + $myPat.nam);
});

app.use(express.static('public'));

app.listen(30678,()=>{
    console.log('listen Port:30678');
});