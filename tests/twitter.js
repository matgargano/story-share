/**
* Twitter Test Cases:
*   - Given all necessary parameters, the share URL will match expected
*   - Given a `data-url` value of '{{current}}', the share URL will match expected
*   - Given a missing `data-hashtags` value, the share URL will match expected
*   - Given a missing `data-text` value, the share URL will match expected
*   - Given a missing `data-url` value, the share will fail
*/

QUnit.module( "Twitter" );

/**
* Test Case: Given all necessary parameters, the share URL will match expected
*/
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareTwitter',
        'data-type': 'twitter',
        'data-url': 'http://example.com/twitter-share',
        'data-text': 'This is a tweet from storyShare',
        'data-hashtags': 'jQuery, Story, awesomeSauce',
        'data-via': 'icbinb'
    };

    expected = 'https://twitter.com/intent/tweet';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&text=' + encodeURIComponent(attributes['data-text']);
    expected += '&hashtags=' + encodeURIComponent(attributes['data-hashtags']);
    expected += '&via=' + encodeURIComponent(attributes['data-via']);

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
        'class': 'shareTwitter',
        'data-type': 'twitter',
        'data-url': '{{current}}',
        'data-text': 'This is a tweet from storyShare',
        'data-hashtags': 'jQuery, Story, awesomeSauce',
        'data-via': 'icbinb'
    };

    expected = 'https://twitter.com/intent/tweet';
    expected += '?url=' + encodeURIComponent(url);
    expected += '&text=' + encodeURIComponent(attributes['data-text']);
    expected += '&hashtags=' + encodeURIComponent(attributes['data-hashtags']);
    expected += '&via=' + encodeURIComponent(attributes['data-via']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given a missing `data-hashtags` value, the share URL will match expected
    */
QUnit.test(
    'Given a missing `data-hashtags` value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareTwitterNoHashtags',
        'data-type': 'twitter',
        'data-url': 'http://example.com/twitter-share',
        'data-text': 'This is a tweet from storyShare'
    };

    expected = 'https://twitter.com/intent/tweet';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&text=' + encodeURIComponent(attributes['data-text']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
* Test Case: Given a missing `data-text` value, the share URL will match expected
*/
QUnit.test(
    'Given a missing `data-text` value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareTwitterNoText',
        'data-type': 'twitter',
        'data-url': 'http://example.com/twitter-share',
        'data-hashtags': 'jQuery, Story, awesomeSauce'
    };

    expected = 'https://twitter.com/intent/tweet';
    expected += '?url=' + encodeURIComponent(attributes['data-url']);
    expected += '&hashtags=' + encodeURIComponent(attributes['data-hashtags']);

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
        'class': 'failTwitterNoUrl',
        'data-type': 'twitter',
        'data-text': 'This is a tweet from storyShare',
        'data-hashtags': 'jQuery, Story, awesomeSauce'
    };

    expected = '[Story-Share] Missing url for twitter';

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
