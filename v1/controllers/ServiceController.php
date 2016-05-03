<?php
$app->post('/services', 'authenticate', function() use ($app) {
    // check for required params
    verifyRequiredParams(array('titre'));

    $response = array();
    $titre = $app->request->post('titre');
    $description = $app->request->post('description');
    $price = $app->request->post('price');
    $image = $app->request->post('image');
    $address = $app->request->post('address');
    $city = $app->request->post('city');
    $latitude = $app->request->post('latitude');
    $longituge = $app->request->post('longituge');
    $id_category_service = $app->request->post('id_category_service');
    global $user_id;
    
    $db = new ServiceModel();

    // creating new service
    $service_id = $db->createService($titre, $description, $price, $image, $address, $city, $latitude, $longituge, $id_category_service, $user_id);

    if ($service_id != NULL) {
        $response["error"] = 0;
        $response["message"] = "service created successfully";
        $response["service_id"] = $service_id;
    } else {
        $response["error"] = 1;
        $response["message"] = "Failed to create service. Please try again";
    }
    echoRespnse(201, $response);
}); 
/**
 * Listing all services of particual user
 * method GET
 * url /services          
 */
$app->get('/services', function() {
   // global $user_id;
    $response = array();
    $db = new ServiceModel();

    // fetching all user services
    $result = $db->getAllUserservices();
       // print_r($result->error);
    $response["error"] = 0;
    $response["services"] = array();


    // looping through result and preparing services array
    while ($service = $result->fetch_assoc()) {
        $tmp = array();
        $tmp["id_service"] = $service["id_service"];
        $tmp["titre"] = $service["titre"];
        $tmp["active"] = $service["active"];
        $tmp["description"] = $service["description"];
        
        array_push($response["services"], $tmp);
    }

    echoRespnse(200, $response);
});

/**
 * Listing single service of particual user
 * method GET
 * url /services/:id
 * Will return 404 if the service doesn't belongs to user
 */
$app->get('/services/:id', function($service_id) {
  //  global $user_id;
    $response = array();
    $db = new ServiceModel();

    // fetch service
    $result = $db->getService($service_id);

    if ($result != NULL) {
        $response["error"] = 0;
        $response["id"] = $result["id_service"];
        $response["titre"] = $result["titre"];
        $response["price"] = $result["price"];
        $response["image"] = $result["image"];
        $response["description"] = $result["description"];
        $response["active"] = $result["active"];
        
        echoRespnse(200, $response);
    } else {
        $response["error"] = 1;
        $response["message"] = "The requested resource doesn't exists";
        echoRespnse(404, $response);
    }
});



/**
 * Updating existing service
 * method PUT
 * params service, status
 * url - /services/:id
 */
$app->put('/services/:id', 'authenticate', function($id_service) use($app) {
    // check for required params
    verifyRequiredParams(array('id_service', 'active', 'description'));

    global $user_id;            
    $id_service = $app->request->put('id_service');
    $active = $app->request->put('active');
    $description = $app->request->put('description');

    $db = new ServiceModel();
    $response = array();

    // updating service
    $result = $db->updateService($user_id, $id_service, $description, $active);
    if ($result) {
        // service updated successfully
        $response["error"] = 0;
        $response["message"] = "service updated successfully";
    } else {
        // service failed to update
        $response["error"] = 1;
        $response["message"] = "service failed to update. Please try again!";
    }
    echoRespnse(200, $response);
});




/**
 * Deleting service. Users can delete only their services
 * method DELETE
 * url /services
 */
$app->delete('/services/:id', 'authenticate', function($service_id) use($app) {
    global $user_id;

    $db = new ServiceModel();
    $response = array();
    $result = $db->deleteService($user_id, $service_id);
    if ($result) {
        // service deleted successfully
        $response["error"] = 0;
        $response["message"] = "service deleted succesfully";
    } else {
        // service failed to delete
        $response["error"] = 1;
        $response["message"] = "service failed to delete. Please try again!";
    }
    echoRespnse(200, $response);
});

?>