/* =============================================================
 * radio.js v0.0.3
 * ============================================================ */

!function ($) {

 /* RADIO PUBLIC CLASS DEFINITION
  * ============================== */

  var Radio = function (element, options) {
    this.init(element, options);
  }

  Radio.prototype = {

    constructor: Radio

  , init: function (element, options) {
      var $el = this.$element = $(element)
      $el.css('display','none');

      this.options = $.extend({}, $.fn.radio.defaults, options);
      this.options.parent_style_class = $el.closest('.radio-inline').length ? '.radio-inline': '.radio';
      $el.before(this.options.template);
      this.setState();
    }

  , setState: function () {
      var $el = this.$element
        , $parent = $el.closest(this.options.parent_style_class);

        $el.prop('disabled') && $parent.addClass('disabled');
        $el.prop('checked') && $parent.addClass('checked');
    }

  , toggle: function () {
      var d = 'disabled'
        , ch = 'checked'
        , $el = this.$element
        , _this = this
        , checked = $el.prop(ch)
        , $parent = $el.closest(this.options.parent_style_class)
        , $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
        , $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
        , e = $.Event('toggle')

        $elemGroup.not($el).each(function () {
          var $el = $(this)
            , $parent = $(this).closest(_this.options.parent_style_class);

            if ($el.prop(d) == false) {
              $parent.removeClass(ch) && $el.prop(ch,null).trigger('change');
            }
        });

        if ($el.prop(d) == false) {
          if (checked == false) $parent.addClass(ch) && $el.attr(ch, true) && $el.prop(ch, true);
          $el.trigger(e);

          if (checked !== $el.prop(ch)) {
            $el.trigger('change');
          }
        }
    }

  , setCheck: function (option) {
      var ch = 'checked'
        , $el = this.$element
        , $parent = $el.closest(this.options.parent_style_class)
        , checkAction = option == 'check' ? true : false
        , checked = $el.prop(ch)
        , $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
        , $elemGroup = $parentWrap.find(':radio[name="' + $el['attr']('name') + '"]')
        , e = $.Event(option)

      $elemGroup.not($el).each(function () {
        var $el = $(this)
          , $parent = $(this).closest(this.options.parent_style_class);

          $parent.removeClass(ch) && $el.prop(ch, null) && $el.removeAttr(ch);
      });

      $parent[checkAction ? 'addClass' : 'removeClass'](ch) && checkAction ? $el.prop(ch, ch) : $el.prop(ch, null) && $el.removeAttr(ch);
      $el.trigger(e);

      if (checked !== $el.prop(ch)) {
        $el.trigger('change');
      }
    }

  }


 /* RADIO PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.radio

  $.fn.radio = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('radio')
        , options = $.extend({}, $.fn.radio.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('radio', (data = new Radio(this, options)));
      if (option == 'toggle') data.toggle()
      if (option == 'check' || option == 'uncheck') data.setCheck(option)
      else if (option) data.setState();
    });
  }

  $.fn.radio.defaults = {
    template: '<span class="icons"><span class="first-icon"></span><span class="second-icon"></span></span>'
  }


 /* RADIO NO CONFLICT
  * ================== */

  $.fn.radio.noConflict = function () {
    $.fn.radio = old;
    return this;
  }


 /* RADIO DATA-API
  * =============== */

  $(document).on('click.radio.data-api', '[data-toggle^=radio], .radio, .radio-inline', function (e) {
    var $radio = $(e.target);
    e && e.preventDefault() && e.stopPropagation();
    var $radio_style = $radio;
    if (!$radio.hasClass('radio-inline')) $radio_style = $radio.closest('.radio-inline');
    if (!$radio_style.length) {
        if (!$radio.hasClass('radio')) $radio_style = $radio.closest('.radio');
    }
    $radio_style.find(':radio').radio('toggle');
  });

  $(function () {
    // data-toggle=radio not follow the pattern of crispy-form
    $('[data-toggle="radio"], .radio input, .radio-inline input').each(function () {
      var $radio = $(this);
      $radio.radio();
    });
  });

}(window.jQuery);
