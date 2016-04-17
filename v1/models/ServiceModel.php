<?php

class ServiceModel  extends DbHandler
{
	/* ------------- `services` table method ------------------ */
 
    /**
     * Creating new service
     * @param String $user_id user id to whom service belongs to
     * @param String $service service text
     */



    public function createService($titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $publication_date, $active, $id_category_service, $use_id) {        
        $stmt = $this->conn->prepare("INSERT INTO service(titre,
            description, 
            price,
            image,
            address,
            city,
            latitude,
            longituge,
            publication_date,
            active,id_category_service,
            id_provider)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)");
        $stmt->bind_param("ssdsssddsiii", $titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $publication_date, $active, $id_category_service, $id_provider);
        $result = $stmt->execute();
        $stmt->close();
 
        if ($result) {
            // service row created
            // now assign the service to user
            $new_service_id = $this->conn->insert_id;
            $res = $this->createUserService($user_id, $new_service_id);
            if ($res) {
                // service created successfully
                return $new_service_id;
            } else {
                // service failed to create
                return NULL;
            }
        } else {
            // service failed to create
            return NULL;
        }
    }
 
    /**
     * Fetching single service
     * @param String $service_id id of the service
     */
    public function getService($service_id, $user_id) {
        $stmt = $this->conn->prepare("SELECT 
                t.id_service,
                t.description,
                t.price,
                t.image,
                t.address,
                t.city,
                t.latitude,
                t.longituge,
                t.publication_date,
                t.id_category_service,
                t.id_provider,
                c.id_category_service,
                u.id_user 
            from service t,
                 category_service c,
                 user u  
            WHERE
                 t.id_service = ? 
            
                AND u.id_user = t.id_provider
                AND u.id_user = ?
                AND c.id_category_service = t.id_category_service
            
        ");
        $stmt->bind_param("ii", $service_id, $user_id);
        if ($stmt->execute()) {
            $service = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $service;
        } else {
            return NULL;
        }
    }
 
    /**
     * Fetching all user services
     * @param String $user_id id of the user
     */
    public function getAllUserServices($user_id) {
        $stmt = $this->conn->prepare("SELECT t.* FROM service t, user u WHERE t.id_provider = u.id_user AND t.id_provider = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $services = $stmt->get_result();
        $stmt->close();
        return $services;
    }
 
    /**
     * Updating service
     * @param String $service_id id of the service
     * @param String $service service text
     * @param String $status service status
     */
    public function updateService($user_id, $id_service, $description, $active) {
        $stmt = $this->conn->prepare("UPDATE services t, user u set t.active = ?, t.description = ? WHERE t.id_service = ? AND t.id_provide = u.id_user AND u.id_user = ?");
        $stmt->bind_param("isii", $active, $description, $id_service, $id_user);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }
 
    /**
     * Deleting a service
     * @param String $service_id id of the service to delete
     *   le  champs  active  dans la table  service  
     */
    public function deleteService($id_provider, $id_service) {
        $stmt = $this->conn->prepare("UPDATE service t set t.active = 0 WHERE t.id_service = ? AND t.id_provider = ?");
        $stmt->bind_param("ii", $id_service, $id_provider);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

 
}

?>