describe("Parser", function() {
  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  it("should be able to retrieve the first given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"PrivateIpAddress":"172.31.15.172"}]}]}');
    expect(parser.privateIp).toEqual("172.31.15.172"); 
  });

    it("should be able to retrieve the second given private IP address", function() {
    parser.parse('{"Reservations":[{"Instances":[{"PrivateIpAddress":"172.31.30.100"}]}]}');
    expect(parser.privateIp).toEqual("172.31.30.100"); 
  });

});
