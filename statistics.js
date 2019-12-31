var mysql=require('mysql');

var updating=function(index){
    var num='';
    var con=mysql.createConnection({
        host:'localhost',
user:'root',
password:'',
database:'statistics'
    });
    con.connect(function(err){
        if(err) throw err;
        var sql="SELECT * FROM stats where id='"+index+"'";
        con.query(sql,function(err,result){
            if(err) throw err;
            var sql=`UPDATE stats SET count='${result[0].count+1}' WHERE id='${index}'`;
            con.query(sql,function(err,result){
                if(err) throw err;
            });
        });
    });
};

module.exports.updating=updating;