function Parser() {
}

Parser.prototype.parse = function(json, key) {
    var instances = JSON.parse(json)['Reservations'][0].Instances
    this.objeto  = new Array()

    for(var i in instances) {
    	this.objeto[i]  = new Object()
    	this.objeto[i].privateIp = instances[i].PrivateIpAddress
		
		if(typeof this.objeto[i].privateIp === "undefined"){  this.objeto[i].privateIp   = "Not found" }
	
		for(var j in instances[i].Tags) {
    		 if(instances[i].Tags[j].Key == "Name"){
    			this.objeto[i].environment = instances[i].Tags[j].Value
    		}
    	}
    }

    if(typeof key != "undefined"){
		for(var k in this.objeto){
			if (this.objeto[k].environment.toUpperCase().indexOf(key.toUpperCase()) > -1) {
				var found = this.objeto[k]
				this.objeto = new Array()
				this.objeto[0] = found
 				break
			}
		}
    }
    
    this.objeto.sort(function(a,b){ return a.environment > b.environment || a.privateIp > b.privateIp })
};

