var customerView = {

	initialize: function(links){
		$("main").fadeOut(function(){
			$("main").empty() ;
			$("main").fadeIn() ;
		var i = 0 ;
		links.forEach(function(link){
			console.log(i+=1) ;
			if(link.rel=="Update customer information."){
				console.log("Update customer") ;
				setUpUpdateCustomerInfo(link) ;
			}
			else if(link.rel =="Delete customer."){
				setUpDeleteCustomer(link) ;
			}
			else if (link.rel =="search products"){
				setUpSearchProducts(link) ;
			}
		});
		}) ;
	}
} ;

function setUpUpdateCustomerInfo(link){
	$("main").append(getCustomerUpdateForm()) ;
	$("#update-submit-button").on("click",function(){
		console.log(collectFromCustomerUpdateForm());
		var url = hostName + link.uri + "?key=123456789";

		console.log( url );
		var verb = "PUT";
		var contentType = "application/luc.customers+json" ;
		var accepts = "application/luc.customers+json";

		$.ajax( {
			accepts: accepts,
			contentType: contentType,
			type: verb,
			url: url,
			dataType: "json",
			data: collectFromCustomerUpdateForm(),
			success: function( data ) {
				$("main").prepend(getSuccessMsg("Updated Your Account")) ;
			},
			error: function( data ) {
				if(data.status < 300){
					$(".success-message").remove() ;
					$("main").prepend(getSuccessMsg("Updated Your Account")) ;

				}
				else{
					console.log(data) ;
					$( "main" )
						.prepend( getFailureMsg( "Could Not Update" ) ) ;
						$(".message").fadeOut(8000) ; 
				}
			}
		});
	});

}

function setUpDeleteCustomer(link){
	$("main").append(getCustomerDeleteForm()) ;
	$("#delete-customer").on("click",function(){
		var url = hostName + link.uri + "?key=123456789";
		var verb = "DELETE";
		var accepts = "application/luc.customers+json";
		console.log( url );
		$.ajax( {
			accepts: accepts,
			type: verb,
			url: url,
			success: function( data ) {
				$( "main" )
					.empty();
				$( "main" )
					.append( getSuccessMsg( "Deleted Your Account" ) );
			},
			error: function( data ) {
				$( "main" )
					.append( getFailureMsg( "Could Not Delete" ) )
			}
		} );
		});
}

function setUpSearchProducts(link){
	$("main").append(getSearchProductForm());
	$("#search-item-button").on("click",function(){
		var searchTerm = $("#item-search").val();
		var url = hostName + link.uri + searchTerm +"?key=123456789";
		var verb = "GET";
		var accepts = "application/luc.products+json";
		console.log( url );
		$.ajax( {
			accepts: accepts,
			type: verb,
			url: url,
			success: function( data ) {
				console.log(data) ;
				displaySearchResults(data) ;
			},
			error: function( data ) {
				$( "main" )
					.prepend( getFailureMsg( "Could not search...." ));
			}
		});
	});
} ;


function getContainer(){

	return `<div class="container island center pure-u-4-5"></div>` ;
}

function getCustomerUpdateForm() {
    var html =
        `
    <div id="update-form" class="pure-form pure-u-4-5 center island">
                <fieldset>
                <legend class="main-color-header">Update Account</legend>
                    <div class= "pure-u-3-5">
                     <input id = "password" type="password" placeholder="Password">
                     <input id = "firstName" type="text" placeholder="First Name">
                     <input id = "lastName" type="text" placeholder="Last Name">
                     <input id = "address" type="text" placeholder="Address">
                     <input id = "phone" type="text" placeholder="Phone">



                         <input id="cardNumber" type="text" placeholder="Credit Card #">
                         <input id="cardName" type="text" placeholder="Credit Card Type">
                         <input id="cvv" type="text" placeholder="CVV">
                         <input id="expiration" type="text" placeholder="Expiration">
                     </div>

                     </fieldset>

                    <div class="pure-u-2-5">
                        <button id="update-submit-button" type="submit" class="pure-button pure-button-inverted">Update</button>
                    </div>


            </div> `
    return html;
}

function getCustomerDeleteForm(){
	return `

		<div class='island center pure-u-4-5 pure-form'>
			<legend>Delete your Account</legend>
			<button id='delete-customer' class='pure-button pure-button-danger pure-u-3-5'>Delete Account</button>
		</div>
	`;
} ;

function getSearchProductForm(){

	return `
		<div id='search-item-form' class='island center pure-form pure-u-4-5'>
			<legend>Search Item</legend>
			<input id='item-search' placeholder='enter an item name...' class="pure-u-4-5">
			<button id="search-item-button" class='pure-button'>Search</button>
		</div>
	`;

} ;


function collectFromCustomerUpdateForm( ) {
	var objectName = "Customer" ;
    var data = {}
    data[ objectName ] = {}
    var $inputs = $( "#update-form * input" );
    for ( var i = 0; i < $inputs.length; i++ ) {
        data[ objectName ][ $inputs[ i ].id ] = String( $( $inputs[ i ] )
            .val() );
        console.log( JSON.stringify( data[ objectName ] ) );
    }
    data[ objectName ]["userName"] = currentUser ;
    return JSON.stringify( data );
};


function displaySearchResults(data){
	var Product = data.Product ;
	var links = null ;
	if (data.Product.length > 0){
		links = data.Product[0].link ;

	}
	console.log(data.Product.length) ;
	$(".table").remove()
	var rows = "" ;
	data.Product.forEach(function(product){
		var td = "<td>" ;
		rows += "<tr class='table-row'>" +
			td + product.name + "</td>"+
			td +"$"+ product.cost + "</td>"+
			td + product.companyUserName + "</td>"+
			td + product.desc + "</td>"+
			td + product.stock + " in stock</td>"+
			"<td class>" + ""
		"</tr>"
	});
	var table = `
	<H3 class="table"> Search Results</H3>
	<table class="center table pure-table pure-table-horizontal">

    	<tbody>
        ` + rows + `
	    </tbody>
	</table>
		<button id = 'order-button' class= 'table pure-button'>Order</button>
		<input id='order-amount' class = 'table' type='number'>
		<button id='get-reviews-button' class='table pure-button pure-button-inverted'>Get Reviews</button>
	`

	$("#search-item-form").hide() ;
	$("#search-item-form").append(table) ;
	$("#search-item-form").slideDown() ;

	if(data.Product.length == 0){
		$("#order-button").remove() ;
		$("#order-amount").remove() ;
		$("#get-reviews-button").remove() ; 
	}
	$("#order-button").on("click",function(){
		var order = {} ;
		order["Orders"] = {"requests":[]} ;
		var orders = order["Orders"]["requests"]  ;
		orders.push(
			{"quantity": $("#order-amount").val(),
				"productName": Product[0].name ,
				"customer": currentUser

			});
		links.forEach(function(link){
			if(link.action == "POST"){
				sendOrder(order,link) ;
			}
		});	
		
	}) ;

	$("#get-reviews-button").on("click",function(){
		links.forEach(function(link){
			if(link.action == "GET"){
				getReviews(link) ; 
			}
		});	
	});
};

function displayReviews(reviews){
	var reviewsArr = reviews.review ; 

	var html = `<div id = "reviews" class='center island pure-u-4-5'><ul class = 'table pure-menu-list pure-u-4-5'>
				<h3>Product Reviews</h3>` ;
		reviewsArr.forEach(function(r){
			html += `<li class = 'pure-menu-item pure-u-23-24'>`
				+ r.review + `</li>`  ; 

		});

				html += `</ul></div>` ; 
	 ;  
	$("#reviews").remove(); 
	$("main").append(html) ; 
	$("#reviews").hide() ;
	$("#reviews").slideDown() ;
	$("#reviews").focust();
};

function getReviews(link){

	var accepts =  "application/luc.reviews+json",
		verb = "GET",
		url = hostName + link.uri + "?key=123456789"; 
	 $.ajax( {
			accepts: accepts,
			type: verb,
			url: url,
			success: function( data ) {
				console.log(data) ;
				 
				displayReviews(data) ; 
			},
			error: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				$( "main" )
					.prepend( getFailureMsg( "Could not Get Product Reviews, " + data.responseText ));
				$(".message").fadeOut(5000) ; 
			}
		});
};

function sendOrder(order,link){
	order = JSON.stringify(order) ;
	console.log(order) ;
	var url = hostName + link.uri +"?key=123456789";
		var verb = "POST";
		var contentType = "application/luc.orders+json" ;
		var accepts = "application/luc.orders+json";
		console.log( url );
		$.ajax( {
			accepts: accepts,
			type: verb,
			contentType: contentType,
			data: order,
			url: url,
			success: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				$("main").append(getSuccessMsg("Order filled, order#: " + data.Order.orderId))
				displayOrder(data.Order) ;

			},
			error: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				$( "main" )
					.prepend( getFailureMsg( "Could not Order, " + data.responseText ));
				$(".message").fadeOut(8000) ; 

			}
		});


} ;


function displayOrder(order){
	var links =  order.link ;
	var orderId = order.orderId ;
	var status = order.status;
	var timestamp = order.timestamp ;
	$("main").append(getOrdersHtml()) ;
	links.forEach(function(link){
		$("#"+link.rel.replace(" ","")).on("click",function(){
			handleOrderBehavior(link) ;
		});
	})  ;
}  ;


function getOrdersHtml(){
	return `

		<div class=' order-actions center island pure-u-2-5'>
			<button class='pure-button' id='CancelOrder'>Cancel Order</button>
			<button class='pure-button' id = 'Checkstatus'>Check Order Status</button>
		</div>
	` ;
};

function handleOrderBehavior(link){
	if(link.rel == "Check status"){
		var url = hostName + link.uri + "?key=123456789";
		var verb = "GET" ;

		$.ajax( {

			type: verb,
			url: url,
			success: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				alert("Order status: " + data) ;

			},
			error: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				$( "main" )
					.prepend( getFailureMsg( "Could not Get Order Status, " + data.responseText ));
					$(".message").fadeOut(8000) ; 
			}
		});

	}
	else{
		var url = hostName + link.uri + "?key=123456789";
		var verb = "DELETE" ;

		$.ajax( {

			type: verb,
			url: url,
			success: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				alert("Order deleted") ;
				$(".order-actions").remove() ;

			},
			error: function( data ) {
				console.log(data) ;
				$(".message").remove() ;
				$( "main" )
					.prepend( getFailureMsg( "Could not Delete Order, " + data.responseText ));
					$(".message").fadeOut(8000) ; 
			}
		});
	}
};
/*
0 {action: "PUT", contentType: "application/luc.customers+xml, application/luc.customers+json", rel: "Update customer information.", uri: "/customers"}
1 {action: "DELETE", contentType: "none", rel: "Delete customer.", uri: "/customers/pork@gmail.com"}
2 {action: "GET", contentType: "none", rel: "search products", uri: "/products/"}




Object Prototype
1 Object

companyUserName: "management@jcpenny.com"

cost: 699.5

desc: "ANDROID SMART PHONE"

link: Object

action: "POST"

contentType: "application/luc.products+json, application/luc.products+xml"

rel: "Order product"

uri: "/orders"

Object Prototype

name: "SAMSUNG GALAXY S5"

stock: 20

Object Prototype
2 {link: Object, desc: "ANDROID SMART PHONE", cost: 499.99, stock: 20, companyUserName: "management@target.com", …}

Array Prototype

Object Prototype
customerView.js:95http://localhost:8081/products/SAMSUNG GALAXY S5?key=123456789
success — customerView.js:101
{Product: Array}
*/
