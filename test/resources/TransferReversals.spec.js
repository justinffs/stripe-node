'use strict';

var resources = require('../../lib/fusebill').resources;
var fusebill = require('../testUtils').getSpyableFusebill();
var expect = require('chai').expect;

var TRANSFER_TEST_ID = 'transferIdTest999';
var REVERSAL_TEST_ID = 'reversalIdTest999';

// Create new CustomerCard instance with pre-filled customerId:
var transferReversal = new resources.TransferReversals(
  fusebill,
  {transferId: TRANSFER_TEST_ID}
);

// Use spy from existing resource:
transferReversal._request = fusebill.customers._request;

describe('TransferReversal Resource', function() {
  describe('retrieve', function() {
    it('Sends the correct request', function() {
      transferReversal.retrieve(REVERSAL_TEST_ID);
      expect(fusebill.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/transfers/' + TRANSFER_TEST_ID + '/reversals/' + REVERSAL_TEST_ID,
        data: {},
        headers: {},
      });
    });
  });

  describe('create', function() {
    it('Sends the correct request', function() {
      transferReversal.create({
        amount: 100,
      });
      expect(fusebill.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/transfers/' + TRANSFER_TEST_ID + '/reversals',
        data: {amount: 100},
        headers: {},
      });
    });
  });

  describe('update', function() {
    it('Sends the correct request', function() {
      transferReversal.update(REVERSAL_TEST_ID, {
        metadata: {key: 'value'},
      });
      expect(fusebill.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/transfers/' + TRANSFER_TEST_ID + '/reversals/' + REVERSAL_TEST_ID,
        data: {metadata: {key: 'value'}},
        headers: {},
      });
    });
  });

  describe('list', function() {
    it('Sends the correct request', function() {
      transferReversal.list();
      expect(fusebill.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/transfers/' + TRANSFER_TEST_ID + '/reversals',
        data: {},
        headers: {},
      });
    });
  });
});

