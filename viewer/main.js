import Firebase from 'firebase';

const fbRef = new Firebase('https://formbuild.firebaseio.com/');

let formMarkup = document.getElementById('formMarkup');
fbRef.once('value', snap => {
  formMarkup.innerHTML = snap.val().rendered;
});

console.log('wat');
