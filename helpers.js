module.exports.getToday =  function(moment) {
	var now = moment != undefined ? new Date(moment) : new Date();
	var day = now.getDate();
	var month = now.getMonth() + 1;
	var year = now.getFullYear();
	return day + "." + month + "." + year;
}