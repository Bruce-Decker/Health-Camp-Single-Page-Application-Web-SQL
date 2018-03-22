function video() {
  var db = openDatabase('mytasks', '1.0', 'My Tasks', 2 * 1024 * 1024);
         db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (first_name, last_name, gender, age, photo, notes)');
            
	     });
	var dataURL;
	var video = document.getElementById('video'),
	    canvas = document.getElementById('canvas'),
	   
	    context = canvas.getContext('2d'),
	    vendorUrl = window.URL || window.webkitURL;
	navigator.getMedia = navigator.getUserMedia ||
	                     navigator.webkitGetUserMedia ||
	                     navigator.mozGetUserMedia ||
	                     navigator.msGetUserMedia;

	navigator.getMedia ({
		video: true,
		audio: false
	}, function(stream) {
         video.src = vendorUrl.createObjectURL(stream);
         video.play();
	}, function(error) {

	});

	document.getElementById('form_button').addEventListener('click', function() {
          context.drawImage(video, 0, 0, 400, 300);
            dataURL = canvas.toDataURL();
          
          var first_name = document.getElementById('FirstName').value;
          var last_name = document.getElementById('LastName').value;
          var gender = document.getElementById('Gender').value;
          var age = document.getElementById('Age').value;
          var notes = document.getElementById('Notes').value;
          var photo = dataURL
          
         db.transaction(function(tx) {
            tx.executeSql('INSERT INTO LOGS (first_name, last_name, gender, age, photo, notes) VALUES (?, ?, ?, ?, ?, ?)', [first_name, last_name, gender, age, photo, notes]);
	     });

	});
}

function health_vitals() {
    var db2 = openDatabase('Health Vitals', '1.0', 'health vitals', 2 * 1024 * 1024);
         db2.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS HEALTH (height, weight, temperature, pulse, blood_pressure, medications)');
            
       });

         document.getElementById('health_vitals_button').addEventListener('click', function() {
          var height = document.getElementById('height').value;
          var weight = document.getElementById('weight').value;
          var temperature = document.getElementById('temperature').value;
          var pulse = document.getElementById('pulse').value;
          var bloodPressure = document.getElementById('bloodPressure').value;
          var medications = document.getElementById('medications').value;

          
         db2.transaction(function(tx) {
            tx.executeSql('INSERT INTO HEALTH (height, weight, temperature, pulse, blood_pressure, medications) VALUES (?, ?, ?, ?, ?, ?)', [height, weight, temperature, pulse, bloodPressure, medications]);
       });

  });

}

function report() {
	var db = openDatabase('mytasks', '1.0', 'My Tasks', 2 * 1024 * 1024);
         db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (first_name, last_name, gender, age, photo, notes)');
	     });
	     db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
               var len = results.rows.length, i;
               var s = '<h1> Demographics Table </h1>'
                s += '<table class = "table">';
               s += '<thead> <tr> <th> id </th><th> First Name </th> <th> Last Name </th> <th> Gender</th> <th> Age </th> <th> Photo </th> <th> Notes </th> </tr> </thead>';
               for (i = 0; i < len; i++){
               	  var info = results.rows.item(i)
               	  var link = info.photo

               	  s += '<tbody> <tr>';
                  s += '<td>' + i + '</td>';
               	  s += '<td>' + info.first_name + '</td>';
               	  s += '<td>' + info.last_name + '</td>';
               	  s += '<td>' + info.gender + '</td>';
               	  s += '<td>' + info.age + '</td>';
               	  s += '<td> <img src="' + link +  '" alt="W3Schools.com" height="200" width="200"> </td>'
               	  s += '<td>' + info.notes + '</td>';
               }
               s += '</tbody></table>';
               document.getElementById('result').innerHTML = s;
               
            }, null);
         });

       var db2 = openDatabase('Health Vitals', '1.0', 'health vitals', 2 * 1024 * 1024);
         db2.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS HEALTH (height, weight, temperature, pulse, blood_pressure, medications)');
       });

      db2.transaction(function (tx) {
            tx.executeSql('SELECT * FROM HEALTH', [], function (tx, results) {
               var len = results.rows.length, i;
               var s = '<h1> Health Vitals Table </h1>'
                s += '<table class = "table">';
               s += '<thead> <tr> <th> id </th><th> Height </th> <th> Weight </th> <th> Temperature </th> <th> Pulse </th> <th> Blood Pressure </th> <th> Medications </th> </tr> </thead>';
               for (i = 0; i < len; i++){
                  var info = results.rows.item(i)
                 

                  s += '<tbody> <tr>';
                  s += '<td>' + i + '</td>';
                  s += '<td>' + info.height + '</td>';
                  s += '<td>' + info.weight + '</td>';
                  s += '<td>' + info.temperature + '</td>';
                  s += '<td>' + info.pulse + '</td>';
                  s += '<td>' + info.blood_pressure + '</td>';
                  s += '<td>' + info.medications + '</td>';
               }
               s += '</tbody></table>';
               document.getElementById('healthResult').innerHTML = s;
               
            }, null);
         });
}



