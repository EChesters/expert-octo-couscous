describe("Parser", function() {
  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  it("should be able to retrieve the first given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"PrivateIpAddress":"172.31.15.172"}]}]}');
    expect(parser.objeto.privateIp).toEqual("172.31.15.172"); 
  });

  it("should be able to retrieve the second given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Bob": "woo", "PrivateIpAddress":"172.31.30.100"}]}]}');
    expect(parser.objeto.privateIp).toEqual("172.31.30.100");
  });

  it("should throw an error when NOT given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{ }]}]}');
    expect(parser.objeto.privateIp).toEqual("Not found"); 
  });

  it("should be able to retrieve the Tag value where key is 'name'", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Tags":[{"Value":"PCI247-euw1-DEPLOY","Key":"Name"}]}]}]}');
    expect(parser.objeto.environment).toEqual("PCI247-euw1-DEPLOY");
  });

  it("should be able to retrieve the Tag value where key is 'name'", function() {
    parser.parse('{"Reservations":[{"Instances":[{"Tags":[{"Value":"PUBLICAPI-euw1-DEPLOY","Key":"Name"},{"Value":"cog-euw1-iot-deploy-PUBLICAPI","Key":"aws:autoscaling:groupName"}]}]}]}');
    expect(parser.objeto.environment).toEqual("PUBLICAPI-euw1-DEPLOY");
  });

  // it("should be able to retrieve the Tag value where key contains 'name'", function() {
  //   parser.parse('{"Reservations":[{"Instances":[{"Tags":[{"Value":"JAMIE-euw1-DEPLOY","Key":"Name"}]}]}]}', "Jamie");
  //   expect(parser.objeto.environment).toEqual("JAMIE-euw1-DEPLOY");
  // });

});

