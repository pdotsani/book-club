'use strict';

describe('Service: updateSettings', function () {

  // load the service's module
  beforeEach(module('bookClubApp'));

  // instantiate service
  var updateSettings;
  beforeEach(inject(function (_updateSettings_) {
    updateSettings = _updateSettings_;
  }));

  it('should do something', function () {
    expect(!!updateSettings).toBe(true);
  });

});
