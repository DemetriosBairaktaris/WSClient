hostName = "http://localhost:8081";

function getRegisterHtml() {
    var html = getCustomerSignUpForm();
    return html;
}

function getSuccessMsg( msg ) {
    var html =
        `
        <div class="pure-u-4-5 island message success-message center ">
            <p>Success: ` +
        msg + `</p>
        </div>
    `;
    return html;
}

function getFailureMsg( msg ) {
    var html =
        `
        <div class="pure-u-4-5 island message failure-message center ">
            <p>Failure: ` +
        msg + `</p>
        </div>
    `;
    return html;
}

function getCustomerSignUpForm() {
    var html =
        `
    <div id="register-form" class="pure-form pure-u-4-5 center island">
                <fieldset>
                <legend class="main-color-header">Register New Customer Account</legend>
                    <div class= "pure-u-3-5">
                     <input id = "userName" type="email" placeholder="Email">
                     <input id = "password" type="password" placeholder="Password">
                     <input id = "firstName" type="text" placeholder="First Name">
                     <input id = "lastName" type="text" placeholder="Last Name">
                     <input id = "address" type="text" placeholder="Address">
                     <input id = "phone" type="text" placeholder="Phone">



                         <input id="cardNumber" type="text" placeholder="Credit Card #">
                         <input id="cardName" type="text" placeholder="Credit Card Type">
                         <input id="cvv" type="text" placeholder="CVV">
                         <input id="expiration" type="date" placeholder="Expiration">
                     </div>

                     </fieldset>

                     <div class="pure-button-group pure-u-3-5" role="group">
                        <button id="customer-button"class="pure-button pure-button-active">Customer</button>
                        <button id = "partner-button" class="pure-button">Partner</button>
                    </div>
                     <h6>Register as customer or partner</h6>
                    <div class="pure-u-2-5">
                        <button id="register-submit-button" type="submit" class="pure-button pure-button-inverted">Register</button>
                        <a onclick="location.reload()">Sign In</a>
                    </div>


            </div> `
    return html;
}

function getPartnerSignUpForm() {
    var html =
        `
    <div id="register-form"class="pure-form pure-form-stacked pure-u-4-5 center island">
                <fieldset>
                <legend class="main-color-header">Register New Partner Account</legend>
                    <div class= "pure-u-3-5">
                     <input id = "userName" type="email" placeholder="Email"  required>
                     <input id="password" type="password" placeholder="Password"  >
                     <input  id = "name" type="text" placeholder="Company Name"  required >
                     <input  id = "address" type="text" placeholder="Address"  required >
                     <input  id = "phone" type="text" placeholder="Phone" required>
                     </div>

                     </fieldset>

                     <div class="pure-button-group pure-u-3-5" role="group">
                        <button id="customer-button"class="pure-button ">Customer</button>
                        <button id = "partner-button" class="pure-button pure-button-active">Partner</button>
                    </div>
                     <h6>Register as customer or partner</h6>
                    <div class="pure-u-2-5">
                        <button id="register-submit-button" type="submit" class="pure-button pure-button-inverted">Register</button>
                        <a onclick="location.reload()">Sign In</a>
                    </div>

            </div> `
    return html;
}

function registerTypeIsCustomer() {
    var $button = $( ".pure-button-active" );
    if ( $button.attr( "id" ) == 'customer-button' ) {
        return true;
    } else {
        return false;
    }
}

function applyRegisterLogic() {
    $buttonGroup = $( "#register-form .pure-button-group" );
    $buttonGroup.children()
        .on( "click", function() {
            $buttonGroup.children()
                .removeClass( "pure-button-active" );
            $( this )
                .addClass( "pure-button-active" );
            $main = $( "main" );
            var isCustomerRegistration = registerTypeIsCustomer();
            $main.empty();
            if ( isCustomerRegistration ) {
                $main.append( getCustomerSignUpForm() );
            } else {
                $main.append( getPartnerSignUpForm() );
            }
            applyRegisterLogic(); //psudo-recursion, coooooool
        } );
    $( "#register-submit-button" )
        .on( "click", function() {
            $( ".message" )
                .remove();
            if ( registerTypeIsCustomer() ) {
                handleCustomerRegister();
            } else {
                handlePartnerRegister();
            }
        } );
}

function collectFromForm( objectName ) {
    var data = {}
    data[ objectName ] = {}
    var $inputs = $( "#register-form * input" );
    for ( var i = 0; i < $inputs.length; i++ ) {
        data[ objectName ][ $inputs[ i ].id ] = String( $( $inputs[ i ] )
            .val() );
        console.log( JSON.stringify( data[ objectName ] ) );
    }
    return JSON.stringify( data );
};

function collectFromLogin() {
    var data = {}
    data[ "Login" ] = {}
    var $inputs = $( "#sign-in-form * input" );
    for ( var i = 0; i < $inputs.length; i++ ) {
        data[ "Login" ][ $inputs[ i ].id ] = String( $( $inputs[ i ] )
            .val() );
        console.log( JSON.stringify( data[ "Login" ] ) );
    }
    return JSON.stringify( data );
};

function handleCustomerRegister() {
    console.log( collectFromForm( "Customer" ) );
    var url = hostName + "/customers/";
    var dataType = "json";
    var verb = "POST";
    var contentType = "application/json";
    var accepts = "application/json";
    $.ajax( {
        jsonp: false,
        dataType: dataType,
        accepts: accepts,
        contentType: contentType,
        type: verb,
        url: url,
        data: collectFromForm( "Customer" ),
        success: function( data ) {
            console.log( data );
            registerSuccess( data.Customer.userName + " has been created" );
        },
        error: function( data, status, err ) {
            if ( Number( data.status ) == 200 ) {
                registerSuccess( "Customer has been created" );
                //ask me later
            } else {
                console.log( data );
                console.log( status );
                console.log( err );
                registerFailure( "Could not create customer" );
            }
        }
    } );
};

function handlePartnerRegister() {
    console.log( collectFromForm( "Partner" ) );
    var url = hostName + "/partners";
    var dataType = "json";
    var verb = "POST";
    var contentType = "application/luc.partners+json";
    var accepts = "application/luc.partners+json";
    $.ajax( {
        accepts: accepts,
        contentType: contentType,
        type: verb,
        url: url,
        data: collectFromForm( "Partner" ),
        success: function( data ) {
            console.log( "///////////" );
            console.log( data );
            $( "#current-user" )
                .text( data.Partner.userName );
            currentUser = data.Partner.userName;
            addProducts.initialize( data.Partner.link ); //need to see
            //registerSuccess( data.Partner.userName + " has been created");
        },
        error: function( data ) {
            registerFailure( "Could not create Partner" );
        },
        dataType: dataType
    } );
};

function registerSuccess( msg ) {
    var $main = $( "main" );
    $main.prepend( getSuccessMsg( msg ) );
};

function registerFailure( msg ) {
    var $main = $( "main" );
    $main.prepend( getFailureMsg( msg ) );
};

function loginFailure(msg) {
  var $main = $("main");
  $main.prepend(getFailureMsg(msg));
}

function applySignInLogic() {
  $( "#sign-in-button" )
      .on( "click", function() {
        console.log("Button works.")
        login();
      }
    );
}

function login() {
  var url = hostName + "/login?key=123456789";
  var dataType = "json";
  var verb = "PUT";
  var contentType = "application/luc.login+json";
  var accepts = "application/luc.partners+json, application/luc.customers+json";
  console.log("Logging in now...");
  $.ajax( {
      accepts: accepts,
      contentType: contentType,
      type: verb,
      url: url,
      data: collectFromLogin(),
      success: function( data ) {
          console.log( "Login successful" );
          console.log( data );
      },
      error: function( data ) {
          loginFailure( "Could not login..." );
      },
      dataType: dataType
  } );
}
