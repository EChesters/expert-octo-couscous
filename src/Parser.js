function Parser() {
}

Parser.prototype.parse = function(json) {
    var instances = JSON.parse(json)['Reservations'][0].Instances
    for(var i in instances) {
    	this.privateIp = instances[i].PrivateIpAddress
    }
};
