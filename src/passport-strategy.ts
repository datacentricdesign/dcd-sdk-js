/**
 * Module dependencies.
 */
import * as util from 'util';
import {InternalOAuthError, OAuth2Strategy} from 'passport-oauth2';


/**
 * `Strategy` constructor.
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
export function PassportStrategy(options, verify) {
  options = options || {};

  if (!options.userProfileURL) {
    throw new TypeError('OAuth 2.0-based strategy ' +
      'requires a userProfileURL option');
  }

  OAuth2Strategy.call(this, options, verify);
  this._userProfileURL = options.userProfileURL;
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(PassportStrategy, OAuth2Strategy);


/**
 * Retrieve user profile.
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
PassportStrategy.prototype.userProfile = function (accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body) {
    // We can read the response in the 3rd param
    let json;

    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    const profile = parseProfile(json);
    profile['_raw'] = body;
    profile['_json'] = json;
    profile['token'] = accessToken;
    profile['id'] = json.sub;

    done(null, profile);
  });
};

/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @property {String} json.id
 * @property {String} json.name
 * @property {String} json.login
 * @property {String} json.html_url
 * @property {String} json.email
 *
 * @return {Object}
 * @api private
 */
function parseProfile(json) {
    if ('string' === typeof json) {
        json = JSON.parse(json);
    }

    const profile = {};
    profile['id'] = String(json.id);
    profile['displayName'] = json.name;
    profile['username'] = json.login;
    profile['profileUrl'] = json.html_url;
    if (json.email) {
        profile['emails'] = [{value: json.email}];
    }

    return profile;
}