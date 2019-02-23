var colors = require('colors');

function callLog(text){
	var date = new Date();
	var o = {
		year: 1900 + date.getYear(),
		month: date.getMonth() + 1,
		date: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds()
	}, i;
	
	for(i in o){
		if(o[i] < 10) o[i] = "0"+o[i];
		else o[i] = o[i].toString();
	}
	console.log("["+o.year+"-"+o.month+"-"+o.date+" "+o.hour+":"+o.minute+":"+o.second+"] "+text);
}
exports.log = function(text){
	callLog('[로그] ' + text);
};
exports.info = function(text){
	callLog('[정보] '.cyan + text);
};
exports.success = function(text){
	callLog('[성공] '.green + text);
};
exports.alert = function(text){
	callLog('[알림] '.yellow + text);
};
exports.warn = function(text){
	callLog('[경고] '.black.bgYellow + text);
};
exports.error = function(text){
	callLog('[에러] '.bgRed + text);
};