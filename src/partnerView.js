partnerView = {
	initialize: function( links ) {
		$( "main" )
			.empty();
		$( "main" )
			.append( getAddItemForm() )
		addLinks( links );
	}
}

function handleDelete( link ) {
	var url = hostName + link.uri + "?key=123456789";
	var verb = "DELETE";
	var accepts = "application/luc.partners+json";
	console.log( url );
	$.ajax( {
		accepts: accepts,
		type: verb,
		url: url,
		success: function( data ) {
			$( "main" )
				.empty();
			$( "#current-user" )
				.remove();
			$( "main" )
				.append( getSuccessMsg( "Deleted Your Account" ) );
		},
		error: function( data ) {
			$( "main" )
				.append( getFailureMsg( "Could Not Delete" ) )
		}
	} );
};

function handlePut( link ) {
	var inputValue = $( "#" + link.rel.replace( ".", "" )
			.replace( " ", "" ) + "_input" )
		.val();
	var url = hostName + link.uri  ; 
	url = url.split( "{" )[ 0 ] + inputValue;
	url +=  "?key=123456789"; 
	console.log( url );
	var verb = "PUT";
	var accepts = "application/luc.partners+json";
	console.log( url );
	$.ajax( {
		accepts: accepts,
		type: verb,
		url: url,
		success: function( data ) {
			$("main").
				prepend( getSuccessMsg("Updated")) ; 
			$(".message").fadeOut(10000)  ; 
		},
		error: function( data ) {
			$( "main" )
				.append( getFailureMsg( "Could Not Update" ) )
		}
	} );
};

function collectFromProductForm() {
	var data = {}
	var objectName = "Product";
	data[ objectName ] = {}
	var $inputs = $( "#add-product-form * input" );
	for ( var i = 0; i < $inputs.length; i++ ) {
		data[ objectName ][ $inputs[ i ].id ] = String( $( $inputs[ i ] )
			.val() );
	}
	data[ objectName ][ "companyUserName" ] = currentUser;
	console.log( data );
	return JSON.stringify( data );
}

function handleAddProduct( link ) {
	var url = hostName + link.uri + "?key=123456789";
	var dataType = "json";
	var verb = "POST";
	var contentType = "application/luc.products+json";
	var accepts = "application/json";
	console.log( url );
	console.log( collectFromProductForm() );
	$.ajax( {
		jsonp: false,
		dataType: dataType,
		accepts: accepts,
		contentType: contentType,
		type: verb,
		url: url,
		data: collectFromProductForm(),
		success: function( data ) {
			console.log( data );
			$( "main" )
				.prepend( getSuccessMsg( "Created Product" ) );
			setTimeout( function() {
				$( ".success-message" )
					.fadeOut( 3000, function() {
						$( ".success-message" )
							.remove();
					} );
			}, 3000 );
		},
		error: function( data, status, err ) {
			if ( Number( data.status ) == 200 ) {
				//ask me later
			} else {}
		}
	} );
};
/**
0 {action: "DELETE", contentType: "none", rel: "Delete account", uri: "/partners/sjobs@apple.com"}
1 {action: "PUT", contentType: "none", rel: "Update name.", uri: "/partners/sjobs@apple.com/{newName}"}
2 {action: "PUT", contentType: "none", rel: "Update address.", uri: "/partners/sjobs@apple.com/{newAddress}"}
3 {action: "PUT", contentType: "none", rel: "Update phone.", uri: "/partners/sjobs@apple.com/{newPhone}"}
4 {action: "POST", contentType: "application/luc.products+xml, application/luc.products+json", rel: "add products", uri: "/products"}
**/
function gimmeGenericForm( link ) {
	var html = "";
	if ( link.action == "DELETE" ) {
		html = `
		<legend>` + link.rel.replace( ".", "" ) +
			`</legend>
		<div class='pure-u-5-5'>
		<button id=` + link.rel.replace( ".",
				"" )
			.replace( " ", "" ) +
			` class="pure-button pure-button-inverted">Submit</button>
		</div>
	`;
		$( "#add-product-form" )
			.append( html );
		$( "#" + link.rel.replace( ".", "" )
				.replace( " ", "" ) )
			.on( "click", function() {
				console.log( "deleting event..." );
				handleDelete( link );
			} );
	} else {
		html = `
		<legend>` + link.rel.replace( ".", "" ) +
			`</legend>
		<div class='pure-u-5-5'>
		<input id = ` + link.rel.replace(
				".", "" )
			.replace( " ", "" ) + "_input" + ` type="text" placeholder=` + link.rel +
			`>
		<button id=` + link.rel.replace( ".", "" )
			.replace( " ", "" ) +
			` class="pure-button pure-button-inverted">Submit</button>
		</div>
	`;
		$( "#add-product-form" )
			.append( html );
		$( "#" + link.rel.replace( ".", "" )
				.replace( " ", "" ) )
			.on( "click", function() {
				handlePut( link );
			} );
	}
}

function addLinks( links ) {
	links.forEach( function( link ) {
		console.log( link.action );
		if ( link.contentType == "none" ) {
			gimmeGenericForm( link )
		} else if ( true ) {
			$( "#product-submit-button" )
				.on( "click", function() {
					handleAddProduct( link );
				} );
		}
	} );
};

function getAddItemForm() {
	var html =
		`

		<div id='add-product-form' class='pure-form pure-u-4-5 island center'>
			<fieldset>
        		<legend class="main-color-header">Add a product...</legend>
        			<div class= "pure-u-3-5">
        			 <input id = "name" type="text" placeholder="Product Name">
       				 <input id = "cost" type="text" placeholder="Cost">
       				 <input id = 'stock' type="number" placeholder= "Stock">
       				 <input id = "desc" type="text" placeholder="Description">
       				</div>
       				<div class='pure-u-5-5'>
					    <button id="product-submit-button"class="pure-button">Add Product</button>
					  </div>
       		</fieldset>
		</div>


	`;
	return html;
};
