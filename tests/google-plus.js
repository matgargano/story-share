/**
 * Google Plus Test Cases:
 *   - Given all necessary parameters, the share URL will match expected
 *   - Given a `data-url` value of '{{current}}', the share URL will match expected
 *   - Given a missing `data-url` value, the share will fail
 */

QUnit.module( "Google Plus" );

/**
 * Test Case: Given all necessary parameters, the share URL will match expected
 */
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareGooglePlus',
        'data-type': 'google-plus',
        'data-url': 'http://example.com/google-plus-share'
    };

    expected = 'https://plus.google.com/share';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);

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
        'class': 'shareGooglePlus',
        'data-type': 'google-plus',
        'data-url': '{{current}}'
    };

    expected = 'https://plus.google.com/share';
    expected += '?url=' + encodeURIComponent(url);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

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
        'class': 'failGooglePlusNoUrl',
        'data-type': 'google-plus'
    };

    expected = '[Story-Share] Missing url for ' + attributes['data-type'].replace('-', '_');

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
