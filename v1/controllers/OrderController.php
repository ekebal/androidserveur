<?php
/**
 * Listing all orders of particual user
 * method GET
 * url /orders          
 */
$app->get('/orders', function() {
   // global $user_id;
    $response = array();
    $db = new OrderModel();

    // fetching all user orders
    $result = $db->getAllUserorders();
       // print_r($result->error);
    $response["error"] = 0;
    $response["orders"] = array();


    // looping through result and preparing orders array
    while ($order = $result->fetch_assoc()) {
        $tmp = array();
        array_push($response["orders"], $tmp);
    }

    echoRespnse(200, $response);
});

/**
 * Listing single order of particual user
 * method GET
 * url /orders/:id
 * Will return 404 if the order doesn't belongs to user
 */
$app->get('/orders/:id', function($order_id) {
  //  global $user_id;
    $response = array();
    $db = new OrderModel();

    // fetch order
    $result = $db->getOrder($order_id);

    if ($result != NULL) {
        $response["error"] = 0;
        $response["id"] = $result["id_order"];
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


$app->post('/orders', 'authenticate', function() use ($app) {
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
    $id_category_order = $app->request->post('id_category_order');
    global $user_id;
    
    $db = new OrderModel();

    // creating new order
    $order_id = $db->createOrder($titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $id_category_order, $user_id);

    if ($order_id != NULL) {
        $response["error"] = 0;
        $response["message"] = "order created successfully";
        $response["order_id"] = $order_id;
    } else {
        $response["error"] = 1;
        $response["message"] = "Failed to create order. Please try again";
    }
    echoRespnse(201, $response);
}); 

/**
 * Updating existing order
 * method PUT
 * params order, status
 * url - /orders/:id
 */
$app->put('/orders/:id', 'authenticate', function($order_id) use($app) {
    // check for required params
    verifyRequiredParams(array('order', 'status'));

    global $user_id;            
    $order = $app->request->put('order');
    $status = $app->request->put('status');

    $db = new OrderModel();
    $response = array();

    // updating order
    $result = $db->updateOrder($user_id, $order_id, $description, $active);
    if ($result) {
        // order updated successfully
        $response["error"] = 0;
        $response["message"] = "order updated successfully";
    } else {
        // order failed to update
        $response["error"] = 1;
        $response["message"] = "order failed to update. Please try again!";
    }
    echoRespnse(200, $response);
});




/**
 * Deleting order. Users can delete only their orders
 * method DELETE
 * url /orders
 */
$app->delete('/orders/:id', 'authenticate', function($order_id) use($app) {
    global $user_id;

    $db = new OrderModel();
    $response = array();
    $result = $db->deleteOrder($user_id, $order_id);
    if ($result) {
        // order deleted successfully
        $response["error"] = 0;
        $response["message"] = "order deleted succesfully";
    } else {
        // order failed to delete
        $response["error"] = 1;
        $response["message"] = "order failed to delete. Please try again!";
    }
    echoRespnse(200, $response);
});

?>