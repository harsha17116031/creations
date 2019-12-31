var create=require('./create');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var statistics=require('./statistics');
var mail=require('./mail');

var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){

    app.get('/',function(req,res){
        statistics.updating(6);
        res.render('home');
    });
    app.get('/dares',function(req,res){
        statistics.updating(5);
        res.render('dares');
    });
    app.get('/dares/create-dare-1',function(req,res){
        statistics.updating(1);
        res.render('create-dare-1');
    });
    app.get('/dares/create-dare-2',function(req,res){
        statistics.updating(2);
        res.render('create-dare-2');
    });
    app.get('/dares/create-dare-3',function(req,res){
        statistics.updating(3);
        res.render('create-dare-3');
    });
    app.get('/create',function(req,res){
        var inp=req.query;
        var info=[{link:''},{id:''}];
        info[0].link=create(inp);
        var extractId='';
        var i=0;
        var flag=0;
        for(i=0;i<info[0].link.length;i++){
            if(info[0].link[i]=='&'){
                if(info[0].link[i+1]=='i'){
                    if(info[0].link[i+2]=='d'){
                        i=i+4;
                        flag=1;
                    }
                }
            }
            if(flag==1){
                extractId=extractId+info[0].link[i];
            }
        }
        info[1].id=extractId;
        res.render('create-success',{data:info})
    });
    app.get('/display',function(req,res){
        var inp=req.query;
        var id=inp.id;
        var con=mysql.createConnection({
            host:'ip-208-109-9-1',
            user:'harsha1',
            pass:'wD.VDf0_8skC',
            database:'harsha1_test'
        });
        con.connect(function(err){
            if(err) throw err;
            var sql=`SELECT * FROM ${id}`;
            con.query(sql,function(err,result){
                if(err) throw err;
                res.render('display',{info:result});
            });
        });
    });

    app.get('/play',function(req,res){
        var inp=req.query;
        statistics.updating(4);
        res.render('play',{info:inp});
    });
    app.get('/help',function(req,res){
        res.render('help');
    });
    app.get('/suggestions',function(req,res){
        res.render('suggestions');
    });
    app.post('/suggestions',urlencodedParser,function(req,res){
        var body=req.body;
        var mail=body.mail;
        var suggesting=body.suggesting_this;
        var con=mysql.createConnection({
            host:'ip-208-109-9-1',
            user:'harsha1',
            password:'wD.VDf0_8skC',
            database:'harsha1_suggestions'
        });
        con.connect(function(err){
            if(err) throw err;
            var sql="INSERT INTO suggestionsmade (suggesting,mail) VALUES ('"+suggesting+"','"+mail+"')";
            con.query(sql,function(err,result){
                if(err) throw err;
                statistics.updating(9);
                res.render('suggestions-success');
            });
        });
    });
    app.get('/create-wish',function(req,res){
        res.render('create-wish');
    });
    app.get('/create-wishes',function(req,res){
        var inp=[{fname:'a'},{link:'a'}];
        var data=req.query;
        var name=data.fname;
        inp[0].fname=name;
        inp[1].link=`http://208.109.9.1:3000/newyear?fname=${name}`;
        statistics.updating(10);
        res.render('create-newyear-success',{info:inp});
    });
    app.get('/create-newyear',function(req,res){
        var inp=[{fname:'a'},{link:'a'}];
        var data=req.query;
        var name=data.fname;
        inp[0].fname=name;
        inp[1].link=`http://208.109.9.1:3000/newyear?fname=${name}`;
        statistics.updating(10);
        res.render('create-newyear-success',{info:inp});
    });
    app.get('/newyear',function(req,res){
        var inp=req.query;
        var name=inp.fname;
        var data=[{name:''}];
        data[0].name=name;
        statistics.updating(11);
        res.render('newyear',{info:data});
    });
    app.get('/subscribe',function(req,res){
        statistics.updating(7);
        res.render('subscribe');
    });
    app.post('/subscribe',urlencodedParser,function(req,res){
        var body=req.body;
        var mail=body.mail;
        var con=mysql.createConnection({
            host:'ip-208-109-9-1',
            user:'harsha1',
            password:'wD.VDf0_8skC',
            database:'harsha1_mailer'
        });
        con.connect(function(err){
            if(err) throw err;
            var sql="INSERT INTO emails (mail) VALUES ('"+mail+"')";
            con.query(sql,function(err,result){
                if(err) throw err;
                statistics.updating(8);
                res.render('subsribe-success');
            });
        });
    });
    app.get('/mail',function(req,res){
        mail();
    });
    app.post('/play',urlencodedParser,function(req,res){
        var body=req.body;
        var id=body.id;
        var comm=body.comment;
        var con=mysql.createConnection({
            host:'localhost',
user:'root',
password:'',
database:'test'
        });
        con.connect(function(err){
            if(err) throw err;
            var sql="INSERT INTO "+id+" (comment) VALUES ('"+comm+"')";
            con.query(sql,function(err,result){
                if(err) throw err;
                res.render('thank-you');
            });
        });
    });
    app.get('/statistics-rootuser',function(req,res){
        var data=[{credare1:'1'},{credare2:'1'},{credare3:''},{linkopen:'2'},{dareatempt:''},{visits:'3'},{subatempt:'4'},{submade:'5'},{suggmade:'1'},{newcrea:'1'},{newopens:'1'}];
        var con=mysql.createConnection({
            host:'ip-208-109-9-1',
            user:'harsha1',
            password:'wD.VDf0_8skC',
            database:'harsha1_statistics'
        });
        con.connect(function(err){
            if(err) throw err;
            var sql="SELECT * FROM stats";
            con.query(sql,function(err,result){
                if(err) throw err;
                data[0].credare1=result[0].count;
                data[1].credare2=result[1].count;
                data[2].credare3=result[2].count;
                data[3].linkopen=result[3].count;
                data[4].dareatempt=result[4].count;
                data[5].visits=result[5].count;
                data[6].subatempt=result[6].count;
                data[7].submade=result[7].count;
                data[8].suggmade=result[8].count;
                data[9].newcrea=result[9].count;
                data[10].newopens=result[10].count;
                res.render('statistics',{info:data});
            });
        });
    });
};