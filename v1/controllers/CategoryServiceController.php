<?php
 
/**
 * Listing all category_services of particual user
 * method GET
 * url /category_services          
 */
$app->get('/category_services', function() {
   // global $user_id;
    $response = array();
    $db = new CategoryServiceModel();

    // fetching all user category_services
    $result = $db->getAllCategoryServices();
       // print_r($result->error);
    $response["error"] = 0;
    $response["category_services"] = array();


    // looping through result and preparing category_services array
    while ($category_service = $result->fetch_assoc()) {
        $tmp = array();
        $tmp["id_category_service"] = $category_service;
        
        array_push($response["category_services"], $tmp);
    }

    echoRespnse(200, $response);
});

/**
 * Listing single category_service of particual user
 * method GET
 * url /category_services/:id
 * Will return 404 if the category_service doesn't belongs to user
 */
$app->get('/category_services/:id', function($category_service_id) {
  //  global $user_id;
    $response = array();
    $db = new CategoryServiceModel();

    // fetch category_service
    $result = $db->getService($category_service_id);

    if ($result != NULL) {
        $response["error"] = 0;
        $response["id"] = $result["id_category_service"];
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


?>