exports.handler = function(context, event, callback) {
	const hour = (new Date).toLocaleString("pt-BR",{hour: '2-digit',   hour12: false,timeZone:'America/Sao_Paulo'});
	
	if (hour < 9 || hour > 18) {
	    return callback('Fora do horário');
	}

	return callback();
};