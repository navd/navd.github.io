//This event will be triggered on opening product detail page.
$(document).bind("product_detail_page", function(event,catalog_id){
	setTimeout(function(){
		$this = $('.pricing_summary_wrapper');
		if($this.find('.cod-status.cod-enabled').length > 0){
			$this.addClass('has-cod');
		}
	},0);
});

//This event will be triggered on payment page in checkout pipeline.
$(document).bind("checkout-payment", function(event){
	$("#promo-form form").append('<div class="message info">Promotion codes are applicable only on products \'Sold by Crossword\'. </div>');	
});

//This event will be triggered on variant selection in product detail page.
$(document).bind("variant_changed", function(event,variant_id){
	if( ! $("#in_stock .ships-in .sold-by").text().trim().length){
		$("#in_stock .ships-in .sold-by").html("Sold by <b> Crossword </b>")
	}
});
$(document).bind('checkout-login', function(){
var login_dob_div='<div id="login_dob"><label for="customer_user_attributes_additional_detail_dob">Date of Birth</label><input id="customer_user_attributes_additional_detail_dob" type="text" name="customer[user_attributes][additional_detail][dob]" /></div>'
$('#customer_user_attributes_password_confirmation').closest('p').after(login_dob_div);
		$( "#customer_user_attributes_additional_detail_dob" ).datepicker({
      showOn: "button",
      buttonImage: "/exthemes/13/41/200/theme-1341200-1/images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Date of Birth",
changeMonth: true,
      changeYear: true
    });

});

//If a customer is logged-in, this event will be triggered on every page.
$(document).bind('logged-in', function(event,user) {
  //user variable contains user information. For getting name, you can call user.name
	$(function(){
		if(user.name){
			user_name = user.name.split(" ")[0];
			$(".login-msg").html("Hello "+ user_name );
		}
	});
});
//This event will be triggered on address details page in checkout pipeline
$(document).bind("checkout-address", function(event){
console.log("asdsadsad");
	if($.cookies.get("username") == null) {

  	$('#same_as_shipping').attr('checked', true);
  	$('#billing-address-list').fadeOut();
	}
});
//This event will be triggered on address details page in checkout pipeline
$(document).bind("checkout-address", function(event){
	console.log("asdsadsad");
});

$(function(){
	 var state_list = $('#state').find('option');
 state_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
 $('#state').html('').append(state_list);
	
enquire.register(media.small, {match: function() {
		$(document).bind("checkout-address",function(){
			$( document ).ajaxComplete(function() {
				$.fn.addHeadersToRows && $("#order-items").addHeadersToRows(); 
			});
		});
	}});
});

/** START: PLUGIN SELECT TO RANGE https://github.com/HA-KR/jQuery-selectToRange */
(function () {
  function warn(msg) {
    if (typeof console === "object") {
      var i, type, TYPES = ['warn', 'debug', 'log'];
      for (i in TYPES) {
        type = TYPES[i];
        if (typeof console[type] === "function") {
          console[type](msg);
          return;
        }
      }
    }
  }
  if (typeof $ !== "function") {
    warn("`jQuery` library is not included, `selectToRange` plugin requires jQuery, get it form [jQuery]( https://jquery.com/download/ )");
  } else if (typeof $.fn.selectToRange === "function") {
    warn("`selectToRange` plugin is already initialized!");
  }
  var DEFAULT_OPTIONS = {
    timeout: 600,
    after: null,
    before: null
  };

  function prepareUI(that, options) {
    var $me = $(that);
    var min = $("option:first", that).val();
    var max = $("option:last", that).val();
    var value = $me.val();
    var inputWrapper = $("<div>", {
      "class": "qty-container",
      "html": '<a href="#" class="qty-change remove">-</a>'
    });
    var inputBox = $("<input>", {
        "class": "qty-input",
        "type": "text",
        "value": value,
        "readonly": true,
        "disabled": true,
        "data-min": parseInt(min, 10),
        "data-max": parseInt(max, 10)
      })
      .data("select-box", $me)
      .appendTo(inputWrapper);
    inputWrapper.append('<a href="#" class="qty-change add">+</a>');
    $me.addClass('hide');
    if (options.after) {
      $(options.after).after(inputWrapper);
    } else {
      if (options.before) {
        $(options.before).before(inputWrapper);
      } else {
        $me.after(inputWrapper);
      }
    }
    return inputWrapper;
  }

  function addEventListeners(that, options, inputWrapper) {
    $(".qty-change", inputWrapper).click(function (e) {
      e.preventDefault();
      var $me = $(this);
      var $target = $me.siblings(".qty-input");
      var $selectBox = $($target.data("select-box"));
      var min = $target.data("min");
      var max = $target.data("max");
      var value = parseInt($target.val(), 10);
      var updateTimeout = parseInt($selectBox.data('timeout'), 10);
      if ($me.hasClass("disabled") || !$selectBox.length) {
        return false;
      }
      if ($me.hasClass("add")) {
        if (value < max) {
          ++value;
          $me.siblings(".qty-change.remove").removeClass("disabled");
        } else {
          $me.addClass("disabled");
          return false;
        }
      } else {
        if (value > min) {
          --value;
          $me.siblings(".qty-change.add").removeClass("disabled");
        } else {
          $me.addClass("disabled");
          return false;
        }
      }
      $target.val(value);
      $selectBox.val(value);
      if ("number" === typeof updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(function () {
        $selectBox.trigger("change");
      },options.timeout);
      $selectBox.data('timeout', updateTimeout);
    });
  }

  function selectToRange(options) {
    options = $.extend({}, DEFAULT_OPTIONS, options);
    return this.each(function () {
      var wrapper = prepareUI(this, options);
      addEventListeners(this, options, wrapper);
    });
  }

  //Initialize the jQuery plugin
  $.fn.selectToRange = selectToRange;
}());
/** END: PLUGIN SELECT TO RANGE */

$(document).bind("shopping_cart", function () {
  $(".popup-dialog-open #shopping-cart-items td.qty select, #order-detail-body #shopping-cart-items td.qty select, #shopping-cart-page #shopping-cart-items td.qty select").selectToRange();
});
//This event will be triggered on variant selection in product detail page.
$(document).bind("variant_changed", function(event,variant_id){
	$('#variant_quantity').selectToRange();
});

// Added for Shipping Page Error related to Mobile Error
$(document).bind("checkout-address", function(event){
    $("#address-details-page .continue-button").click(function(e){

        var reg = /^\d{10,}$/;
      	var isError_shipping = true; 
				var isError_billing = true;
        var shipping_mobile = $("input#simple_purchase_shipping_address_attributes_mobile");
        var new_shipping = $('#simple_purchase_shipping_address_id');
        var billing_mobile = $("input#simple_purchase_billing_address_attributes_mobile");
        var new_billing = $('#simple_purchase_billing_address_id');
        $("input#simple_purchase_shipping_address_attributes_mobile,input#simple_purchase_billing_address_attributes_mobile").closest("li").removeClass("error").children('p').remove();
        if (!new_shipping.is(":hidden") && !new_shipping.attr('checked') || reg.test(shipping_mobile.val())){
            isError_shipping = false;
        }
        if (!!$("#same_as_shipping").attr('checked') || !new_billing.is(":hidden") && !new_billing.attr('checked') || reg.test(billing_mobile.val())){
            isError_billing = false;
        }
        console.log("error",isError_shipping,isError_billing);
        if(isError_shipping || isError_billing){
            $error_html = "<p class='inline-errors'>Please enter 10 digit mobile no</p>"
            isError_shipping ? shipping_mobile.closest("li").append($error_html).addClass("error") : billing_mobile.closest("li").append($error_html).addClass("error")
            return false;
        }

    });
});

// max quantity error message //
window.showErrorMsg = function (elem, text, options) {
  options = options || {};
  options = $.extend(true, {}, {
    content: text,
    position: {
      at: "top right",
      my: "bottom left"
    },
    show: {
      ready: true
    },
    style: {
      classes: "ui-tooltip-bootstrap"
    },
    hide: {
      event: "unfocus",
      inactive: 2E3
    },
    events: {
      hide: function (event, api) {
        api.destroy();
      }
    }
  }, options);
  $(elem).qtip(options);
};
$(document).bind("product_detail_page", function () {
	$(function (){
	$('.qty-container > .add').click(function(e){
   e.preventDefault();
   var $target = $(this).siblings(".qty-input");
   var min = $target.data("min");
   var max = $target.data("max");
   var value = Number($target.val());
   if (value >= max) {
   $(this).attr('style','display:block !important');
   error_msg = "Only "+$('.qty-container > .add').closest('#cart').find('select option:last').val()+" available"
     window.showErrorMsg($target,error_msg, {position: {at:"top center", my:"bottom center"}});
     return false;
   }
   return false;
});
});
	if((q = $('#quick-view')).length){
		BAB.loadResponsiveImage(q);
	}
});
$(document).bind("shopping_cart", function () {
	$(function (){
	$('#shopping-cart-items .qty-container > .add').click(function(e){
		e.preventDefault();
		var $target = $(this).siblings(".qty-input");
		var min = $target.data("min");
		var max = $target.data("max");
		var value = Number($target.val());
		if (value >= max) {
			var error_msg = $(this).closest('tr.normal-item').find('span.error-text').length>0 ? $(this).closest('tr.normal-item').find('span.error-text').text() : "Only "+$(this).closest('.qty').find('select option:last').val()+" available" ; ;
			window.showErrorMsg($target,error_msg, {position: {at:"top center", my:"bottom center"}});
			return false;
		}
		return false;
	})

	});
});
// ends here //

//This event will be triggered on variant selection in product detail page.
$(document).bind("variant_changed", function(event,variant_id){
	$(".catalog-option .catalog-option-color").each(function(){
		$(this).attr({"data-toggle":"tooltip","data-placement":"top", "title":$(this).siblings('.catalog-option-title').text().trim()}).tooltip();
		$(this).removeAttr('title');
	})
});

//This event will be triggered on variant selection in product detail page.
$(document).bind("variant_changed", function(event,variant_id){
$('input[placeholder]').placeholder();
$('input[name="zipcode"]').attr('placeholder','Enter your Pincode');

});

$(function(){
$('.contact-us-page, #login-page').find('input[type="text"], input[type="password"],textarea, select').each(function(i, input){
 var me = $(input);
 var placeholderTxt = "";
 var label = me.prev('label');
 if(label.length){
   placeholderTxt = label.text();
   label.addClass('hide');
 }
 me.attr('placeholder', placeholderTxt).placeholder();
 me.prepend('<option selected="selected" disabled="disabled">'+placeholderTxt+'</option>')
});
});