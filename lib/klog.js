const colors = require('colors');
const fs = require('fs')

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

	let timestamp = o.year+"-"+o.month+"-"+o.date+" "+o.hour+":"+o.minute+":"+o.second
	let data = timestamp + text + '\n'

	console.log("["+ timestamp + "] "+text);
}

function write(text){
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

	let timestamp = o.year+"-"+o.month+"-"+o.date+" "+o.hour+":"+o.minute+":"+o.second
	let data = timestamp + ' ' + text + '\n'
	fs.writeFileSync(__dirname + '\\log\\' + timestamp.split(' ')[0] + '.log', data, {flag: 'a', encoding: 'utf-8'})
}
exports.log = function(text){
	callLog('[로그] ' + text);
	write('[로그] ' + text);
};
exports.info = function(text){
	callLog('[정보] '.cyan + text);
	write('[정보] ' + text);
};
exports.success = function(text){
	callLog('[성공] '.green + text);
	write('[성공] ' + text);
};
exports.alert = function(text){
	callLog('[알림] '.yellow + text);
	write('[알림] ' + text);
};
exports.warn = function(text){
	callLog('[경고] '.black.bgYellow + text);
	write('[경고] ' + text);
};
exports.error = function(text){
	callLog('[에러] '.bgRed + text);
	write('[에러] ' + text);
};