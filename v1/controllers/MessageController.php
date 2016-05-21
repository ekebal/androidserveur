<?php
/**
 * Listing all messages of particual user
 * method GET
 * url /messages          
 */
$app->get('/messages', 'authenticate', function() use ($app) {
    global $user_id;
    $response = array();
    $db = new MessageModel();

    $id_conversation = $app->request->get('id_conversation');
    $readed = $app->request->get('readed');
    // fetching all user messages
    $result = $db->getAllUserMessages($user_id, $id_conversation, $readed);
       // print_r($result->error);
    $response["user_id"] = $user_id;
    $response["error"] = 0;
    $response["messages"] = array();


    // looping through result and preparing messages array
    while ($message = $result->fetch_assoc()) {
        $tmp = $message;
        array_push($response["messages"], $tmp);
    }
    echoRespnse(200, $response);
});

$app->get('/messages-unread', 'authenticate', function() use ($app) {
    global $user_id;
    $response = array();
    $db = new MessageModel();

    // fetching all user messages
    $result = $db->getTotalUnreadMessagesByConversation($user_id);
       // print_r($result->error);
    $response["user_id"] = $user_id;
    $response["error"] = 0;
    $response["messages"] = array();

    // looping through result and preparing messages array
    while ($message = $result->fetch_assoc()) {
        $tmp = $message;
        array_push($response["messages"], $tmp);
    }
    echoRespnse(200, $response);
});

/**
 * Listing single message of particual user
 * method GET
 * url /messages/:id
 * Will return 404 if the message doesn't belongs to user
 */
//$app->get('/messages/:id', 'authenticate', function($id_message) {
$app->get('/messages/:id', function($id_message) {
  //  global $user_id;
    $response = array();
    $db = new MessageModel();

    // fetch message
    $result = $db->getMessage($id_message);

    if ($result != NULL) {
        $response["error"] = 0;
        foreach ($result as $key => $value) {
            $response[$key] = $result[$key];
        }
        echoRespnse(200, $response);
    } else {
        $response["error"] = 1;
        $response["message"] = "The requested resource doesn't exists";
        echoRespnse(404, $response);
    }
});


$app->post('/messages', 'authenticate', function() use ($app) {
    global $user_id;
    // check for required params
    verifyRequiredParams(array('text', 'id_reciver'));

    $response = array();
    $text = $app->request->post('text');
    $id_sender = $user_id;
    $id_reciver = $app->request->post('id_reciver');
    
    $db = new MessageModel();

    // creating new message
    $result = $db->createMessage($text, $id_sender, $id_reciver);

    if ($result != NULL) {
        $Umodel = new UserModel();

        $sender = $Umodel->getUserById($user_id);
        //Tmp:
        $NotModel = new NotificationModel();
        $titre = "Nouveau Message de {$sender['pseudo']}";
        $message = " -> " . substr($text, 0, 100) . " - ";
        $activity = "Conversations";
        $activity_data = json_encode( array( 
            'id_message' => $result['id_message'],
            'id_conversation' => $result['id_conversation']
        ) );
        $notification_id = $NotModel->createNotification($user_id, $titre, $activity, $activity_data, $message);


        $response["error"] = 0;
        $response["message"] = "message created successfully";
        $response["id_message"] = $result['id_message'];
        $response["id_conversation"] = $result['id_conversation'];
    } else {
        $response["error"] = 1;
        $response["message"] = "Failed to create message. Please try again";
    }
    echoRespnse(200, $response);
}); 

/**
 * Updating existing message
 * method PUT
 * params message, status
 * url - /messages/:id
 */
$app->put('/messages/:id', 'authenticate', function($id_message) use($app) {
    global $user_id;            
    // check for required params
    verifyRequiredParams(array('text'));

    $text = $app->request->put('text');
    $id_sender = $user_id;

    $db = new MessageModel();
    $response = array();

    // updating message
    $result = $db->updateMessage($text, $id_message);
    if ($result) {
        // message updated successfully
        $response["error"] = 0;
        $response["message"] = "message updated successfully";
    } else {
        // message failed to update
        $response["error"] = 1;
        $response["message"] = "message failed to update. Please try again!";
    }
    echoRespnse(200, $response);
});

/**
 * Updating existing message
 * method PUT
 * params message, status
 * url - /messages/:id
 */
$app->put('/messages-setRead/', 'authenticate', function() use($app) {
    global $user_id;            
    // check for required params
    verifyRequiredParams(array('id_message'));

    $id_message = $app->request->put('id_message');
    $readed = 1;
    $id_reciver = $user_id;

    $db = new MessageModel();
    $response = array();

    // updating message
    $result = $db->setReadedMessage($readed, $id_message);
    if ($result) {
        // message updated successfully
        $response["error"] = 0;
        $response["message"] = "message updated successfully";
    } else {
        // message failed to update
        $response["error"] = 1;
        $response["message"] = "message failed to update. Please try again!";
    }
    echoRespnse(200, $response);
});




/**
 * Deleting message. Users can delete only their messages
 * method DELETE
 * url /messages
 */
//$app->delete('/messages/:id', 'authenticate', function($id_message) use($app) {
$app->delete('/messages/:id', function($id_message) use($app) {
    global $user_id;

    $db = new MessageModel();
    $response = array();
    $result = $db->deleteMessage($id_message);
    if ($result) {
        // message deleted successfully
        $response["error"] = 0;
        $response["message"] = "message deleted succesfully";
    } else {
        // message failed to delete
        $response["error"] = 1;
        $response["message"] = "message failed to delete. Please try again!";
    }
    echoRespnse(200, $response);
});

?>