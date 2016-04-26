var fs = require('fs');
var sinon = require('sinon');
var chrome = require('sinon-chrome');
var assert = require('chai').assert;
var jsdom = require('jsdom');

sinon.assert.expose(assert, {prefix: ''});

describe('background page', () => {
  var window;

  beforeEach((done) => {
    jsdom.env({
      html: '<html></html>',
      src: [fs.readFileSync('./background.js', 'utf8')],
      created: (err, wnd) => {
        wnd.chrome = chrome;
        chrome.hi = false;
        // wnd.hi = true;
        wnd.console = console;
      },
      done: (err, wnd) => {
        if (err) done(true);
        window = wnd;
        done();
      },
    });
  });

  afterEach(() => {
    chrome.reset();
    window.close();
  });

  it('should attach listeners on startup', () => {
    assert.calledOnce(chrome.runtime.onMessage.addListener);
  });

});