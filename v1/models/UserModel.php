<?php

class UserModel  extends DbHandler
{
	/* ------------- `users` table method ------------------ */
 
    /**
     * Creating new user
     * @param String $name User full name
     * @param String $email User login email id
     * @param String $password User login password
     */


    public function createUser($first_name, $last_name, $email, $password, $pseudo, $phone) {
        require_once '../include/PassHash.php';
        $response = array(
            "code" => USER_CREATE_FAILED,
            "user" => array()
        );
 
        // First check if user already existed in db
        if ( $this->isPseudoExists($pseudo) ) {
             // User with same email already existed in the db
            $response['code'] = USER_PSEUDO_ALREADY_EXISTED;
            return $response;
        }
        elseif (!$this->isUserExists($email)) {
            // Generating password hash
            $password_hash = PassHash::hash($password);
 
            // Generating API key
            $api_key = $this->generateApiKey();
 
            // insert query
            $stmt = $this->conn->prepare("INSERT INTO user(first_name, last_name, phone, email, pseudo,password_hash, api_key, status) values(?, ?, ?, ?, ?, ?, ?, 1)");
            $stmt->bind_param("sssssss", $first_name, $last_name,$phone, $email,$pseudo, $password_hash, $api_key);
 
            $new_user_id = $this->conn->insert_id;
            $result = $stmt->execute();
 
            $stmt->close();
 
            // Check for successful insertion
            if ($result) {
                // User successfully inserted
                $response['user']['api_key'] = $api_key;
                $response['user']['id_user'] = $new_user_id;
                $response['user']['first_name'] = $first_name;
                $response['user']['last_name'] = $last_name;
                $response['user']['phone'] = $phone;
                $response['user']['email'] = $email;
                $response['user']['pseudo'] = $pseudo;
                $response['code'] = USER_CREATED_SUCCESSFULLY;
                return $response;
            } else {
                // Failed to create user
                $response['code'] = USER_CREATE_FAILED;
                return $response;
            }
        } else {
            // User with same email already existed in the db
            $response['code'] = USER_ALREADY_EXISTED;
            return $response;
        }
 
        return $response;
    }
 
    /**
     * Checking user login
     * @param String $email User login email id
     * @param String $password User login password
     * @return boolean User login status success/fail
     */
    public function checkLogin($email, $password) {
        // fetching user by email
        $stmt = $this->conn->prepare("SELECT password_hash FROM user WHERE email = ?");
 
        $stmt->bind_param("s", $email);
 
        $stmt->execute();
 
        $stmt->bind_result($password_hash);
 
        $stmt->store_result();
 
        if ($stmt->num_rows > 0) {
            // Found user with the email
            // Now verify the password
 
            $stmt->fetch();
 
            $stmt->close();
 
            if (PassHash::check_password($password_hash, $password)) {
                // User password is correct
                return TRUE;
            } else {
                // user password is incorrect
                return FALSE;
            }
        } else {
            $stmt->close();
 
            // user not existed with the email
            return FALSE;
        }
    }
 
    /**
     * Checking for duplicate user by email address
     * @param String $email email to check in db
     * @return boolean
     */
    private function isUserExists($email) {
        $stmt = $this->conn->prepare("SELECT id_user from user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        $num_rows = $stmt->num_rows;
        $stmt->close();
        return $num_rows > 0;
    }

    /**
     * Checking for duplicate user by email address
     * @param String $email email to check in db
     * @return boolean
     */
    private function isPseudoExists($pseudo) {
        $stmt = $this->conn->prepare("SELECT id_user from user WHERE pseudo = ?");
        $stmt->bind_param("s", $pseudo);
        $stmt->execute();
        $stmt->store_result();
        $num_rows = $stmt->num_rows;
        $stmt->close();
        return $num_rows > 0;
    }
 
    /**
     * Fetching user by email
     * @param String $email User email id
     */
    public function getUserByEmail($email) {
        $stmt = $this->conn->prepare("SELECT id_user, last_name, first_name, phone, email, pseudo, api_key, status, created_at FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $user;
        } else {
            return NULL;
        }
    }
 
    /**
     * Fetching user api key
     * @param String $user_id user id primary key in user table
     */
    public function getApiKeyById($user_id) {
        $stmt = $this->conn->prepare("SELECT api_key FROM user WHERE id_user = ?");
        $stmt->bind_param("i", $user_id);
        if ($stmt->execute()) {
            $api_key = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $api_key;
        } else {
            return NULL;
        }
    }
 
    /**
     * Fetching user id by api key
     * @param String $api_key user api key
     */
    public function getUserId($api_key) {
        $stmt = $this->conn->prepare("SELECT id_user FROM user WHERE api_key = ?");
        $stmt->bind_param("s", $api_key);
        if ($stmt->execute()) {
            $user_id = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $user_id;
        } else {
            return NULL;
        }
    }
 
    /**
     * Validating user api key
     * If the api key is there in db, it is a valid key
     * @param String $api_key user api key
     * @return boolean
     */
    public function isValidApiKey($api_key) {
        $stmt = $this->conn->prepare("SELECT id_user from user WHERE api_key = ?");
        $stmt->bind_param("s", $api_key);
        $stmt->execute();
        $stmt->store_result();
        $num_rows = $stmt->num_rows;
        $stmt->close();
        return $num_rows > 0;
    }
 
    /**
     * Generating random Unique MD5 String for user Api key
     */
    private function generateApiKey() {
        return md5(uniqid(rand(), true));
    }


}

?>