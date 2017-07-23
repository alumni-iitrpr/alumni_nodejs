// Enter an API key from the Google API Console:
//   https://console.developers.google.com/apis/credentials
var apiKey = 'AIzaSyAhw3tZd94PP6FQovae63JzLfjQOgXK71s';

// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];

// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
var clientId = '799476000742-s7vtgmtuj90p1mbp1bigghd2msoumh7r.apps.googleusercontent.com';

// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
var scopes = 'profile https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var loginLogoutButton = document.getElementById('loginLogout-button');
var editButton = document.getElementById('edit-button');
var signIn = false;

function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
    //loginLogoutButton..style.display = 'none';
    loginLogoutButton.style.visibility = 'visible';
    //loginLogoutButton.onclick = handleAuthClick;
  });
}

function updateSigninStatus(isSignedIn)
{

  if (isSignedIn)
  {
  //  authorizeButton.style.display = 'none';
//    signoutButton.style.display = 'block';

    loginLogoutButton.innerHTML = "Logout";
    loginLogoutButton.onclick = handleSignoutClick;
    editButton.style.visibility = 'visible';
    userProfile.style.visibility = 'visible';

    signIn = true;
    document.getElementById("isLogin").innerHTML="true";
    makeApiCall();
  }
  else
  {
  //  authorizeButton.style.display = 'block';
//    signoutButton.style.display = 'none';
    loginLogoutButton.onclick = handleAuthClick;
    document.getElementById("isLogin").innerHTML="false";
    loginLogoutButton.innerHTML = "Login";
    editButton.style.visibility = 'none';
    userProfile.style.visibility = 'none';

  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
  localStorage.setItem("isLogin", "true");
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  localStorage.removeItem("isLogin");
  localStorage.removeItem("id");
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {

    console.log('hello')
    gapi.client.load('oauth2', 'v2', function() {
    gapi.client.oauth2.userinfo.get().execute(function(resp) {
      // Shows user email
    console.log(resp.email);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/userData/"+resp.email, false);
    xhr.send();
      getAndShowUserData(JSON.parse(xhr.responseText))
    })
  });

  gapi.client.load('plus', 'v1', function() {
    gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(resp) {
      // Shows profile information
      console.log(resp);
    })
  });


}

function getAndShowUserData(resp){

  localStorage.setItem("id", resp._id);
  document.getElementById('userName').innerHTML=resp.firstName
  document.getElementById('fullName').innerHTML=resp.firstName+resp.middleName+resp.lastName
  document.getElementById('entryNumber').innerHTML=resp.entryNumber
  document.getElementById('email').innerHTML=resp.userName
  document.getElementById('gender').innerHTML=resp.gender
  document.getElementById('dateOfBirth').innerHTML=resp.dateOfBirth
  document.getElementById('bloodGroup').innerHTML=resp.bloodGroup
  document.getElementById('degree').innerHTML=resp.degree
  document.getElementById('branch').innerHTML=resp.branch
  document.getElementById('graduationYear').innerHTML=resp.graduationYear
  document.getElementById('mobileNumber').innerHTML=resp.mobileNumber
  document.getElementById('iitRoparEmailAddress').innerHTML=resp.iitRoparEmailAddress
  document.getElementById('primaryEmailAddress').innerHTML=resp.primaryEmailAddress
  document.getElementById('alternateEmailAddress').innerHTML=resp.alternateEmailAddress
  document.getElementById('facebookProfileLink').innerHTML=resp.facebookProfileLink
  document.getElementById('linkedInProfileLink').innerHTML=resp.linkedInProfileLink
  document.getElementById('currentCompanyInstituteUniversity').innerHTML=resp.currentCompanyInstituteUniversity
  document.getElementById('currentTitleAtCompanyInstituteUniversity').innerHTML=resp.currentTitleAtCompanyInstituteUniversity
  document.getElementById('currentResidenceAddress').innerHTML=resp.currentResidenceAddress
  document.getElementById('currentResidenceCity').innerHTML=resp.currentResidenceCity
  document.getElementById('currentResidenceState').innerHTML=resp.currentResidenceState
  document.getElementById('currentResidenceCountry').innerHTML=resp.currentResidenceCountry
  document.getElementById('currentResidencePINZIP').innerHTML=resp.currentResidencePINZIP
  document.getElementById('pastCompanies').innerHTML=resp.pastCompanies
  document.getElementById('permanentResidenceAddress').innerHTML=resp.permanentResidenceAddress
  document.getElementById('permanentResidenceCity').innerHTML=resp.permanentResidenceCity
  document.getElementById('permanentResidenceState').innerHTML=resp.permanentResidenceState
  document.getElementById('permanentResidenceCountry').innerHTML=resp.permanentResidenceCountry
  document.getElementById('permanentResidencePINZIP').innerHTML=resp.permanentResidencePINZIP
  document.getElementById('pastInstitutesUniversities').innerHTML=resp.pastInstitutesUniversities


  console.log('Log is: *****')
  console.log(resp)


}
