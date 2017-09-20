/**
* Facebook (complex) Test Cases:
*   - Given all necessary parameters, the share URL will match expected
*   - Given a `data-link` value of '{{current}}', the share URL will match expected
*   - Given `relativeMediaUrls = true`, the share URL will match expected
*   - Given `relativeMediaUrls = true` and a mediaBaseUrl value, the share URL will match expected
*   - Given a missing `fbAppId` value, the share will fail
*   - Given a missing `data-link` value, the share will fail
*/


QUnit.module( "Facebook (complex)" );

/**
* Test Case: Given all necessary parameters, the share URL will match expected
*/
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148'}
        attributes = {};

    attributes = {
        'class': 'shareFacebookComplex',
        'data-type': 'facebook-complex',
        'data-link': 'http://example.com/facebook-complex-share',
        'data-picture': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-caption': 'This is just a test',
        'data-description': 'This was posted via storyShare',
        'data-name': 'My Facebook Complex Share Test'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/v2.3/dialog/feed';
    expected += '?app_id=' + plugin.options.fbAppId;
    expected += '&redirect_uri=' + encodeURIComponent(url) + '%23story_close_window';
    expected += '&link=' + encodeURIComponent(attributes['data-link']);
    expected += '&picture=' + encodeURIComponent(attributes['data-picture']);
    expected += '&caption=' + encodeURIComponent(attributes['data-caption']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);
    expected += '&name=' + encodeURIComponent(attributes['data-name']);
    expected += '&display=popup';

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given a `data-link` value of '{{current}}', the share URL will match expected
*/
QUnit.test(
    'Given a `data-link` value of \'{{current}}\', the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148'}
        attributes = {};

    attributes = {
        'class': 'shareFacebookComplex',
        'data-type': 'facebook-complex',
        'data-link': '{{current}}',
        'data-picture': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-caption': 'This is just a test',
        'data-description': 'This was posted via storyShare',
        'data-name': 'My Facebook Complex Share Test'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/v2.3/dialog/feed';
    expected += '?app_id=' + plugin.options.fbAppId;
    expected += '&redirect_uri=' + encodeURIComponent(url) + '%23story_close_window';
    expected += '&link=' + encodeURIComponent(url);
    expected += '&picture=' + encodeURIComponent(attributes['data-picture']);
    expected += '&caption=' + encodeURIComponent(attributes['data-caption']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);
    expected += '&name=' + encodeURIComponent(attributes['data-name']);
    expected += '&display=popup';

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given `relativeMediaUrls = false`, the share URL will match expected
*/
QUnit.test(
    'Given `relativeMediaUrls = true`, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148', relativeMediaUrls: true}
        attributes = {};

    attributes = {
        'class': 'shareFacebookComplexRelativeMediaUrls',
        'data-type': 'facebook-complex',
        'data-link': 'http://example.com/facebook-complex-share',
        'data-picture': 'http://localhost:8000/tests/assets/Seattle_from_Kerry_Park.jpg',
        'data-caption': 'This is just a test',
        'data-description': 'This was posted via storyShare',
        'data-name': 'My Facebook Complex Share Test'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/v2.3/dialog/feed';
    expected += '?app_id=' + plugin.options.fbAppId;
    expected += '&redirect_uri=' + encodeURIComponent(url) + '%23story_close_window';
    expected += '&link=' + encodeURIComponent(attributes['data-link']);
    expected += '&picture=' + encodeURIComponent(url + attributes['data-picture']);
    expected += '&caption=' + encodeURIComponent(attributes['data-caption']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);
    expected += '&name=' + encodeURIComponent(attributes['data-name']);
    expected += '&display=popup';

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given a mediaBaseUrl value, the share URL will match expected
*/
QUnit.test(
    'Given a mediaBaseUrl value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148', relativeMediaUrls: true, mediaBaseUrl: '../'}
        attributes = {};

    attributes = {
        'class': 'shareFacebookComplexMediaBaseUrl',
        'data-type': 'facebook-complex',
        'data-link': 'http://example.com/facebook-complex-share',
        'data-picture': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-caption': 'This is just a test',
        'data-description': 'This was posted via storyShare',
        'data-name': 'My Facebook Complex Share Test'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/v2.3/dialog/feed';
    expected += '?app_id=' + plugin.options.fbAppId;
    expected += '&redirect_uri=' + encodeURIComponent(url) + '%23story_close_window';
    expected += '&link=' + encodeURIComponent(attributes['data-link']);
    expected += '&picture=' + encodeURIComponent(plugin.options.mediaBaseUrl) + encodeURIComponent(attributes['data-picture']);
    expected += '&caption=' + encodeURIComponent(attributes['data-caption']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);
    expected += '&name=' + encodeURIComponent(attributes['data-name']);
    expected += '&display=popup';

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given `relativeMediaUrls = false` and a mediaBaseUrl value, mediaBaseUrl will be ignored
*/
QUnit.test(
    'Given `relativeMediaUrls = false` and a mediaBaseUrl value, mediaBaseUrl will be ignored',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148', relativeMediaUrls: false, mediaBaseUrl: '../'}
        attributes = {};

    attributes = {
        'class': 'shareFacebookComplexMediaBaseUrl',
        'data-type': 'facebook-complex',
        'data-link': 'http://example.com/facebook-complex-share',
        'data-picture': 'http://localhost:8000/tests/assets/Seattle_from_Kerry_Park.jpg',
        'data-caption': 'This is just a test',
        'data-description': 'This was posted via storyShare',
        'data-name': 'My Facebook Complex Share Test'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/v2.3/dialog/feed';
    expected += '?app_id=' + plugin.options.fbAppId;
    expected += '&redirect_uri=' + encodeURIComponent(url) + '%23story_close_window';
    expected += '&link=' + encodeURIComponent(attributes['data-link']);
    expected += '&picture=' + encodeURIComponent(attributes['data-picture']);
    expected += '&caption=' + encodeURIComponent(attributes['data-caption']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);
    expected += '&name=' + encodeURIComponent(attributes['data-name']);
    expected += '&display=popup';

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given a missing `fbAppId` value, the share will fail
*/

QUnit.test(
    'Given a missing `fbAppId` value, the share will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failFacebookComplexNoAppId',
        'data-type': 'facebook-complex',
        'data-link': 'http://example.com/facebook-complex-share',
        'data-name': 'My Facebook Complex Share Test',
        'data-description': 'This was posted via storyShare',
        'data-caption': 'This is just a test'
    };

    expected = '[Story-Share] Missing fbAppId for ' + attributes['data-type'].replace('-', '_');

    plugin = returnPluginObject(attributes);

    assert.throws(
        function() {
            plugin.generateSocialUrl();
        },
        function(err) {
            // Must evaluate to true
            return err === expected;
        },
        expected
    );

});

/**
* Test Case: Given a missing `data-link` value, the share will fail
*/

QUnit.test(
    'Given a missing `data-link` value, the share will fail',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {fbAppId: '815164228572148'},
        attributes = {};

    attributes = {
        'class': 'failFacebookComplexNoLink',
        'data-type': 'facebook-complex',
        'data-name': 'My Facebook Complex Share Test',
        'data-description': 'This was posted via storyShare',
        'data-caption': 'This is just a test'
    };

    expected = '[Story-Share] Missing link for ' + attributes['data-type'].replace('-', '_');

    plugin = returnPluginObject(attributes);

    assert.throws(
        function() {
            plugin.generateSocialUrl();
        },
        function(err) {
            // Must evaluate to true
            return err === expected;
        },
        expected
    );

});
