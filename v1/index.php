
<?php
 
require_once '../include/DbHandler.php';
require_once '../include/PassHash.php';
require '.././libs/Slim/Slim.php';
 
\Slim\Slim::registerAutoloader();
 
$app = new \Slim\Slim();
 
// User id from db - Global Variable
$user_id = NULL;
 

require_once '../include/ProjectHelper.php';

require_once("models/UserModel.php");
require_once("models/ServiceModel.php");
require_once("models/CategoryServiceModel.php");

require_once("controllers/UserController.php");
require_once("controllers/ServiceController.php");
require_once("controllers/CategoryServiceController.php");

$app->run();
?>