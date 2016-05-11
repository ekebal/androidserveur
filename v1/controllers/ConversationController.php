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
    while ($tmp = $result->fetch_assoc()) {
        $tmp2 = $tmp;
        $tmp2['id_sender'] = $user_id;
        $tmp2['id_reciver'] = ( $tmp['id_reciver'] != $user_id )? $tmp['id_reciver']: $tmp['id_sender'];
        $tmp2['reciver_pseudo'] = ( $tmp['id_reciver'] != $user_id )? $tmp['reciver_pseudo']: $tmp['sender_pseudo'];
        $tmp2['sender_pseudo'] = ( $tmp['id_reciver'] == $user_id )? $tmp['reciver_pseudo']: $tmp['sender_pseudo'];

        array_push($response["conversations"], $tmp2);
    }
    echoRespnse(200, $response);
});



?>