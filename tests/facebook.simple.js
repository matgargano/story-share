/**
* Facebook (simple) Test cases:
*   - Given all necessary parameters, the share URL will match expected
*   - Given a `data-url` value of '{{current}}', the share URL will match expected
*   - Given a missing `data-url` value, the share will fail
*/


QUnit.module( "Facebook (simple)" );

/**
* Test Case: Given all necessary parameters, the share URL will match expected
*/
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareFacebookSimple',
        'data-type': 'facebook-simple',
        'data-url': 'http://example.com/facebook-simple-share'
    };

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/sharer/sharer.php';
    expected += '?u=' + encodeURIComponent(attributes['data-url']);

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
        'class': 'shareFacebookSimple',
        'data-type': 'facebook-simple',
        'data-url': '{{current}}'
    };

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    expected = 'https://www.facebook.com/sharer/sharer.php';
    expected += '?u=' + encodeURIComponent(url);

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
        'class': 'failFacebookSimpleNoUrl',
        'data-type': 'facebook-simple'
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
