var mysql = require("mysql");
var datalist = require("./data.js");
//创建一个数据库连接对象
var connection = mysql.createConnection({
	host:"localhost",
	port:"3306",
	user:"root",
	password:"123456",
	database:"fenpage"
});
connection.connect();
/*
//查询表结构
connection.query("desc datalist",function(err,results){
	console.log(results);
})
*/

//insertall(datalist);
//递归插入数组
/*function insertall(arr){
	var obj = arr.shift();
	connection.query("insert into datalist values (null,'"+obj.name+"',"+obj.age+",'编辑','确定','0','0')",function(err,results){
		if(err){
			console.log(err);
		}else{
			if(arr.length>0){
				insertall(arr);
			}else{
				return;
			}

		}
	});
	if(arr.length<=0){
		connection.end();
		return;
	}
}
*/
//查询方法
/*
* tablename 表名
* tiaojian  查询条件 比如 'id>10'
**/
function search(tablename,tiaojian,callback){

	var sql = "select * from "+tablename+(tiaojian?(" where "+tiaojian+";"):";");

	connection.query(sql,function(err,results){

			callback(err,results)

	})
}
/*
*更新数据
* tablename 表名
* target    更改为
* tiaojian  条件
* callback  回调函数
* */
function update(tablename,target,tiaojian,callback){

    var sql = "update "+tablename+" set "+target+" where "+tiaojian+";"
	connection.query(sql,function(err,results){

		callback(err,results);

	})
}
/*
* 删除
* */
function deletes(tablename,tiaojian,callback){

	var sql = "delete from "+tablename+" where "+tiaojian+";"
	connection.query(sql,function(err,results){

		callback(err,results);

	})
}

module.exports.search = search;
module.exports.update = update;
module.exports.deletes = deletes;