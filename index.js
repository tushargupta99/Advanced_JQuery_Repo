// main document ready function to check if dom is loaded fully or not

let myFacebookToken;

$(document).ready(() => {

   myFacebookToken = prompt("Please enter your Facebook Token:");

   if (myFacebookToken == null || myFacebookToken == "") {

      alert("No user Token found");

   } else {

      getAllDetails();

   } // end if condition

}); // end document.ready function

let getAllDetails = () => {

   // API call to get user details

   $.ajax({
      type: 'GET',
      dataType: 'json',
      async: true,
      url: 'https://graph.facebook.com/me?fields=first_name,name,birthday,gender,email,quotes,hometown,cover,friends,picture.type(large)&access_token=' + myFacebookToken,

      success: (response) => {

         $('#dataSection').css('display', 'block');

         console.log(response);

         $('#navbar_profile-pic').html('<img src="' + response.picture.data.url + '" class="img-fluid rounded-circle"/>');

         $('#navbar_userName').append(response.first_name);

         $('#userName').append(response.name);

         $('#favouritrQuote').append(response.quotes);

         $('#birthdate').append(response.birthday);

         $('#email').append(response.email);

         $('#friends_count').append(response.friends.summary.total_count);

         $('#gender').append(response.gender);

         $('#homeTown').append(response.hometown.name);

         $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

         $('#cover').css('background-image', 'url(' + response.cover.source + ')');

      },
      error: (err) => {
         console.log(err.responseJSON.error.message);
         alert(err.responseJSON.error.message)
      }
   }); // end ajax call 
}