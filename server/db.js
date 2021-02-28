var mysql = require("mysql")
mysql_config = {
    host: "localhost",  
    port: 3306,
    user: "root",
    password: "01301005",
    database: 'travel',
    useConnectionPooling: true,
    dateStrings: true
}
var connection = mysql.createConnection(mysql_config)
connection.connect((err) => {
    if (err) {
        console.log("连接失败")
        connection = mysql.createConnection(mysql_config)
    } else {
        console.log("连接成功")
    }
})
connection.on('error', function (err) {
    console.log('db error', err);
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleError();
    } else {
        throw err;
    }
})

module.exports = connection;