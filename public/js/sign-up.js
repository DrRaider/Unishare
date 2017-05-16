function toggleIcon(e) {
	$(e.target)
  	.prev('.panel-heading')
  	.find(".short-full")
  	.toggleClass('glyphicon-plus glyphicon-minus');
}

$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
var howMany = 0;

$(document).ready(function($) {
  //when the Add Filed button is clicked
  	
  	$("#add").click(function (e) {
		howMany++;
		console.log(howMany);
    	//Append a new row of code to the "#items" div
    	$("#items").append(
	        '<div class="form-group"> \
	          <div class="col-md-6"> \
	            <div class="input-group"> \
	              <span class="input-group-addon"> \
	                <i class="glyphicon glyphicon-education"></i> \
	              </span> \
	              <input name="skills[' + howMany + '][]" placeholder="Skill" type="text" class="form-control" required="required"> \
	            </div> \
	          </div> \
	          <div class="col-md-4"> \
	            <div class="input-group"> \
	              <span class="input-group-addon"> \
	                <i class="fa fa-trophy"></i> \
	              </span> \ <input name="skills[' + howMany + '][]" placeholder="Level (0 to 20)" type="text" class="form-control" required="required"> \
	            </div> \
	          </div> \
	          <button id="delete" class="btn btn-default delete" style="width=40px;">Delete</button> \
	        </div>'
   		);
  	});
	$("body").on("click", ".delete", function (e) {
		$(this).parent("div").remove();
  	})

	$('#tokenfield').tokenfield({});


});