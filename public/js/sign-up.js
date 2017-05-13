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


$(document).ready(function($) {
  //when the Add Filed button is clicked
  	$("#add").click(function (e) {
    //Append a new row of code to the "#items" div
    	$("#items").append(
	        '<div class="form-group"> \
	          <div class="col-md-6"> \
	            <div class="input-group"> \
	              <span class="input-group-addon"> \
	                <i class="glyphicon glyphicon-education"></i> \
	              </span> \
	              <input name="input[]" placeholder="Skill" type="text" class="form-control" required="required"> \
	            </div> \
	          </div> \
	          <div class="col-md-4"> \
	            <div class="input-group"> \
	              <span class="input-group-addon"> \
	                <i class="fa fa-trophy"></i> \
	              </span> \ <input name="input[][]" placeholder="Level (0 to 20)" type="text" class="form-control" required="required"> \
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

	$("#contact_form").submit(function(e) {
	    e.preventDefault(); // Prevents the page from refreshing
	    $(this.confirm_password).remove(); //removing field 1 from query
		$("#submit_contact").attr("data-toggle", "collapse");
		$("#submit_contact").click();
	    var $this = $(this); // `this` refers to the current form element
	    var data = JSON.stringify($(this).serializeFormJSON());
	    console.log(data);
	    $.post(
	        $this.attr("action"), // Gets the URL to sent the post to
	        $this.serialize(), // Serializes form data in standard format
	        function(data) { 
	        	console.log("success");
 			},
	        "json" // The format the response should be in
	    );
	});

	$("#hobbies_form").submit(function(e) {
	    e.preventDefault(); // Prevents the page from refreshing
		$("#submit_bio").attr("data-toggle", "collapse");
		$("#submit_bio").click();
	    var $this = $(this); // `this` refers to the current form element
	    var data = JSON.stringify($(this).serializeFormJSON());
	     console.log(data);
	    $.post(
	        $this.attr("action"), // Gets the URL to sent the post to
	        $this.serialize(), // Serializes form data in standard format
	        function(data) { 
	        	console.log("success");
 			},
	        "json" // The format the response should be in
	    );
	});

	$("#skills_form").submit(function(e) {
	    e.preventDefault(); // Prevents the page from refreshing
		$("#submit_skills").attr("data-toggle", "collapse");
		$("#submit_skills").click();
	    var $this = $(this); // `this` refers to the current form element
	    var data = JSON.stringify($(this).serializeFormJSON());
	     console.log(data);
	    $.post(
	        $this.attr("action"), // Gets the URL to sent the post to
	        $this.serialize(), // Serializes form data in standard format
	        function(data) { 
	        	console.log("success");
 			},
	        "json" // The format the response should be in
	    );
	});

});