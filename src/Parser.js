function Parser() {
}

Parser.prototype.parse = function(json, key) {
    var instances = JSON.parse(json)['Reservations'][0].Instances
    for(var i in instances) {
    	this.objeto  = new Object()
    	this.objeto.privateIp = instances[i].PrivateIpAddress
		
		if(typeof this.objeto.privateIp === "undefined"){  this.objeto.privateIp   = "Not found" }
	
		for(var j in instances[i].Tags) {
    		 if(instances[i].Tags[j].Key == "Name"){
    			this.objeto.environment = instances[i].Tags[j].Value
    		}
    	}
    }
};
