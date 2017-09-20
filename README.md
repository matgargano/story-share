Story Share jQuery Plugin
==================================================


`Version 0.1.1`

This jQuery plugin allows you to share pages on `twitter`, `facebook`, `google plus`, `linkedin` and `pinterest.` This plugin is fully customizable and can be extended to accept other sharing services.

How to Use
--------------------------------------

Include `jquery.story.share.min.js` in your project as you would any jquery plugin.

Create anchor elements with an `href="#"` and data attributes corresponding to the necessary attributes (see below for a run down), for example, for twitter:

```html
<a href="#" class="share" data-type="twitter" data-url="http://urltoshare.com" data-text="text to share" data-hashtags="comma,delimited,hashtags">
```

As of 0.1.0, the share URL can be set dynamically by setting the `data-url` for any service (for facebook complex it is `data-link`) to `{{current}}`, so the above example would be:

```html
<a href="#" class="share" data-type="twitter" data-url="{{current}}" data-text="text to share" data-hashtags="comma,delimited,hashtags">
```
Then, instantiate the storyShare plugin on your anchor html elements.

```javascript
jQuery(document).ready(function(){
    $('a.share').storyShare();
});
```


Options
---
The plugin exposes a host of top level options that are globally bound, not bound to a single service.

####fbAppId
_required if you want to use `facebook-complex` sharing_

You must pass in your Facebook Application ID if you wish to use `facebook-complex`, which aims to allow customized Facebook shares. This application must be bound to the URL from which you are ultimately using this share plugin.

####windowHeight
_default: 500_

The window height of the popup; do not touch unless you have a good reason to.

####windowWidth
_default: 300_

The window width of the popup; do not touch unless you have a good reason to.

####relativeMediaUrls
_default: false_

Set this to false if you want to set the media URLs absolutely. As of 0.1.0, this is `data-media` for pinterest and `data-picture` for facebook complex.

####mediaBaseUrl
_default: current URL with any hashes removed_

This is only used if `relativeMediaUrls` is set to true. The default should suffice most conditions but if you want to manually override it, set this here.


```javascript
// Example of passing a mediaBaseUrl value
jQuery(document).ready(function(){
    $('a.share').storyShare({
        mediaBaseUrl: '../assets/'
    });
});

```




Sharing Services
===


Facebook (Simple)
---
Facebook's most basic sharing feature provides the ability to share only a URL. Facebook will then use the [opengraph](http://ogp.me/) protocol. See this [article from David Walsh](http://davidwalsh.name/facebook-meta-tags) for more information on using the open graph protocol. This is different from the other included services as the basic sharing feature does not provide the ability to customize share text, so there is a limited number of required data attributes on the anchor tag.

* `data-type` => `facebook-simple` *always*
* `data-url` => `http://example.com`

Example:

```html
<a href="#" class="share" data-type="facebook-simple" data-url="http://foobar.com">Click to Share on Facebook</a>
```

Facebook (Complex)
---
Facebook's `dialog/feed` endpoint gives us a more custom share experience. The only caveat is that a Facebook Application ID must be provided (typically it will be done in the instantiation of the plugin, see below for an example).

For any of these data attributes, or for more information, refer to [Facebook's documentation](https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.3) for this API endpoint.

* `data-type` => `facebook-complex` *always*
* `data-redirect_uri` => You should only change this if you need to. Because the `dialog/feed` endpoint requires a redirect that will send the user to a specific page, we are simply redirecting to the same page with a hashbag added to the end of the URL, for which this plugin has a handler to close the window when redirecting.
* `data-picture` => `image.jpg`
* `data-caption` => `Ready for Isomorphic Javascript?`
* `data-link` => `http://example.com/isomorphic-javascript`
* `data-source` => From Facebook's documentation: The URL of a media file (either SWF or MP3) attached to this post. If SWF, you must also specify picture to provide a thumbnail for the video.
* `data-name` => From Facebook's documentation: The name of the link attachment.
* `data-description` => `The latest article from my blog that discusses isomorphic javascript.`
* `data-properties` => From Facebook's documentation: A JSON object of key/value pairs which will appear in the stream attachment beneath the description, with each property on its own line. Keys must be strings, and values can be either strings or JSON objects with the keys text and href.
* `data-actions` => From Facebook's documentation: A JSON array containing a single object describing the action link which will appear next to the 'Comment' and 'Like' link under posts. The contained object must have the keys name and link.
* `data-ref` => From Facebook's documentation: This argument is a comma-separated list, consisting of at most 5 distinct items, each of length at least 1 and at most 15 characters drawn from the set '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'. Each category is used in Facebook Insights to help you measure the performance of different types of post

Example:

In the header:

```javascript
jQuery(document).ready(function () {
  $('a.share').storyShare({
    fbAppId: 123456789012345,
  });
});
```

In the body:


```html
 <a class="share" data-name="Isomorphic Javascript" data-link="http://example.com/isomorphic-javascript" data-description="The latest article from my blog that discusses isomorphic javascript." data-type="facebook-complex" data-picture="image.jpg" data-caption="Ready for Isomorphic JavaScript?" href="#">Share on Facebook</a>
```


Twitter
---
Sharing with twitter is more straight forward; here are the data attributes:

* `data-type` => `twitter` *always*
* `data-url` => `http://example.com`
* `data-text` => `Isomorphic JavaScript, is this our future?`
* `data-hashtags` => `js,isomorphism` this is optional and it would be comma delimited
* `data-via` => `twitterdev` A Twitter username to associate with the Tweet, such as your site’s Twitter account. The provided username will be appended to the end of the Tweet with the text "via @username".

Example:

```html
<a href="#" class="share" data-type="twitter" data-url="http://example.com" data-text="Isomorphic JavaScript, is this our future?" data-hashtags="js,isomorphism" data-via="twitter-dev">Click to Share on Twitter</a>
```

Google Plus
---
Like Facebook, Google uses opengraph tags for sharing so there is a limited number of required data attributes on the anchor element:

* `data-type` => `google-plus` *always*
* `data-url` => `http://example.com`

Example:

```html
<a href="#" class="share" data-type="google-plus" data-url="http://example.com">Click to Share on Google Plus</a>
```

LinkedIn
---
Sharing with LinkedIn accepts the following data attributes:

* `data-type` => `linkedin` *always*
* `data-url` => `http://example.com`
* `data-title` => `Isomorphic JavaScript, is this our future?`
* `data-source` => `My Shiny Blog` (optional)
* `data-summary` => `The latest article from my blog that discusses isomorphic javascript` (optional)

Example:

```html
<a href="#" class="share" data-type="linkedin" data-url="http://example" data-source="My Shiny Blog" data-title="Isomorphic JavaScript, is this our future?" data-summary="The latest article from my blog that discusses isomorphic javascript">Click to Share on LinkedIn</a>
```

Pinterest
---
Sharing with Pinterest accepts the following data attributes:

* `data-type` => `pinterest` *always*
* `data-url` => `http://example.com`
* `data-media` => `image.jpg`
* `data-description` => `Isomorphic JavaScript, is this our future?` (optional)


Example:

```html
<a href="#" class="share" data-type="pinterest" data-url="http://foobar.com" data-description="My Shiny Blog" data-media="image.jpg">Click to Share on Pinterest</a>
```

Release Notes

* 0.0.3
Updated `facebook-complex` to use v2.3 of the API

* 0.1.0
Updated to allow media urls to be prefixed with a base URL.
Updated to allow {{current}} in `data-url` (or `data-link` for Facebook Complex) to act as a placeholder for the current URL

* 0.1.1
Updated relativeMediaUrls to default to false
Added via setting to Twitter share

* 0.1.2
Integrated QUnit tests into grunt task
Remove `title` from `facebook-complex` share type  since it is not an actual field in the API



