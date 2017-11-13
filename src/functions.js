

function getRegisterHtml(){
	
			var html = getCustomerSignUpForm() ; 
			return html ; 
 }

 function getCustomerSignUpForm(){
 	var html =  `
	<div id="register-form"class="pure-form pure-u-4-5 center island">
    			<fieldset>
        		<legend class="main-color-header">Register Customer New Account</legend>
        			<div class= "pure-u-3-5">
        			 <input type="email" placeholder="Email">
       				 <input type="password" placeholder="Password">
       				 <input type="text" placeholder="First Name">
       				 <input type="text" placeholder="Last Name">
       				 <input type="text" placeholder="Address">
       				 <input type="text" placeholder="Phone">
       				
       				
       				 
       				 	 <input type="text" placeholder="Credit Card #">
	       				 <input type="text" placeholder="Credit Card Type">
	       				 <input type="text" placeholder="CVV">
	       				 <input type="date" placeholder="Expiration">
       				 </div>

       				 </fieldset>

       				 <div class="pure-button-group pure-u-3-5" role="group">
					    <button id="customer-button"class="pure-button pure-button-active">Customer</button>
					    <button id = "partner-button" class="pure-button">Partner</button>
					</div>
					 <h6>Register as customer or partner</h6>
					<div class="pure-u-2-5">
						<button id="register-submit-button" type="submit" class="pure-button pure-button-inverted">Register</button>
					</div>
					
    			
			</div> `
			return html ; 
 }

 function getPartnerSignUpForm(){
  var html =  `
	<div id="register-form"class="pure-form pure-u-4-5 center island">
    			<fieldset>
        		<legend class="main-color-header">Register Partner New Account</legend>
        			<div class= "pure-u-3-5">
        			 <input type="email" placeholder="Email" >
       				 <input type="password" placeholder="Password" >
       				 <input type="text" placeholder="Company Name" >
       				 <input type="text" placeholder="Address" >
       				 <input type="text" placeholder="Phone" >
       				 
       				 </div>

       				 </fieldset>

       				 <div class="pure-button-group pure-u-3-5" role="group">
					    <button id="customer-button"class="pure-button ">Customer</button>
					    <button id = "partner-button" class="pure-button pure-button-active">Partner</button>
					</div>
					 <h6>Register as customer or partner</h6>
					<div class="pure-u-2-5">
						<button id="register-submit-button" type="submit" class="pure-button pure-button-inverted">Register</button>
					</div>
    			
			</div> `
			return html ; 
 }

 function registerTypeIsCustomer(){
 	var $button = $(".pure-button-active") ; 
 	if ($button.attr("id") == 'customer-button'){
 		return true ; 
 	}
 	else{
 		return false ; 
 	}
 }

 function applyRegisterLogic(){
 	
 	$buttonGroup = $("#register-form .pure-button-group") ;  
 	$buttonGroup.children().on("click",function(){
 		$buttonGroup.children().removeClass("pure-button-active");
 		$(this).addClass("pure-button-active") ; 
 		if(registerTypeIsCustomer()){
 			$("main").empty();
 			$("main").append(getCustomerSignUpForm());
 		} 
 		else{
 			$("main").empty();
 			$("main").append(getPartnerSignUpForm());
 		}
 		applyRegisterLogic() ; //sudo-recursion, coooooool
 	}) ; 

 	$("#register-submit-button").on("click",function(){
 		alert("TODO: call to api to register user, user type is customer: " + registerTypeIsCustomer());

 	});
 }

 function applySignInLogic(){

 }