<?php
/**
 * Listing all messages of particual user
 * method GET
 * url /messages          
 */
$app->get('/conversations', 'authenticate', function() use ($app) {
    global $user_id;
    $response = array();
    $db = new ConversationModel();

    $id_conversation = $app->request->get('id_conversation');
    // fetching all user messages
    $result = $db->getAllUserConversations($user_id);
       // print_r($result->error);
    $response["user_id"] = $user_id;
    $response["error"] = 0;
    $response["conversations"] = array();


    // looping through result and preparing conversations array
    while ($message = $result->fetch_assoc()) {
        $tmp = $message;
        array_push($response["conversations"], $tmp);
    }
    echoRespnse(200, $response);
});



?>