<?php
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
    $response["error"] = false;
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
        $response["error"] = false;
        $response["id"] = $result["id_service"];
        $response["titre"] = $result["titre"];
        $response["price"] = $result["price"];
        $response["image"] = $result["image"];
        $response["description"] = $result["description"];
        $response["active"] = $result["active"];
        
        echoRespnse(200, $response);
    } else {
        $response["error"] = true;
        $response["message"] = "The requested resource doesn't exists";
        echoRespnse(404, $response);
    }
});


$app->post('/services', 'authenticate', function() use ($app) {
    // check for required params
    verifyRequiredParams(array('titre'));

    $response = array();
    $titre = $app->request->post('titre');
    $description = $app->request->post('description');
    $price = $app->request->post('price');
    $image = $app->request->post('image');
    $adress = $app->request->post('adress');
    $city = $app->request->post('city');
    $latitude = $app->request->post('latitude');
    $longituge = $app->request->post('longituge');
    $id_category_service = $app->request->post('id_category_service');
    global $user_id;
    
    $db = new ServiceModel();

    // creating new service
    $service_id = $db->createService($titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $id_category_service, $user_id);

    if ($service_id != NULL) {
        $response["error"] = false;
        $response["message"] = "service created successfully";
        $response["service_id"] = $service_id;
    } else {
        $response["error"] = true;
        $response["message"] = "Failed to create service. Please try again";
    }
    echoRespnse(201, $response);
}); 

/**
 * Updating existing service
 * method PUT
 * params service, status
 * url - /services/:id
 */
$app->put('/services/:id', 'authenticate', function($service_id) use($app) {
    // check for required params
    verifyRequiredParams(array('service', 'status'));

    global $user_id;            
    $service = $app->request->put('service');
    $status = $app->request->put('status');

    $db = new ServiceModel();
    $response = array();

    // updating service
    $result = $db->updateService($user_id, $service_id, $description, $active);
    if ($result) {
        // service updated successfully
        $response["error"] = false;
        $response["message"] = "service updated successfully";
    } else {
        // service failed to update
        $response["error"] = true;
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
        $response["error"] = false;
        $response["message"] = "service deleted succesfully";
    } else {
        // service failed to delete
        $response["error"] = true;
        $response["message"] = "service failed to delete. Please try again!";
    }
    echoRespnse(200, $response);
});

?>