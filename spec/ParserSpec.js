describe("Parser", function() {
  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  it("should be able to retrieve the first given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"PrivateIpAddress":"172.31.15.172"}]}]}');
    expect(parser.objeto[0].privateIp).toEqual("172.31.15.172"); 
  });

  it("should be able to retrieve the second given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Bob": "woo", "PrivateIpAddress":"172.31.30.100"}]}]}');
    expect(parser.objeto[0].privateIp).toEqual("172.31.30.100");
  });

  it("should throw an error when NOT given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{ }]}]}');
    expect(parser.objeto[0].privateIp).toEqual("Not found"); 
  });

  it("should be able to retrieve the Tag value where key is 'name'", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Tags":[{"Value":"PCI247-euw1-DEPLOY","Key":"Name"}]}]}]}');
    expect(parser.objeto[0].environment).toEqual("PCI247-euw1-DEPLOY");
  });

  it("should be able to retrieve the Tag value where key is 'name'", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Tags":[{"Value":"PUBLICAPI-euw1-DEPLOY","Key":"Name"},{"Value":"cog-euw1-iot-deploy-PUBLICAPI","Key":"aws:autoscaling:groupName"}]}]}]}');
    expect(parser.objeto[0].environment).toEqual("PUBLICAPI-euw1-DEPLOY");
  });

  it("should be able to retrieve the Tag value where key contains 'name'", function() {
  	var json = '{"Reservations":[{"Instances":[{' +
  					'"PrivateIpAddress":"172.31.15.172",' +
  					'"Tags":[{"Value":"PUBLICAPI-euw1-DEPLOY","Key":"Name"},' +
  							'{"Value":"cog-euw1-iot-deploy-PUBLICAPI","Key":"aws:autoscaling:groupName"}]},' +
  					'{"PrivateIpAddress":"172.31.86.200",' +
  					'"Tags":[{"Value":"JAMIE-euw1-DEPLOY","Key":"Name"},' +
  							'{"Value":"cog-euw1-iot-deploy-JAMIEAPI","Key":"aws:autoscaling:groupName"}]}]}]}'

    parser.parse(json, "Jamie");
    expect(parser.objeto[0].environment).toEqual("JAMIE-euw1-DEPLOY");
  });


  it("should retrieve environments in alphabetical order", function() {
  	var json = '{"Reservations":[{"Instances":[{' +
  					'"PrivateIpAddress":"172.31.15.172",' +
  					'"Tags":[{"Value":"PUBLICAPI-euw1-DEPLOY","Key":"Name"},' +
  							'{"Value":"cog-euw1-iot-deploy-PUBLICAPI","Key":"aws:autoscaling:groupName"}]},' +
  					'{"PrivateIpAddress":"172.31.86.200",' +
  					'"Tags":[{"Value":"JAMIE-euw1-DEPLOY","Key":"Name"},' +
  							'{"Value":"cog-euw1-iot-deploy-JAMIEAPI","Key":"aws:autoscaling:groupName"}]}]}]}'

    parser.parse(json);

    var obj1 = new Object()
    obj1.privateIp = "172.31.86.200"
    obj1.environment = "JAMIE-euw1-DEPLOY"

    var obj2 = new Object()
    obj2.privateIp = "172.31.15.172"
    obj2.environment = "PUBLICAPI-euw1-DEPLOY"

    expect([obj1,obj2]).toEqual(parser.objeto);

  });

});
