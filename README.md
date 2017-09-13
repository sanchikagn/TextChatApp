# TextChatApp
A WebRTC one to one text chat application using simplewebrtc library

Getting Started
1. To get the Node.js Express server running locally (for initial connection establishment): Run the project by executing 'npm start' inside the project location.
2. To install any dependency module, 'npm install <module_name>' within the node_modules directory, and update package.jsin with name and version of it.
3. Request the chat feature by 'https://localhost:8080/cam' in the browser.

Features
1. Peer-to-Peer connection.
2. HTTPS connection between the members.

Application Structure

      app.js - The entry point to the application.

      package.json - This file provides identifiers for all the npm dependency modules used in the application

      bin/ The basic event listeners for the server

      cred/ This includes the certificate and key required for https connection

      node_modules/ This directory includes all the npm modlues needed

      public/ This directory for images, stylesheets and javascripts

      routes/ This includes the routes for each request

      views/ The basic view pages
	
Steps

In app.js;
1. Import all the npm modules required as follows:

	    var express = require('express');
2. Create an express app:

	    var app = express();
	 
3. Provide a key and a certificate for https connection and bind them along with the express 'app' to the https server:

	    var credentials = {key: privateKey, cert: certificate};
	    var httpsServer = https.createServer(credentials, app);

4. Allow the server to listen on an appropriate port:

	    httpsServer.listen(8080);

In index.js:
1. Import required npm modules
2. Provide a GET route to serve 'chat.html':

	    router.get('/cam',function(req,res){
    	console.log(req.url);
    	res.sendFile('chat.html', { root: path.join(__dirname, '../views') });
	    }); 

In chat.html:
1. Add a reference to 'simplewebrtc' library and Jquery library:
	   
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    	  <script src="https://simplewebrtc.com/latest-v2.js"></script>
2. Include a textbox, button and a textarea to diplay the text chat:

	    <input name="message" id="text" type="text" />
        <input name="button" onclick="setText(getElementById('text').value)" type="button" value="Send" id="send"/>
        <textarea name="reply" id="messages" rows="10" cols="50"></textarea>
   All these elements are referenced further by using their ids.
3. A javascript function to get the message from a peer in the chat:

	    function setText(UserMsg) {
            console.log(UserMsg);
            return UserMsg;
       }
4. Create a SimpleWebRTC object using its constructor, and set its video element attributes to null and 'autoRequestMedia: false'.
5. When receiving a text message from the other peer, the message from the message is appended to the textarea (#messages), and '&#10;' (new line) after every message:
	    
          webrtc.connection.on('message', function(data){
            console.log("Received");
            if(data.type === 'chat'){
                console.log('chat received',data.payload.message);
                $('#messages').append('<br>' + data.payload.nick + ': <br>' + data.payload.message + '&#10;');
            }
          });
6. When a message is sent by a peer (when Send button is clicked), the  value of textbox (#text) is sent to the other peer, and the value of textbox is set to null.

        $('#send').click(function(){
            var msg = $('#text').val();
            webrtc.sendToAll('chat', {message: msg, nick: webrtc.config.nick});
            $('#messages').append('<br>You: <br>' + msg + '&#10;');
            $('#text').val('');
        });

