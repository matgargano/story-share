/**
 * Pinterest Test Cases:
 *   - Given all necessary parameters, the share URL will match expected
 *   - Given a `data-url` value of '{{current}}', the share URL will match expected
 *   - Given a missing `data-description` value, the share URL will match expected
 *   - Given a missing `data-url` value, the share will fail
 *   - Given a missing `data-media` value, the share will fail
 */

QUnit.module( "Pinterest" );

/**
 * Test Case: Given all necessary parameters, the share URL will match expected
 */
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'sharePinterest',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-media': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&media=' + encodeURIComponent(attributes['data-media']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given a `data-url` value of '{{current}}', the share URL will match expected
 */
QUnit.test(
    'Given a `data-url` value of \'{{current}}\', the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'sharePinterest',
        'data-type': 'pinterest',
        'data-url': '{{current}}',
        'data-media': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(url);
    expected += '&media=' + encodeURIComponent(attributes['data-media']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given a missing `data-description` value, the share URL will match expected
 */
QUnit.test(
    'Given a missing `data-description` value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'sharePinterestNoDescription',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-media': 'assets/Seattle_from_Kerry_Park.jpg'
    };

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&media=' + encodeURIComponent(attributes['data-media']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given `relativeMediaUrls = true`, the share URL will match expected
 */
QUnit.test(
    'Given `relativeMediaUrls = false`, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {relativeMediaUrls: true}
        attributes = {};

    attributes = {
        'class': 'sharePinterestRelativeMediaUrls',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-media': 'http://localhost:8000/tests/assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&media=' + encodeURIComponent(url + attributes['data-media']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given a mediaBaseUrl value, the share URL will match expected
 */
QUnit.test(
    'Given a mediaBaseUrl value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {mediaBaseUrl: '../', relativeMediaUrls: true}
        attributes = {};

    attributes = {
        'class': 'sharePinterestMediaBaseUrl',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-media': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&media=' + encodeURIComponent(plugin.options.mediaBaseUrl + attributes['data-media']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given `relativeMediaUrls = false` and a mediaBaseUrl value, mediaBaseUrl will be ignored
 */
QUnit.test(
    'Given `relativeMediaUrls = false` and a mediaBaseUrl value, mediaBaseUrl will be ignored',
    function(assert) {

    var anchor, plugin, expected,
        shareOptions = {relativeMediaUrls: false, mediaBaseUrl: '../'}
        attributes = {};

    attributes = {
        'class': 'sharePinterestRelativeMediaUrls',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-media': 'http://localhost:8000/tests/assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    plugin = returnPluginObject(attributes, shareOptions);
    plugin.generateSocialUrl();

    expected = 'https://pinterest.com/pin/create/button/';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&media=' + encodeURIComponent(attributes['data-media']);
    expected += '&description=' + encodeURIComponent(attributes['data-description']);

    assert.equal(plugin.socialUrl, expected, expected);

});


/**
 * Test Case: Given a missing `data-url` value, the share will fail
 */
QUnit.test(
    'Given a missing `data-url` value, the share will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failPinterestNoUrl',
        'data-type': 'pinterest',
        'data-media': 'assets/Seattle_from_Kerry_Park.jpg',
        'data-description': 'Pinned via storyShare'
    };

    plugin = returnPluginObject(attributes);

    expected = '[Story-Share] Missing url for ' + attributes['data-type'].replace('-', '_');

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
 * Test Case: Given a missing `data-media` value, the share will fail
 */
QUnit.test(
    'Given a missing `data-media` value, the share will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failPinterestNoMedia',
        'data-type': 'pinterest',
        'data-url': 'http://example.com/pinterest-share',
        'data-description': 'Pinned via storyShare'
    };

    plugin = returnPluginObject(attributes);

    expected = '[Story-Share] Missing media for ' + attributes['data-type'].replace('-', '_');

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
