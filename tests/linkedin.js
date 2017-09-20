/**
 * LinkedIn Test Cases:
 *   - Given all necessary parameters, the share URL will match expected
 *   - Given a `data-url` value of '{{current}}', the share URL will match expected
 *   - Given a missing `data-source` value, the share URL will match expected
 *   - Given a missing `data-summary` value, the share URL will match expected
 *   - Given a missing `data-url` value, the share will fail
 *   - Given a missing `data-title` value, the share will fail
 */

QUnit.module( "LinkedIn" );

/**
 * Test Case: Given all necessary parameters, the share URL will match expected
 */
QUnit.test(
    'Given all necessary parameters, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareLinkedIn',
        'data-type': 'linkedin',
        'data-title': 'My LinkedIn Share Test',
        'data-url': 'http://example.com/linkedin-share',
        'data-source': 'LinkedIn Lovers Blog',
        'data-summary': 'Shared to LinkedIn via storyShare'
    };

    expected = 'http://www.linkedin.com/shareArticle';
    expected += '?mini=true&url=' + encodeURIComponent(attributes['data-url']);
    expected += '&source=' + encodeURIComponent(attributes['data-source']);
    expected += '&title=' + encodeURIComponent(attributes['data-title']);
    expected += '&summary=' + encodeURIComponent(attributes['data-summary']);

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
        'class': 'shareLinkedIn',
        'data-type': 'linkedin',
        'data-title': 'My LinkedIn Share Test',
        'data-url': '{{current}}',
        'data-source': 'LinkedIn Lovers Blog',
        'data-summary': 'Shared to LinkedIn via storyShare'
    };

    expected = 'http://www.linkedin.com/shareArticle';
    expected += '?mini=true&url=' + encodeURIComponent(url);
    expected += '&source=' + encodeURIComponent(attributes['data-source']);
    expected += '&title=' + encodeURIComponent(attributes['data-title']);
    expected += '&summary=' + encodeURIComponent(attributes['data-summary']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given a missing `data-source` value, the share URL will match expected
 */
QUnit.test(
    'Given a missing `data-source` value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareLinkedInNoSource',
        'data-type': 'linkedin',
        'data-title': 'My LinkedIn Share Test',
        'data-url': 'http://example.com/linkedin-share',
        'data-summary': 'Shared to LinkedIn via storyShare'
    };

    expected = 'http://www.linkedin.com/shareArticle';
    expected += '?mini=true&url=' + encodeURIComponent(attributes['data-url']);
    expected += '&title=' + encodeURIComponent(attributes['data-title']);
    expected += '&summary=' + encodeURIComponent(attributes['data-summary']);

    plugin = returnPluginObject(attributes);
    plugin.generateSocialUrl();

    assert.equal(plugin.socialUrl, expected, expected);

});

/**
 * Test Case: Given a missing `data-summary` value, the share URL will match expected
 */
QUnit.test(
    'Given a missing `data-summary` value, the share URL will match expected',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'shareLinkedInNosummary',
        'data-type': 'linkedin',
        'data-title': 'My LinkedIn Share Test',
        'data-url': 'http://example.com/linkedin-share',
        'data-source': 'LinkedIn Lovers Blog'
    };

    expected = 'http://www.linkedin.com/shareArticle';
    expected += '?mini=true&url=' + encodeURIComponent(attributes['data-url']);
    expected += '&source=' + encodeURIComponent(attributes['data-source']);
    expected += '&title=' + encodeURIComponent(attributes['data-title']);

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
        'class': 'failLinkedInNoUrl',
        'data-type': 'linkedin',
        'data-title': 'My LinkedIn Share Test',
        'data-source': 'LinkedIn Lovers Blog',
        'data-summary': 'Shared to LinkedIn via storyShare'
    };

    expected = '[Story-Share] Missing url for linkedin';

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
 * Test Case: Given a missing `data-title` value, the share will fail
 */
QUnit.test(
    'Given a missing `data-title` value, the share will fail',
    function(assert) {

    var anchor, plugin, expected,
        attributes = {};

    attributes = {
        'class': 'failLinkedInNotitle',
        'data-type': 'linkedin',
        'data-url': 'http://example.com/linkedin-share',
        'data-source': 'LinkedIn Lovers Blog',
        'data-summary': 'Shared to LinkedIn via storyShare'
    };

    expected = '[Story-Share] Missing title for linkedin';

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
