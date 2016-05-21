<?php 
 
/**
 * User Registration
 * url - /register
 * method - POST
 * params - name, email, password
 */
$app->post('/register', function() use ($app) {
    // check for required params

    verifyRequiredParams(array('first_name','last_name' ,'email', 'password','pseudo','phone'));

    $response = array();

    // reading post params
    $first_name = $app->request->post('first_name');
    $last_name = $app->request->post('last_name');
    $email = $app->request->post('email');
    $password = $app->request->post('password');
    $pseudo = $app->request->post('pseudo');
    $phone = $app->request->post('phone');

    // validating email address
    validateEmail($email);

    $db = new UserModel();
    $res = $db->createUser($first_name, $last_name, $email, $password, $pseudo, $phone);

    if ($res['code'] == USER_CREATED_SUCCESSFULLY) {
        $response["api_key"] = $res['user']['api_key'];
        $response["id_user"] = $res['user']['id_user'];
        $response["first_name"] = $res['user']['first_name'];
        $response["last_name"] = $res['user']['last_name'];
        $response["email"] = $res['user']['email'];
        $response["pseudo"] = $res['user']['pseudo'];
        $response["phone"] = $res['user']['phone'];
        $response["error"] = 0;
        $response["message"] = "You are successfully registered";
        echoRespnse(200, $response);
    } else if ($res['code'] == USER_CREATE_FAILED) {
        $response["error"] = 1;
        $response["message"] = "Oops! An error occurred while registereing";
        echoRespnse(200, $response);
    } else if ($res['code'] == USER_PSEUDO_ALREADY_EXISTED) {
        $response["error"] = 1;
        $response["message"] = "Sorry, this pseudo already existed";
        echoRespnse(200, $response);
    } else if ($res['code'] == USER_ALREADY_EXISTED) {
        $response["error"] = 1;
        $response["message"] = "Sorry, this email already existed";
        echoRespnse(200, $response);
    }
});

/**
 * User Login
 * url - /login
 * method - POST
 * params - email, password
 */
$app->post('/login', function() use ($app) {
    // check for required params
    verifyRequiredParams(array('email', 'password'));

    // reading post params
    $email = $app->request()->post('email');
    $password = $app->request()->post('password');
    $response = array();

    $db = new UserModel();
    // check for correct email and password
    if ($db->checkLogin($email, $password)) {
        // get the user by email
        $user = $db->getUserByEmail($email);

        if ($user != NULL) {
            $response["error"] = 0;
            /*
            
            foreach ($result as $key => $value) {
                $response[$key] = $result[$key];
            }
             */
            $response['first_name'] = $user['first_name'];
            $response['last_name'] = $user['last_name'];
            $response['pseudo'] = $user['pseudo'];
            $response['email'] = $user['email'];
            $response['api_key'] = $user['api_key'];
            $response['created_at'] = $user['created_at'];
            $response["id_user"] = $user['id_user'];
            $response["phone"] = $user['phone'];
            
        } else {
            // unknown error occurred
            $response['error'] = 1;
            $response['message'] = "An error occurred. Please try again";
        }
    } else {
        // user credentials are wrong
        $response['error'] = 1;
        $response['message'] = 'Login failed. Incorrect credentials';
    }

    echoRespnse(200, $response);
});


?>