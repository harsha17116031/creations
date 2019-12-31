var mysql=require('mysql');

module.exports=function(inp){
    var data=inp;
    var name=data.fname;
    var i=0;
    var date=Date();
    var j=0;
    var oriname='';
    for(j=0;j<name.length;j++){
        if(name[j]==' '){
            continue;
        }else{
            oriname=oriname+name[j];
        }
    }
    var id=`z${date[1]}${date[5]}${date[9]}${oriname[0]}${date[14]}${date[17]}${date[20]}${oriname[1]}${date[23]}${date[0]}${date[4]}${oriname[2]}${date[12]}${date[16]}${date[19]}${oriname[3]}${date[22]}${date[2]}${date[6]}${date[8]}${date[13]}`;
    id=id.toLowerCase();
    var con=mysql.createConnection({
        host:'localhost',
user:'root',
password:'',
database:'test'
    });
    con.connect(function(err){
        if(err) throw err;
        var sql=`CREATE TABLE ${id} (id INT AUTO_INCREMENT PRIMARY KEY , comment VARCHAR(255))`;
        con.query(sql,function(err,result){
            if(err) throw err;
            return `http://208.109.9.1:3000/play?fname=${oriname}&dare=${data.dare}&id=${id}`;
        });
    });
};