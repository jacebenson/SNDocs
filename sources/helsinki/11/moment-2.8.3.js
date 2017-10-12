/*! RESOURCE: /scripts/moment-2.8.3.js */
(function(undefined) {
  var moment,
    VERSION = '2.8.3',
    globalScope = typeof global !== 'undefined' ? global : this,
    oldGlobalMoment,
    round = Math.round,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    i,
    YEAR = 0,
    MONTH = 1,
    DATE = 2,
    HOUR = 3,
    MINUTE = 4,
    SECOND = 5,
    MILLISECOND = 6,
    locales = {},
    momentProperties = [],
    hasModule = (typeof module !== 'undefined' && module.exports),
    aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
    aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
    isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
    formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
    localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
    parseTokenOneOrTwoDigits = /\d\d?/,
    parseTokenOneToThreeDigits = /\d{1,3}/,
    parseTokenOneToFourDigits = /\d{1,4}/,
    parseTokenOneToSixDigits = /[+\-]?\d{1,6}/,
    parseTokenDigits = /\d+/,
    parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
    parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi,
    parseTokenT = /T/i,
    parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/,
    parseTokenOrdinal = /\d{1,2}/,
    parseTokenOneDigit = /\d/,
    parseTokenTwoDigits = /\d\d/,
    parseTokenThreeDigits = /\d{3}/,
    parseTokenFourDigits = /\d{4}/,
    parseTokenSixDigits = /[+-]?\d{6}/,
    parseTokenSignedNumber = /[+-]?\d+/,
    isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',
    isoDates = [
      ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
      ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
      ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
      ['GGGG-[W]WW', /\d{4}-W\d{2}/],
      ['YYYY-DDD', /\d{4}-\d{3}/]
    ],
    isoTimes = [
      ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
      ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
      ['HH:mm', /(T| )\d\d:\d\d/],
      ['HH', /(T| )\d\d/]
    ],
    parseTimezoneChunker = /([\+\-]|\d\d)/gi,
    proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
    unitMillisecondFactors = {
      'Milliseconds': 1,
      'Seconds': 1e3,
      'Minutes': 6e4,
      'Hours': 36e5,
      'Days': 864e5,
      'Months': 2592e6,
      'Years': 31536e6
    },
    unitAliases = {
      ms: 'millisecond',
      s: 'second',
      m: 'minute',
      h: 'hour',
      d: 'day',
      D: 'date',
      w: 'week',
      W: 'isoWeek',
      M: 'month',
      Q: 'quarter',
      y: 'year',
      DDD: 'dayOfYear',
      e: 'weekday',
      E: 'isoWeekday',
      gg: 'weekYear',
      GG: 'isoWeekYear'
    },
    camelFunctions = {
      dayofyear: 'dayOfYear',
      isoweekday: 'isoWeekday',
      isoweek: 'isoWeek',
      weekyear: 'weekYear',
      isoweekyear: 'isoWeekYear'
    },
    formatFunctions = {},
    relativeTimeThresholds = {
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11
    },
    ordinalizeTokens = 'DDD w W M D d'.split(' '),
    paddedTokens = 'M D H h m s w W'.split(' '),
    formatTokenFunctions = {
      M: function() {
        return this.month() + 1;
      },
      MMM: function(format) {
        return this.localeData().monthsShort(this, format);
      },
      MMMM: function(format) {
        return this.localeData().months(this, format);
      },
      D: function() {
        return this.date();
      },
      DDD: function() {
        return this.dayOfYear();
      },
      d: function() {
        return this.day();
      },
      dd: function(format) {
        return this.localeData().weekdaysMin(this, format);
      },
      ddd: function(format) {
        return this.localeData().weekdaysShort(this, format);
      },
      dddd: function(format) {
        return this.localeData().weekdays(this, format);
      },
      w: function() {
        return this.week();
      },
      W: function() {
        return this.isoWeek();
      },
      YY: function() {
        return leftZeroFill(this.year() % 100, 2);
      },
      YYYY: function() {
        return leftZeroFill(this.year(), 4);
      },
      YYYYY: function() {
        return leftZeroFill(this.year(), 5);
      },
      YYYYYY: function() {
        var y = this.year(),
          sign = y >= 0 ? '+' : '-';
        return sign + leftZeroFill(Math.abs(y), 6);
      },
      gg: function() {
        return leftZeroFill(this.weekYear() % 100, 2);
      },
      gggg: function() {
        return leftZeroFill(this.weekYear(), 4);
      },
      ggggg: function() {
        return leftZeroFill(this.weekYear(), 5);
      },
      GG: function() {
        return leftZeroFill(this.isoWeekYear() % 100, 2);
      },
      GGGG: function() {
        return leftZeroFill(this.isoWeekYear(), 4);
      },
      GGGGG: function() {
        return leftZeroFill(this.isoWeekYear(), 5);
      },
      e: function() {
        return this.weekday();
      },
      E: function() {
        return this.isoWeekday();
      },
      a: function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), true);
      },
      A: function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), false);
      },
      H: function() {
        return this.hours();
      },
      h: function() {
        return this.hours() % 12 || 12;
      },
      m: function() {
        return this.minutes();
      },
      s: function() {
        return this.seconds();
      },
      S: function() {
        return toInt(this.milliseconds() / 100);
      },
      SS: function() {
        return leftZeroFill(toInt(this.milliseconds() / 10), 2);
      },
      SSS: function() {
        return leftZeroFill(this.milliseconds(), 3);
      },
      SSSS: function() {
        return leftZeroFill(this.milliseconds(), 3);
      },
      Z: function() {
        var a = -this.zone(),
          b = '+';
        if (a < 0) {
          a = -a;
          b = '-';
        }
        return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
      },
      ZZ: function() {
        var a = -this.zone(),
          b = '+';
        if (a < 0) {
          a = -a;
          b = '-';
        }
        return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
      },
      z: function() {
        return this.zoneAbbr();
      },
      zz: function() {
        return this.zoneName();
      },
      X: function() {
        return this.unix();
      },
      Q: function() {
        return this.quarter();
      }
    },
    deprecations = {},
    lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

  function dfl(a, b, c) {
    switch (arguments.length) {
      case 2:
        return a != null ? a : b;
      case 3:
        return a != null ? a : b != null ? b : c;
      default:
        throw new Error('Implement me');
    }
  }

  function hasOwnProp(a, b) {
    return hasOwnProperty.call(a, b);
  }

  function defaultParsingFlags() {
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false
    };
  }

  function printMsg(msg) {
    if (moment.suppressDeprecationWarnings === false &&
      typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function() {
      if (firstTime) {
        printMsg(msg);
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }

  function deprecateSimple(name, msg) {
    if (!deprecations[name]) {
      printMsg(msg);
      deprecations[name] = true;
    }
  }

  function padToken(func, count) {
    return function(a) {
      return leftZeroFill(func.call(this, a), count);
    };
  }

  function ordinalizeToken(func, period) {
    return function(a) {
      return this.localeData().ordinal(func.call(this, a), period);
    };
  }
  while (ordinalizeTokens.length) {
    i = ordinalizeTokens.pop();
    formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
  }
  while (paddedTokens.length) {
    i = paddedTokens.pop();
    formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
  }
  formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);

  function Locale() {}

  function Moment(config, skipOverflow) {
    if (skipOverflow !== false) {
      checkOverflow(config);
    }
    copyConfig(this, config);
    this._d = new Date(+config._d);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
      years = normalizedInput.year || 0,
      quarters = normalizedInput.quarter || 0,
      months = normalizedInput.month || 0,
      weeks = normalizedInput.week || 0,
      days = normalizedInput.day || 0,
      hours = normalizedInput.hour || 0,
      minutes = normalizedInput.minute || 0,
      seconds = normalizedInput.second || 0,
      milliseconds = normalizedInput.millisecond || 0;
    this._milliseconds = +milliseconds +
      seconds * 1e3 +
      minutes * 6e4 +
      hours * 36e5;
    this._days = +days +
      weeks * 7;
    this._months = +months +
      quarters * 3 +
      years * 12;
    this._data = {};
    this._locale = moment.localeData();
    this._bubble();
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }
    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }
    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }
    return a;
  }

  function copyConfig(to, from) {
    var i, prop, val;
    if (typeof from._isAMomentObject !== 'undefined') {
      to._isAMomentObject = from._isAMomentObject;
    }
    if (typeof from._i !== 'undefined') {
      to._i = from._i;
    }
    if (typeof from._f !== 'undefined') {
      to._f = from._f;
    }
    if (typeof from._l !== 'undefined') {
      to._l = from._l;
    }
    if (typeof from._strict !== 'undefined') {
      to._strict = from._strict;
    }
    if (typeof from._tzm !== 'undefined') {
      to._tzm = from._tzm;
    }
    if (typeof from._isUTC !== 'undefined') {
      to._isUTC = from._isUTC;
    }
    if (typeof from._offset !== 'undefined') {
      to._offset = from._offset;
    }
    if (typeof from._pf !== 'undefined') {
      to._pf = from._pf;
    }
    if (typeof from._locale !== 'undefined') {
      to._locale = from._locale;
    }
    if (momentProperties.length > 0) {
      for (i in momentProperties) {
        prop = momentProperties[i];
        val = from[prop];
        if (typeof val !== 'undefined') {
          to[prop] = val;
        }
      }
    }
    return to;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }

  function leftZeroFill(number, targetLength, forceSign) {
    var output = '' + Math.abs(number),
      sign = number >= 0;
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return (sign ? (forceSign ? '+' : '') : '-') + output;
  }

  function positiveMomentsDifference(base, other) {
    var res = {
      milliseconds: 0,
      months: 0
    };
    res.months = other.month() - base.month() +
      (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }
    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
    return res;
  }

  function momentsDifference(base, other) {
    var res;
    other = makeAs(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }
    return res;
  }

  function createAdder(direction, name) {
    return function(val, period) {
      var dur, tmp;
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
        tmp = val;
        val = period;
        period = tmp;
      }
      val = typeof val === 'string' ? +val : val;
      dur = moment.duration(val, period);
      addOrSubtractDurationFromMoment(this, dur, direction);
      return this;
    };
  }

  function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
      days = duration._days,
      months = duration._months;
    updateOffset = updateOffset == null ? true : updateOffset;
    if (milliseconds) {
      mom._d.setTime(+mom._d + milliseconds * isAdding);
    }
    if (days) {
      rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
    }
    if (months) {
      rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
      moment.updateOffset(mom, days || months);
    }
  }

  function isArray(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  }

  function isDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]' ||
      input instanceof Date;
  }

  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
      lengthDiff = Math.abs(array1.length - array2.length),
      diffs = 0,
      i;
    for (i = 0; i < len; i++) {
      if ((dontConvert && array1[i] !== array2[i]) ||
        (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
        diffs++;
      }
    }
    return diffs + lengthDiff;
  }

  function normalizeUnits(units) {
    if (units) {
      var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
      units = unitAliases[units] || camelFunctions[lowered] || lowered;
    }
    return units;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
      normalizedProp,
      prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }
    return normalizedInput;
  }

  function makeList(field) {
    var count, setter;
    if (field.indexOf('week') === 0) {
      count = 7;
      setter = 'day';
    } else if (field.indexOf('month') === 0) {
      count = 12;
      setter = 'month';
    } else {
      return;
    }
    moment[field] = function(format, index) {
      var i, getter,
        method = moment._locale[field],
        results = [];
      if (typeof format === 'number') {
        index = format;
        format = undefined;
      }
      getter = function(i) {
        var m = moment().utc().set(setter, i);
        return method.call(moment._locale, m, format || '');
      };
      if (index != null) {
        return getter(index);
      } else {
        for (i = 0; i < count; i++) {
          results.push(getter(i));
        }
        return results;
      }
    };
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
      value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      if (coercedNumber >= 0) {
        value = Math.floor(coercedNumber);
      } else {
        value = Math.ceil(coercedNumber);
      }
    }
    return value;
  }

  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }

  function weeksInYear(year, dow, doy) {
    return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
  }

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function checkOverflow(m) {
    var overflow;
    if (m._a && m._pf.overflow === -2) {
      overflow =
        m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
        m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
        m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
        m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
        m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
        m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
        -1;
      if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }
      m._pf.overflow = overflow;
    }
  }

  function isValid(m) {
    if (m._isValid == null) {
      m._isValid = !isNaN(m._d.getTime()) &&
        m._pf.overflow < 0 &&
        !m._pf.empty &&
        !m._pf.invalidMonth &&
        !m._pf.nullInput &&
        !m._pf.invalidFormat &&
        !m._pf.userInvalidated;
      if (m._strict) {
        m._isValid = m._isValid &&
          m._pf.charsLeftOver === 0 &&
          m._pf.unusedTokens.length === 0;
      }
    }
    return m._isValid;
  }

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  }

  function chooseLocale(names) {
    var i = 0,
      j, next, locale, split;
    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;
      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));
        if (locale) {
          return locale;
        }
        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
          break;
        }
        j--;
      }
      i++;
    }
    return null;
  }

  function loadLocale(name) {
    var oldLocale = null;
    if (!locales[name] && hasModule) {
      try {
        oldLocale = moment.locale();
        require('./locale/' + name);
        moment.locale(oldLocale);
      } catch (e) {}
    }
    return locales[name];
  }

  function makeAs(input, model) {
    return model._isUTC ? moment(input).zone(model._offset || 0) :
      moment(input).local();
  }
  extend(Locale.prototype, {
    set: function(config) {
      var prop, i;
      for (i in config) {
        prop = config[i];
        if (typeof prop === 'function') {
          this[i] = prop;
        } else {
          this['_' + i] = prop;
        }
      }
    },
    _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    months: function(m) {
      return this._months[m.month()];
    },
    _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    monthsShort: function(m) {
      return this._monthsShort[m.month()];
    },
    monthsParse: function(monthName) {
      var i, mom, regex;
      if (!this._monthsParse) {
        this._monthsParse = [];
      }
      for (i = 0; i < 12; i++) {
        if (!this._monthsParse[i]) {
          mom = moment.utc([2000, i]);
          regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
          this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    },
    _weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdays: function(m) {
      return this._weekdays[m.day()];
    },
    _weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysShort: function(m) {
      return this._weekdaysShort[m.day()];
    },
    _weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    weekdaysMin: function(m) {
      return this._weekdaysMin[m.day()];
    },
    weekdaysParse: function(weekdayName) {
      var i, mom, regex;
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
      }
      for (i = 0; i < 7; i++) {
        if (!this._weekdaysParse[i]) {
          mom = moment([2000, 1]).day(i);
          regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
          this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    },
    _longDateFormat: {
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY LT',
      LLLL: 'dddd, MMMM D, YYYY LT'
    },
    longDateFormat: function(key) {
      var output = this._longDateFormat[key];
      if (!output && this._longDateFormat[key.toUpperCase()]) {
        output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
          return val.slice(1);
        });
        this._longDateFormat[key] = output;
      }
      return output;
    },
    isPM: function(input) {
      return ((input + '').toLowerCase().charAt(0) === 'p');
    },
    _meridiemParse: /[ap]\.?m?\.?/i,
    meridiem: function(hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'pm' : 'PM';
      } else {
        return isLower ? 'am' : 'AM';
      }
    },
    _calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    },
    calendar: function(key, mom) {
      var output = this._calendar[key];
      return typeof output === 'function' ? output.apply(mom) : output;
    },
    _relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    relativeTime: function(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return (typeof output === 'function') ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
    },
    pastFuture: function(diff, output) {
      var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
      return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    },
    ordinal: function(number) {
      return this._ordinal.replace('%d', number);
    },
    _ordinal: '%d',
    preparse: function(string) {
      return string;
    },
    postformat: function(string) {
      return string;
    },
    week: function(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    },
    _week: {
      dow: 0,
      doy: 6
    },
    _invalidDate: 'Invalid date',
    invalidDate: function() {
      return this._invalidDate;
    }
  });

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
      i, length;
    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }
    return function(mom) {
      var output = '';
      for (i = 0; i < length; i++) {
        output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
      }
      return output;
    };
  }

  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }
    format = expandFormat(format, m.localeData());
    if (!formatFunctions[format]) {
      formatFunctions[format] = makeFormatFunction(format);
    }
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }
    return format;
  }

  function getParseRegexForToken(token, config) {
    var a, strict = config._strict;
    switch (token) {
      case 'Q':
        return parseTokenOneDigit;
      case 'DDDD':
        return parseTokenThreeDigits;
      case 'YYYY':
      case 'GGGG':
      case 'gggg':
        return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
      case 'Y':
      case 'G':
      case 'g':
        return parseTokenSignedNumber;
      case 'YYYYYY':
      case 'YYYYY':
      case 'GGGGG':
      case 'ggggg':
        return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
      case 'S':
        if (strict) {
          return parseTokenOneDigit;
        }
      case 'SS':
        if (strict) {
          return parseTokenTwoDigits;
        }
      case 'SSS':
        if (strict) {
          return parseTokenThreeDigits;
        }
      case 'DDD':
        return parseTokenOneToThreeDigits;
      case 'MMM':
      case 'MMMM':
      case 'dd':
      case 'ddd':
      case 'dddd':
        return parseTokenWord;
      case 'a':
      case 'A':
        return config._locale._meridiemParse;
      case 'X':
        return parseTokenTimestampMs;
      case 'Z':
      case 'ZZ':
        return parseTokenTimezone;
      case 'T':
        return parseTokenT;
      case 'SSSS':
        return parseTokenDigits;
      case 'MM':
      case 'DD':
      case 'YY':
      case 'GG':
      case 'gg':
      case 'HH':
      case 'hh':
      case 'mm':
      case 'ss':
      case 'ww':
      case 'WW':
        return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
      case 'M':
      case 'D':
      case 'd':
      case 'H':
      case 'h':
      case 'm':
      case 's':
      case 'w':
      case 'W':
      case 'e':
      case 'E':
        return parseTokenOneOrTwoDigits;
      case 'Do':
        return parseTokenOrdinal;
      default:
        a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
        return a;
    }
  }

  function timezoneMinutesFromString(string) {
    string = string || '';
    var possibleTzMatches = (string.match(parseTokenTimezone) || []),
      tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
      parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
      minutes = +(parts[1] * 60) + toInt(parts[2]);
    return parts[0] === '+' ? -minutes : minutes;
  }

  function addTimeToArrayFromToken(token, input, config) {
    var a, datePartArray = config._a;
    switch (token) {
      case 'Q':
        if (input != null) {
          datePartArray[MONTH] = (toInt(input) - 1) * 3;
        }
        break;
      case 'M':
      case 'MM':
        if (input != null) {
          datePartArray[MONTH] = toInt(input) - 1;
        }
        break;
      case 'MMM':
      case 'MMMM':
        a = config._locale.monthsParse(input);
        if (a != null) {
          datePartArray[MONTH] = a;
        } else {
          config._pf.invalidMonth = input;
        }
        break;
      case 'D':
      case 'DD':
        if (input != null) {
          datePartArray[DATE] = toInt(input);
        }
        break;
      case 'Do':
        if (input != null) {
          datePartArray[DATE] = toInt(parseInt(input, 10));
        }
        break;
      case 'DDD':
      case 'DDDD':
        if (input != null) {
          config._dayOfYear = toInt(input);
        }
        break;
      case 'YY':
        datePartArray[YEAR] = moment.parseTwoDigitYear(input);
        break;
      case 'YYYY':
      case 'YYYYY':
      case 'YYYYYY':
        datePartArray[YEAR] = toInt(input);
        break;
      case 'a':
      case 'A':
        config._isPm = config._locale.isPM(input);
        break;
      case 'H':
      case 'HH':
      case 'h':
      case 'hh':
        datePartArray[HOUR] = toInt(input);
        break;
      case 'm':
      case 'mm':
        datePartArray[MINUTE] = toInt(input);
        break;
      case 's':
      case 'ss':
        datePartArray[SECOND] = toInt(input);
        break;
      case 'S':
      case 'SS':
      case 'SSS':
      case 'SSSS':
        datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
        break;
      case 'X':
        config._d = new Date(parseFloat(input) * 1000);
        break;
      case 'Z':
      case 'ZZ':
        config._useUTC = true;
        config._tzm = timezoneMinutesFromString(input);
        break;
      case 'dd':
      case 'ddd':
      case 'dddd':
        a = config._locale.weekdaysParse(input);
        if (a != null) {
          config._w = config._w || {};
          config._w['d'] = a;
        } else {
          config._pf.invalidWeekday = input;
        }
        break;
      case 'w':
      case 'ww':
      case 'W':
      case 'WW':
      case 'd':
      case 'e':
      case 'E':
        token = token.substr(0, 1);
      case 'gggg':
      case 'GGGG':
      case 'GGGGG':
        token = token.substr(0, 2);
        if (input) {
          config._w = config._w || {};
          config._w[token] = toInt(input);
        }
        break;
      case 'gg':
      case 'GG':
        config._w = config._w || {};
        config._w[token] = moment.parseTwoDigitYear(input);
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4;
      weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
      week = dfl(w.W, 1);
      weekday = dfl(w.E, 1);
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
      week = dfl(w.w, 1);
      if (w.d != null) {
        weekday = w.d;
        if (weekday < dow) {
          ++week;
        }
      } else if (w.e != null) {
        weekday = w.e + dow;
      } else {
        weekday = dow;
      }
    }
    temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }

  function dateFromConfig(config) {
    var i, date, input = [],
      currentDate, yearToUse;
    if (config._d) {
      return;
    }
    currentDate = currentDateArray(config);
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    }
    if (config._dayOfYear) {
      yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
      if (config._dayOfYear > daysInYear(yearToUse)) {
        config._pf._overflowDayOfYear = true;
      }
      date = makeUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    }
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    }
    for (; i < 7; i++) {
      config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }
    config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
    }
  }

  function dateFromObject(config) {
    var normalizedInput;
    if (config._d) {
      return;
    }
    normalizedInput = normalizeObjectUnits(config._i);
    config._a = [
      normalizedInput.year,
      normalizedInput.month,
      normalizedInput.day,
      normalizedInput.hour,
      normalizedInput.minute,
      normalizedInput.second,
      normalizedInput.millisecond
    ];
    dateFromConfig(config);
  }

  function currentDateArray(config) {
    var now = new Date();
    if (config._useUTC) {
      return [
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      ];
    } else {
      return [now.getFullYear(), now.getMonth(), now.getDate()];
    }
  }

  function makeDateFromStringAndFormat(config) {
    if (config._f === moment.ISO_8601) {
      parseISO(config);
      return;
    }
    config._a = [];
    config._pf.empty = true;
    var string = '' + config._i,
      i, parsedInput, tokens, token, skipped,
      stringLength = string.length,
      totalParsedInputLength = 0;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          config._pf.unusedInput.push(skipped);
        }
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      }
      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          config._pf.empty = false;
        } else {
          config._pf.unusedTokens.push(token);
        }
        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        config._pf.unusedTokens.push(token);
      }
    }
    config._pf.charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
      config._pf.unusedInput.push(string);
    }
    if (config._isPm && config._a[HOUR] < 12) {
      config._a[HOUR] += 12;
    }
    if (config._isPm === false && config._a[HOUR] === 12) {
      config._a[HOUR] = 0;
    }
    dateFromConfig(config);
    checkOverflow(config);
  }

  function unescapeFormat(s) {
    return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    });
  }

  function regexpEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function makeDateFromStringAndArray(config) {
    var tempConfig,
      bestMoment,
      scoreToBeat,
      i,
      currentScore;
    if (config._f.length === 0) {
      config._pf.invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }
    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);
      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }
      tempConfig._pf = defaultParsingFlags();
      tempConfig._f = config._f[i];
      makeDateFromStringAndFormat(tempConfig);
      if (!isValid(tempConfig)) {
        continue;
      }
      currentScore += tempConfig._pf.charsLeftOver;
      currentScore += tempConfig._pf.unusedTokens.length * 10;
      tempConfig._pf.score = currentScore;
      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
    extend(config, bestMoment || tempConfig);
  }

  function parseISO(config) {
    var i, l,
      string = config._i,
      match = isoRegex.exec(string);
    if (match) {
      config._pf.iso = true;
      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(string)) {
          config._f = isoDates[i][0] + (match[6] || ' ');
          break;
        }
      }
      for (i = 0, l = isoTimes.length; i < l; i++) {
        if (isoTimes[i][1].exec(string)) {
          config._f += isoTimes[i][0];
          break;
        }
      }
      if (string.match(parseTokenTimezone)) {
        config._f += 'Z';
      }
      makeDateFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }

  function makeDateFromString(config) {
    parseISO(config);
    if (config._isValid === false) {
      delete config._isValid;
      moment.createFromInputFallback(config);
    }
  }

  function map(arr, fn) {
    var res = [],
      i;
    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }
    return res;
  }

  function makeDateFromInput(config) {
    var input = config._i,
      matched;
    if (input === undefined) {
      config._d = new Date();
    } else if (isDate(input)) {
      config._d = new Date(+input);
    } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
      config._d = new Date(+matched[1]);
    } else if (typeof input === 'string') {
      makeDateFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function(obj) {
        return parseInt(obj, 10);
      });
      dateFromConfig(config);
    } else if (typeof(input) === 'object') {
      dateFromObject(config);
    } else if (typeof(input) === 'number') {
      config._d = new Date(input);
    } else {
      moment.createFromInputFallback(config);
    }
  }

  function makeDate(y, m, d, h, M, s, ms) {
    var date = new Date(y, m, d, h, M, s, ms);
    if (y < 1970) {
      date.setFullYear(y);
    }
    return date;
  }

  function makeUTCDate(y) {
    var date = new Date(Date.UTC.apply(null, arguments));
    if (y < 1970) {
      date.setUTCFullYear(y);
    }
    return date;
  }

  function parseWeekday(input, locale) {
    if (typeof input === 'string') {
      if (!isNaN(input)) {
        input = parseInt(input, 10);
      } else {
        input = locale.weekdaysParse(input);
        if (typeof input !== 'number') {
          return null;
        }
      }
    }
    return input;
  }

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime(posNegDuration, withoutSuffix, locale) {
    var duration = moment.duration(posNegDuration).abs(),
      seconds = round(duration.as('s')),
      minutes = round(duration.as('m')),
      hours = round(duration.as('h')),
      days = round(duration.as('d')),
      months = round(duration.as('M')),
      years = round(duration.as('y')),
      args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
      minutes === 1 && ['m'] ||
      minutes < relativeTimeThresholds.m && ['mm', minutes] ||
      hours === 1 && ['h'] ||
      hours < relativeTimeThresholds.h && ['hh', hours] ||
      days === 1 && ['d'] ||
      days < relativeTimeThresholds.d && ['dd', days] ||
      months === 1 && ['M'] ||
      months < relativeTimeThresholds.M && ['MM', months] ||
      years === 1 && ['y'] || ['yy', years];
    args[2] = withoutSuffix;
    args[3] = +posNegDuration > 0;
    args[4] = locale;
    return substituteTimeAgo.apply({}, args);
  }

  function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
    var end = firstDayOfWeekOfYear - firstDayOfWeek,
      daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
      adjustedMoment;
    if (daysToDayOfWeek > end) {
      daysToDayOfWeek -= 7;
    }
    if (daysToDayOfWeek < end - 7) {
      daysToDayOfWeek += 7;
    }
    adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
    return {
      week: Math.ceil(adjustedMoment.dayOfYear() / 7),
      year: adjustedMoment.year()
    };
  }

  function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
    var d = makeUTCDate(year, 0, 1).getUTCDay(),
      daysToAdd, dayOfYear;
    d = d === 0 ? 7 : d;
    weekday = weekday != null ? weekday : firstDayOfWeek;
    daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
    dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
    return {
      year: dayOfYear > 0 ? year : year - 1,
      dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
    };
  }

  function makeMoment(config) {
    var input = config._i,
      format = config._f;
    config._locale = config._locale || moment.localeData(config._l);
    if (input === null || (format === undefined && input === '')) {
      return moment.invalid({
        nullInput: true
      });
    }
    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }
    if (moment.isMoment(input)) {
      return new Moment(input, true);
    } else if (format) {
      if (isArray(format)) {
        makeDateFromStringAndArray(config);
      } else {
        makeDateFromStringAndFormat(config);
      }
    } else {
      makeDateFromInput(config);
    }
    return new Moment(config);
  }
  moment = function(input, format, locale, strict) {
    var c;
    if (typeof(locale) === 'boolean') {
      strict = locale;
      locale = undefined;
    }
    c = {};
    c._isAMomentObject = true;
    c._i = input;
    c._f = format;
    c._l = locale;
    c._strict = strict;
    c._isUTC = false;
    c._pf = defaultParsingFlags();
    return makeMoment(c);
  };
  moment.suppressDeprecationWarnings = false;
  moment.createFromInputFallback = deprecate(
    'moment construction falls back to js Date. This is ' +
    'discouraged and will be removed in upcoming major ' +
    'release. Please refer to ' +
    'https://github.com/moment/moment/issues/1407 for more info.',
    function(config) {
      config._d = new Date(config._i);
    }
  );

  function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }
    if (!moments.length) {
      return moment();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
      if (moments[i][fn](res)) {
        res = moments[i];
      }
    }
    return res;
  }
  moment.min = function() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  };
  moment.max = function() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  };
  moment.utc = function(input, format, locale, strict) {
    var c;
    if (typeof(locale) === 'boolean') {
      strict = locale;
      locale = undefined;
    }
    c = {};
    c._isAMomentObject = true;
    c._useUTC = true;
    c._isUTC = true;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    c._pf = defaultParsingFlags();
    return makeMoment(c).utc();
  };
  moment.unix = function(input) {
    return moment(input * 1000);
  };
  moment.duration = function(input, key) {
    var duration = input,
      match = null,
      sign,
      ret,
      parseIso,
      diffRes;
    if (moment.isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (typeof input === 'number') {
      duration = {};
      if (key) {
        duration[key] = input;
      } else {
        duration.milliseconds = input;
      }
    } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
      sign = (match[1] === '-') ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(match[MILLISECOND]) * sign
      };
    } else if (!!(match = isoDurationRegex.exec(input))) {
      sign = (match[1] === '-') ? -1 : 1;
      parseIso = function(inp) {
        var res = inp && parseFloat(inp.replace(',', '.'));
        return (isNaN(res) ? 0 : res) * sign;
      };
      duration = {
        y: parseIso(match[2]),
        M: parseIso(match[3]),
        d: parseIso(match[4]),
        h: parseIso(match[5]),
        m: parseIso(match[6]),
        s: parseIso(match[7]),
        w: parseIso(match[8])
      };
    } else if (typeof duration === 'object' &&
      ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(moment(duration.from), moment(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }
    ret = new Duration(duration);
    if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }
    return ret;
  };
  moment.version = VERSION;
  moment.defaultFormat = isoFormat;
  moment.ISO_8601 = function() {};
  moment.momentProperties = momentProperties;
  moment.updateOffset = function() {};
  moment.relativeTimeThreshold = function(threshold, limit) {
    if (relativeTimeThresholds[threshold] === undefined) {
      return false;
    }
    if (limit === undefined) {
      return relativeTimeThresholds[threshold];
    }
    relativeTimeThresholds[threshold] = limit;
    return true;
  };
  moment.lang = deprecate(
    'moment.lang is deprecated. Use moment.locale instead.',
    function(key, value) {
      return moment.locale(key, value);
    }
  );
  moment.locale = function(key, values) {
    var data;
    if (key) {
      if (typeof(values) !== 'undefined') {
        data = moment.defineLocale(key, values);
      } else {
        data = moment.localeData(key);
      }
      if (data) {
        moment.duration._locale = moment._locale = data;
      }
    }
    return moment._locale._abbr;
  };
  moment.defineLocale = function(name, values) {
    if (values !== null) {
      values.abbr = name;
      if (!locales[name]) {
        locales[name] = new Locale();
      }
      locales[name].set(values);
      moment.locale(name);
      return locales[name];
    } else {
      delete locales[name];
      return null;
    }
  };
  moment.langData = deprecate(
    'moment.langData is deprecated. Use moment.localeData instead.',
    function(key) {
      return moment.localeData(key);
    }
  );
  moment.localeData = function(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }
    if (!key) {
      return moment._locale;
    }
    if (!isArray(key)) {
      locale = loadLocale(key);
      if (locale) {
        return locale;
      }
      key = [key];
    }
    return chooseLocale(key);
  };
  moment.isMoment = function(obj) {
    return obj instanceof Moment ||
      (obj != null && hasOwnProp(obj, '_isAMomentObject'));
  };
  moment.isDuration = function(obj) {
    return obj instanceof Duration;
  };
  for (i = lists.length - 1; i >= 0; --i) {
    makeList(lists[i]);
  }
  moment.normalizeUnits = function(units) {
    return normalizeUnits(units);
  };
  moment.invalid = function(flags) {
    var m = moment.utc(NaN);
    if (flags != null) {
      extend(m._pf, flags);
    } else {
      m._pf.userInvalidated = true;
    }
    return m;
  };
  moment.parseZone = function() {
    return moment.apply(null, arguments).parseZone();
  };
  moment.parseTwoDigitYear = function(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };
  extend(moment.fn = Moment.prototype, {
    clone: function() {
      return moment(this);
    },
    valueOf: function() {
      return +this._d + ((this._offset || 0) * 60000);
    },
    unix: function() {
      return Math.floor(+this / 1000);
    },
    toString: function() {
      return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    },
    toDate: function() {
      return this._offset ? new Date(+this) : this._d;
    },
    toISOString: function() {
      var m = moment(this).utc();
      if (0 < m.year() && m.year() <= 9999) {
        return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
      } else {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
      }
    },
    toArray: function() {
      var m = this;
      return [
        m.year(),
        m.month(),
        m.date(),
        m.hours(),
        m.minutes(),
        m.seconds(),
        m.milliseconds()
      ];
    },
    isValid: function() {
      return isValid(this);
    },
    isDSTShifted: function() {
      if (this._a) {
        return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
      }
      return false;
    },
    parsingFlags: function() {
      return extend({}, this._pf);
    },
    invalidAt: function() {
      return this._pf.overflow;
    },
    utc: function(keepLocalTime) {
      return this.zone(0, keepLocalTime);
    },
    local: function(keepLocalTime) {
      if (this._isUTC) {
        this.zone(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.add(this._dateTzOffset(), 'm');
        }
      }
      return this;
    },
    format: function(inputString) {
      var output = formatMoment(this, inputString || moment.defaultFormat);
      return this.localeData().postformat(output);
    },
    add: createAdder(1, 'add'),
    subtract: createAdder(-1, 'subtract'),
    diff: function(input, units, asFloat) {
      var that = makeAs(input, this),
        zoneDiff = (this.zone() - that.zone()) * 6e4,
        diff, output, daysAdjust;
      units = normalizeUnits(units);
      if (units === 'year' || units === 'month') {
        diff = (this.daysInMonth() + that.daysInMonth()) * 432e5;
        output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
        daysAdjust = (this - moment(this).startOf('month')) -
          (that - moment(that).startOf('month'));
        daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -
          (that.zone() - moment(that).startOf('month').zone())) * 6e4;
        output += daysAdjust / diff;
        if (units === 'year') {
          output = output / 12;
        }
      } else {
        diff = (this - that);
        output = units === 'second' ? diff / 1e3 :
          units === 'minute' ? diff / 6e4 :
          units === 'hour' ? diff / 36e5 :
          units === 'day' ? (diff - zoneDiff) / 864e5 :
          units === 'week' ? (diff - zoneDiff) / 6048e5 :
          diff;
      }
      return asFloat ? output : absRound(output);
    },
    from: function(time, withoutSuffix) {
      return moment.duration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    },
    fromNow: function(withoutSuffix) {
      return this.from(moment(), withoutSuffix);
    },
    calendar: function(time) {
      var now = time || moment(),
        sod = makeAs(now, this).startOf('day'),
        diff = this.diff(sod, 'days', true),
        format = diff < -6 ? 'sameElse' :
        diff < -1 ? 'lastWeek' :
        diff < 0 ? 'lastDay' :
        diff < 1 ? 'sameDay' :
        diff < 2 ? 'nextDay' :
        diff < 7 ? 'nextWeek' : 'sameElse';
      return this.format(this.localeData().calendar(format, this));
    },
    isLeapYear: function() {
      return isLeapYear(this.year());
    },
    isDST: function() {
      return (this.zone() < this.clone().month(0).zone() ||
        this.zone() < this.clone().month(5).zone());
    },
    day: function(input) {
      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
      } else {
        return day;
      }
    },
    month: makeAccessor('Month', true),
    startOf: function(units) {
      units = normalizeUnits(units);
      switch (units) {
        case 'year':
          this.month(0);
        case 'quarter':
        case 'month':
          this.date(1);
        case 'week':
        case 'isoWeek':
        case 'day':
          this.hours(0);
        case 'hour':
          this.minutes(0);
        case 'minute':
          this.seconds(0);
        case 'second':
          this.milliseconds(0);
      }
      if (units === 'week') {
        this.weekday(0);
      } else if (units === 'isoWeek') {
        this.isoWeekday(1);
      }
      if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
      }
      return this;
    },
    endOf: function(units) {
      units = normalizeUnits(units);
      return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    },
    isAfter: function(input, units) {
      units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
      if (units === 'millisecond') {
        input = moment.isMoment(input) ? input : moment(input);
        return +this > +input;
      } else {
        return +this.clone().startOf(units) > +moment(input).startOf(units);
      }
    },
    isBefore: function(input, units) {
      units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
      if (units === 'millisecond') {
        input = moment.isMoment(input) ? input : moment(input);
        return +this < +input;
      } else {
        return +this.clone().startOf(units) < +moment(input).startOf(units);
      }
    },
    isSame: function(input, units) {
      units = normalizeUnits(units || 'millisecond');
      if (units === 'millisecond') {
        input = moment.isMoment(input) ? input : moment(input);
        return +this === +input;
      } else {
        return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
      }
    },
    min: deprecate(
      'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
      function(other) {
        other = moment.apply(null, arguments);
        return other < this ? this : other;
      }
    ),
    max: deprecate(
      'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
      function(other) {
        other = moment.apply(null, arguments);
        return other > this ? this : other;
      }
    ),
    zone: function(input, keepLocalTime) {
      var offset = this._offset || 0,
        localAdjust;
      if (input != null) {
        if (typeof input === 'string') {
          input = timezoneMinutesFromString(input);
        }
        if (Math.abs(input) < 16) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = this._dateTzOffset();
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.subtract(localAdjust, 'm');
        }
        if (offset !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            addOrSubtractDurationFromMoment(this,
              moment.duration(offset - input, 'm'), 1, false);
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            moment.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
      } else {
        return this._isUTC ? offset : this._dateTzOffset();
      }
      return this;
    },
    zoneAbbr: function() {
      return this._isUTC ? 'UTC' : '';
    },
    zoneName: function() {
      return this._isUTC ? 'Coordinated Universal Time' : '';
    },
    parseZone: function() {
      if (this._tzm) {
        this.zone(this._tzm);
      } else if (typeof this._i === 'string') {
        this.zone(this._i);
      }
      return this;
    },
    hasAlignedHourOffset: function(input) {
      if (!input) {
        input = 0;
      } else {
        input = moment(input).zone();
      }
      return (this.zone() - input) % 60 === 0;
    },
    daysInMonth: function() {
      return daysInMonth(this.year(), this.month());
    },
    dayOfYear: function(input) {
      var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
      return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    },
    quarter: function(input) {
      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    },
    weekYear: function(input) {
      var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
      return input == null ? year : this.add((input - year), 'y');
    },
    isoWeekYear: function(input) {
      var year = weekOfYear(this, 1, 4).year;
      return input == null ? year : this.add((input - year), 'y');
    },
    week: function(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, 'd');
    },
    isoWeek: function(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, 'd');
    },
    weekday: function(input) {
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, 'd');
    },
    isoWeekday: function(input) {
      return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    },
    isoWeeksInYear: function() {
      return weeksInYear(this.year(), 1, 4);
    },
    weeksInYear: function() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    },
    get: function(units) {
      units = normalizeUnits(units);
      return this[units]();
    },
    set: function(units, value) {
      units = normalizeUnits(units);
      if (typeof this[units] === 'function') {
        this[units](value);
      }
      return this;
    },
    locale: function(key) {
      var newLocaleData;
      if (key === undefined) {
        return this._locale._abbr;
      } else {
        newLocaleData = moment.localeData(key);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    },
    lang: deprecate(
      'moment().lang() is deprecated. Use moment().localeData() instead.',
      function(key) {
        if (key === undefined) {
          return this.localeData();
        } else {
          return this.locale(key);
        }
      }
    ),
    localeData: function() {
      return this._locale;
    },
    _dateTzOffset: function() {
      return Math.round(this._d.getTimezoneOffset() / 15) * 15;
    }
  });

  function rawMonthSetter(mom, value) {
    var dayOfMonth;
    if (typeof value === 'string') {
      value = mom.localeData().monthsParse(value);
      if (typeof value !== 'number') {
        return mom;
      }
    }
    dayOfMonth = Math.min(mom.date(),
      daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
  }

  function rawGetter(mom, unit) {
    return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
  }

  function rawSetter(mom, unit, value) {
    if (unit === 'Month') {
      return rawMonthSetter(mom, value);
    } else {
      return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
  }

  function makeAccessor(unit, keepTime) {
    return function(value) {
      if (value != null) {
        rawSetter(this, unit, value);
        moment.updateOffset(this, keepTime);
        return this;
      } else {
        return rawGetter(this, unit);
      }
    };
  }
  moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
  moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
  moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
  moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
  moment.fn.date = makeAccessor('Date', true);
  moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
  moment.fn.year = makeAccessor('FullYear', true);
  moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));
  moment.fn.days = moment.fn.day;
  moment.fn.months = moment.fn.month;
  moment.fn.weeks = moment.fn.week;
  moment.fn.isoWeeks = moment.fn.isoWeek;
  moment.fn.quarters = moment.fn.quarter;
  moment.fn.toJSON = moment.fn.toISOString;

  function daysToYears(days) {
    return days * 400 / 146097;
  }

  function yearsToDays(years) {
    return years * 146097 / 400;
  }
  extend(moment.duration.fn = Duration.prototype, {
    _bubble: function() {
      var milliseconds = this._milliseconds,
        days = this._days,
        months = this._months,
        data = this._data,
        seconds, minutes, hours, years = 0;
      data.milliseconds = milliseconds % 1000;
      seconds = absRound(milliseconds / 1000);
      data.seconds = seconds % 60;
      minutes = absRound(seconds / 60);
      data.minutes = minutes % 60;
      hours = absRound(minutes / 60);
      data.hours = hours % 24;
      days += absRound(hours / 24);
      years = absRound(daysToYears(days));
      days -= absRound(yearsToDays(years));
      months += absRound(days / 30);
      days %= 30;
      years += absRound(months / 12);
      months %= 12;
      data.days = days;
      data.months = months;
      data.years = years;
    },
    abs: function() {
      this._milliseconds = Math.abs(this._milliseconds);
      this._days = Math.abs(this._days);
      this._months = Math.abs(this._months);
      this._data.milliseconds = Math.abs(this._data.milliseconds);
      this._data.seconds = Math.abs(this._data.seconds);
      this._data.minutes = Math.abs(this._data.minutes);
      this._data.hours = Math.abs(this._data.hours);
      this._data.months = Math.abs(this._data.months);
      this._data.years = Math.abs(this._data.years);
      return this;
    },
    weeks: function() {
      return absRound(this.days() / 7);
    },
    valueOf: function() {
      return this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6;
    },
    humanize: function(withSuffix) {
      var output = relativeTime(this, !withSuffix, this.localeData());
      if (withSuffix) {
        output = this.localeData().pastFuture(+this, output);
      }
      return this.localeData().postformat(output);
    },
    add: function(input, val) {
      var dur = moment.duration(input, val);
      this._milliseconds += dur._milliseconds;
      this._days += dur._days;
      this._months += dur._months;
      this._bubble();
      return this;
    },
    subtract: function(input, val) {
      var dur = moment.duration(input, val);
      this._milliseconds -= dur._milliseconds;
      this._days -= dur._days;
      this._months -= dur._months;
      this._bubble();
      return this;
    },
    get: function(units) {
      units = normalizeUnits(units);
      return this[units.toLowerCase() + 's']();
    },
    as: function(units) {
      var days, months;
      units = normalizeUnits(units);
      if (units === 'month' || units === 'year') {
        days = this._days + this._milliseconds / 864e5;
        months = this._months + daysToYears(days) * 12;
        return units === 'month' ? months : months / 12;
      } else {
        days = this._days + yearsToDays(this._months / 12);
        switch (units) {
          case 'week':
            return days / 7 + this._milliseconds / 6048e5;
          case 'day':
            return days + this._milliseconds / 864e5;
          case 'hour':
            return days * 24 + this._milliseconds / 36e5;
          case 'minute':
            return days * 24 * 60 + this._milliseconds / 6e4;
          case 'second':
            return days * 24 * 60 * 60 + this._milliseconds / 1000;
          case 'millisecond':
            return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
          default:
            throw new Error('Unknown unit ' + units);
        }
      }
    },
    lang: moment.fn.lang,
    locale: moment.fn.locale,
    toIsoString: deprecate(
      'toIsoString() is deprecated. Please use toISOString() instead ' +
      '(notice the capitals)',
      function() {
        return this.toISOString();
      }
    ),
    toISOString: function() {
      var years = Math.abs(this.years()),
        months = Math.abs(this.months()),
        days = Math.abs(this.days()),
        hours = Math.abs(this.hours()),
        minutes = Math.abs(this.minutes()),
        seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);
      if (!this.asSeconds()) {
        return 'P0D';
      }
      return (this.asSeconds() < 0 ? '-' : '') +
        'P' +
        (years ? years + 'Y' : '') +
        (months ? months + 'M' : '') +
        (days ? days + 'D' : '') +
        ((hours || minutes || seconds) ? 'T' : '') +
        (hours ? hours + 'H' : '') +
        (minutes ? minutes + 'M' : '') +
        (seconds ? seconds + 'S' : '');
    },
    localeData: function() {
      return this._locale;
    }
  });
  moment.duration.fn.toString = moment.duration.fn.toISOString;

  function makeDurationGetter(name) {
    moment.duration.fn[name] = function() {
      return this._data[name];
    };
  }
  for (i in unitMillisecondFactors) {
    if (hasOwnProp(unitMillisecondFactors, i)) {
      makeDurationGetter(i.toLowerCase());
    }
  }
  moment.duration.fn.asMilliseconds = function() {
    return this.as('ms');
  };
  moment.duration.fn.asSeconds = function() {
    return this.as('s');
  };
  moment.duration.fn.asMinutes = function() {
    return this.as('m');
  };
  moment.duration.fn.asHours = function() {
    return this.as('h');
  };
  moment.duration.fn.asDays = function() {
    return this.as('d');
  };
  moment.duration.fn.asWeeks = function() {
    return this.as('weeks');
  };
  moment.duration.fn.asMonths = function() {
    return this.as('M');
  };
  moment.duration.fn.asYears = function() {
    return this.as('y');
  };
  moment.locale('en', {
    ordinal: function(number) {
      var b = number % 10,
        output = (toInt(number % 100 / 10) === 1) ? 'th' :
        (b === 1) ? 'st' :
        (b === 2) ? 'nd' :
        (b === 3) ? 'rd' : 'th';
      return number + output;
    }
  });

  function makeGlobal(shouldDeprecate) {
    if (typeof ender !== 'undefined') {
      return;
    }
    oldGlobalMoment = globalScope.moment;
    if (shouldDeprecate) {
      globalScope.moment = deprecate(
        'Accessing Moment through the global scope is ' +
        'deprecated, and will be removed in an upcoming ' +
        'release.',
        moment);
    } else {
      globalScope.moment = moment;
    }
  }
  if (hasModule) {
    module.exports = moment;
  } else if (typeof define === 'function' && define.amd) {
    define('moment', function(require, exports, module) {
      if (module.config && module.config() && module.config().noGlobal === true) {
        globalScope.moment = oldGlobalMoment;
      }
      return moment;
    });
    makeGlobal(true);
  } else {
    makeGlobal();
  }
}).call(this);;