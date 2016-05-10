<?php

class CategoryServiceModel  extends DbHandler
{
	/* ------------- `category_services` table method ------------------ */
 
    /**
     * Creating new category_service
     * @param String $user_id user id to whom category_service belongs to
     * @param String $category_service category_service text
     */

    public function createCategoryService($name, $image, $status, $order) {        
        $stmt = $this->conn->prepare("INSERT INTO category_service(
            `name`, `image`, `status`, `order`)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1, ?, ?)");
        $stmt->bind_param("ssii", $name, $image, $status, $order);
        $result = $stmt->execute();
        //print_r($stmt->error); die;
        $stmt->close();
 
        if ($result) {
            // category_service row created
            // now assign the category_service to user
            $new_category_service_id = $this->conn->insert_id;
            return $new_category_service_id;
            
        } else {
            // category_service failed to create
            return NULL;
        }
    }
 
    
 
    /**
     * Fetching all user category_services
     * @param String $user_id id of the user
     */
    public function getAllCategoryServices() {
        $stmt = $this->conn->prepare("SELECT * FROM category_service ");
       // $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $category_services = $stmt->get_result();
        $stmt->close();
        return $category_services;
    }
 
    

 
}

?>