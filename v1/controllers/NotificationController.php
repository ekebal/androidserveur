<?php
$app->post('/notifications', 'authenticate', function() use ($app) {
    // check for required params
    // pending
    
    verifyRequiredParams(array('titre', 'description', 'price', 'address', 'city', 'latitude', 'longituge', 'id_category_notification'));

    $response = array();
    $titre = $app->request->post('titre');
    $description = $app->request->post('description');
    $price = $app->request->post('price');
    //$image = $app->request->post('image');
    $image = "tmp_image.png";
    $address = $app->request->post('address');
    $city = $app->request->post('city');
    $latitude = $app->request->post('latitude');
    $longituge = $app->request->post('longituge');
    $id_category_notification = $app->request->post('id_category_notification');
    global $user_id;
    
    $db = new NotificationModel();

    // creating new notification
    $notification_id = $db->createNotification($id_user, $titre, $activity, $activity_data, $message);

    if ($notification_id != NULL) {
        $response["error"] = 0;
        $response["message"] = "notification created successfully";
        $response["notification_id"] = $notification_id;
    } else {
        $response["error"] = 1;
        $response["message"] = "Failed to create notification. Please try again";
    }
    echoRespnse(200, $response);
}); 
/**
 * Listing all notifications of particual user
 * method GET
 * url /notifications          
 */
$app->get('/notifications', 'authenticate', function() {
    global $user_id;
    $response = array();
    $db = new NotificationModel();

    // fetching all user notifications
    $result = $db->getUserPendingNotifications($user_id);
       // print_r($result->error);
    $response["error"] = 0;
    $response["user_id"] = $user_id;
    $response["notifications"] = array();
    
    // looping through result and preparing messages array
    while ($notification = $result->fetch_assoc()) {
        $tmp = $notification;
        array_push($response["notifications"], $tmp);
    }
    echoRespnse(200, $response);
});

/**
 * Listing single notification of particual user
 * method GET
 * url /notifications/:id
 * Will return 404 if the notification doesn't belongs to user
 */
$app->get('/notifications/:id', function($notification_id) {
  //  global $user_id;
    $response = array();
    $db = new NotificationModel();

    // fetch notification
    $result = $db->getNotification($notification_id);

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




/**
 * Deleting notification. Users can delete only their notifications
 * method DELETE
 * url /notifications
 */
$app->post('/update_notifications', 'authenticate',  function() use ($app) {
//$app->delete('/notifications/:id', 'authenticate', function($notification_id) use($app) {
    //global $user_id;
    verifyRequiredParams(array('str_ids_notification'));

    $str_ids_notification = $app->request->post('str_ids_notification');
    $db = new NotificationModel();
    $response = array();
    $result = $db->deleteNotification($str_ids_notification);
    if ($result) {
        // notification deleted successfully
        $response["error"] = 0;
        $response["message"] = "notifications {$str_ids_notification} deleted succesfully";
    } else {
        // notification failed to delete
        $response["error"] = 1;
        $response["message"] = "notifications {$str_ids_notification} failed to delete. Please try again!";
    }
    echoRespnse(200, $response);
});

?>