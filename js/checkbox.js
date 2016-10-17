/* =============================================================
 * checkbox v0.0.3
 * ============================================================ */

!function ($) {

 /* CHECKBOX PUBLIC CLASS DEFINITION
  * ============================== */

  var Checkbox = function (element, options) {
    this.init(element, options);
  }

  Checkbox.prototype = {

    constructor: Checkbox

  , init: function (element, options) {
    var $el = this.$element = $(element)
    $el.css('display','none');

    this.options = $.extend({}, $.fn.checkbox.defaults, options);
    this.options.parent_style_class = $el.closest('.checkbox-inline').length ? '.checkbox-inline': '.checkbox';
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
      var ch = 'checked'
        , $el = this.$element
        , $parent = $el.closest(this.options.parent_style_class)
        , checked = $el.prop(ch)
        , e = $.Event('toggle')

      if ($el.prop('disabled') == false) {
        // https://api.jquery.com/removeAttr/
        $parent.toggleClass(ch) && checked ? $el.prop(ch, null) && $el.removeAttr(ch): $el.prop(ch, ch);
        $el.trigger(e).trigger('change');
      }
    }

  , setCheck: function (option) {
      var d = 'disabled'
        , ch = 'checked'
        , $el = this.$element
        , $parent = $el.closest(this.options.parent_style_class)
        , checkAction = option == 'check' ? true : false
        , e = $.Event(option)

      $parent[checkAction ? 'addClass' : 'removeClass' ](ch) && checkAction ? $el.prop(ch, ch) : $el.prop(ch, null) && $el.removeAttr(ch);
      $el.trigger(e).trigger('change');
    }

  }


 /* CHECKBOX PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.checkbox

  $.fn.checkbox = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('checkbox')
        , options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
      if (option == 'toggle') data.toggle()
      if (option == 'check' || option == 'uncheck') data.setCheck(option)
      else if (option) data.setState();
    });
  }

  $.fn.checkbox.defaults = {
    template: '<span class="icons"><span class="first-icon"></span><span class="second-icon fa fa-check"></span></span>'
  }


 /* CHECKBOX NO CONFLICT
  * ================== */

  $.fn.checkbox.noConflict = function () {
    $.fn.checkbox = old;
    return this;
  }


 /* CHECKBOX DATA-API
  * =============== */

  $(document).on('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox, .checkbox-inline', function (e) {
    var $checkbox = $(e.target);
    if (e.target.tagName != "A") {
      e && e.preventDefault() && e.stopPropagation();
      var $checkbox_style = $checkbox;
      if (!$checkbox.hasClass('checkbox-inline')) $checkbox_style = $checkbox.closest('.checkbox-inline');
      if (!$checkbox_style.length) {
          if (!$checkbox.hasClass('checkbox')) $checkbox_style = $checkbox.closest('.checkbox');
      }
      $checkbox_style.find(':checkbox').checkbox('toggle');
    }
  });

  $(function () {
    $('[data-toggle="checkbox"], .checkbox input, .checkbox-inline input').each(function () {
      var $checkbox = $(this);
      $checkbox.checkbox();
    });
  });

}(window.jQuery);
