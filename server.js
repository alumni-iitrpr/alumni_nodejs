const express = require('express')
    app = express()

    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/mydb'),
    Schema = mongoose.Schema;
    var bodyParser = require('body-parser')
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
    }));

    var path = require('path')

    app.use(express.static(path.join(__dirname, 'public')));
    app.listen(8080);

var User = new Schema({
  entryNumber: String,
	userName: String,
  firstName: String,
  middleName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  bloodGroup: String,
  degree: String,
  branch: String,
  graduationYear: String,
  mobileNumber: String,
  iitRoparEmailAddress: String,
  primaryEmailAddress: String,
  alternateEmailAddress: String,
  facebookProfileLink: String,
  linkedInProfileLink: String,
  currentCompanyInstituteUniversity:  String,
  currentTitleAtCompanyInstituteUniversity: String,
  currentResidenceAddress: String,
  currentResidenceCity: String,
  currentResidenceState: String,
  currentResidenceCountry: String,
  currentResidencePINZIP: String,
  pastCompanies: String,
  permanentResidenceAddress: String,
  permanentResidenceCity: String,
  permanentResidenceState: String,
  permanentResidenceCountry: String,
  permanentResidencePINZIP: String,
  pastInstitutesUniversities: String
});

// Uncomment this code and run 'server.js' to put
// sample user data in mongodb

/* var userModel = mongoose.model('User', User);

 var user = new userModel();

 user.userName = 'harmaniitrpr@gmail.com'
 user.entryNumber = '2010CS1016';
 user.firstName = 'Harmandeep';
 user.middleName = '';
 user.lastName= 'Singh';
 user.gender= 'Male';
 user.dateOfBirth= '08-10-1992';
 user.bloodGroup= 'A+';
 user.degree= 'B.Tech.';
 user.branch= 'Computer Science & Engineering';
 user.graduationYear= '2014';
 user.mobileNumber= '+91-8105854404';
 user.iitRoparEmailAddress= 'harmandeeps@iitrpr.ac.in';
 user.primaryEmailAddress= 'harmaniitrpr@gmail.com';
 user.alternateEmailAddress= '';
 user.facebookProfileLink= 'https://www.facebook.com/harmaniit';
 user.linkedInProfileLink= 'https://in.linkedin.com/pub/harmandeep-singh/50/792/607';
 user.currentCompanyInstituteUniversity=  'CISCO Systems Inc.';
 user.currentTitleAtCompanyInstituteUniversity= 'Software Engineer';
 user.currentResidenceAddress= '1F-201, Akme Harmony Apartments, Outer Ring Road, Bellandur, Bangalore';
 user.currentResidenceCity= 'Bangalore';
 user.currentResidenceState= 'Karnataka';
 user.currentResidenceCountry= 'India';
 user.currentResidencePINZIP= '560103';
 user.pastCompanies= 'Samsung Noida';
 user.permanentResidenceAddress= 'C/O Channi Auto Service, #183A/56, Main Bhagu Road, Bathinda';
 user.permanentResidenceCity= 'Bathinda';
 user.permanentResidenceState= 'Punjab';
 user.permanentResidenceCountry= 'India';
 user.permanentResidencePINZIP= '151001';
 user.pastInstitutesUniversities= '';
 user.save(function(err) {
   if (err) throw err;
   console.log('User saved, starting server...');
 });
*/

//app.configure( function() {
//    console.log('I will be listening on: ' + config.routes.feed);
//});

app.get('/', function(request, response){
    response.sendfile('index.html');
});

app.get('/user', function(req, res) {
    console.log('here in user');
    var userModel = mongoose.model('User', User);
    userModel.findOne({'entryNumber': '2010CS1016'}, function(err, user) {
      if (user != null) {
        console.log('Found the User:' + user.userName);
        res.send(JSON.stringify(user));
      }else{
        console.log('user not found!');
        res.send('User not found!');
      }
    });
});

app.get('/userData/:emailId', function(req, res) {
    var emailId = req.params.emailId;
    console.log(emailId);
    var userModel = mongoose.model('User', User);
    userModel.findOne({'userName': emailId}, function(err, user) {
      if (user != null) {
        console.log('Found the User:' + user.userName);
        res.send(JSON.stringify(user));
      }else{
        console.log('user not found!');
        res.send('User not found!');
      }
    });
});

app.get('/userDataID/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    var userModel = mongoose.model('User', User);
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(id);
    userModel.findOne({_id: o_id}, function(err, user) {
      if (user != null) {
        console.log('Found the User:' + user.userName);
        res.send(JSON.stringify(user));
      }else{
        console.log('user not found!');
        res.send('User not found!');
      }
    });
});

app.post('/updateUserData', function(req, res){
  console.log("^^^^^")

  var newvalues = {};
  for (var param in req.body) {

    newvalues[param] = req.body[param]
   //console.log(param, req.body[param]);
}

console.log(newvalues)
   if(req.body == null){
    console.log('body is empty' );
       throw 0;
   }
   var userModel = mongoose.model('User', User);
   var myquery = { _id: req.body._id };
  // var newvalues = { userName: req.body.userName, entryNumber: req.body.entryNumber };
   userModel.updateOne(myquery, newvalues, function(err) {
       if (err) throw err;
   });
   console.log('updated* '  + req.body.username + ' ' + req.body );
   res.redirect('./login.html');
  // res.send(JSON.stringify(usr));

});
