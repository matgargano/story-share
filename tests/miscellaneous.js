/**
* Miscellaneous Test Cases:
*   - Given a missing `data-type` value, storyShare will fail
*   - Given an unsupported `data-type` value, storyShare will fail
*/

QUnit.module( "Miscellaneous" );

/**
* Test Case: Given a missing `data-type` value, storyShare will fail
*/
QUnit.test(
    'Given a missing `data-type` value, storyShare will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failNoShareType',
        'data-url': 'http://example.com/fail-no-share'
    };

    // This should be a ReferenceError thrown by storyShare
    expected = '[Story-Share] The data-type attribute is required'

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
* Test Case: Given an unsupported `data-type` value, storyShare will fail
*/
QUnit.test(
    'Given an unsupported `data-type` value, storyShare will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failUnsupportedShareType',
        'data-type': 'foo-bar',
        'data-url': 'http://example.com/incorrect-share'
    };

    // This should be a TypeError thrown by storyShare
    expected = '[Story-Share] Type ' + attributes['data-type'].replace('-', '_') + ' is not supported';

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
