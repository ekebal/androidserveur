<?php

class ServiceModel  extends DbHandler
{
	/* ------------- `services` table method ------------------ */
 
    /**
     * Creating new service
     * @param String $id_user user id to whom service belongs to
     * @param String $service service text
     */

    public function createService($titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $id_category_service, $id_user) {        
        $stmt = $this->conn->prepare("INSERT INTO service(
            titre,
            description, 
            price,
            image,
            address,
            city,
            latitude,
            longituge,
            publication_date,
            active,
            id_category_service,
            id_provider)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1, ?, ?)");
        $stmt->bind_param("ssdsssddii", $titre, $description, $price, $image, $adress, $city, $latitude, $longituge, $id_category_service, $id_user);
        $result = $stmt->execute();
        $stmt->close();
 
        if ($result) {
            // service row created
            // now assign the service to user
            $new_service_id = $this->conn->insert_id;
            return $new_service_id;
            
        } else {
            print_r($stmt->error); die;
            // service failed to create
            return NULL;
        }
    }
 
    /**
     * Fetching single service
     * @param String $service_id id of the service
     */
    public function getService($service_id) {
        $stmt = $this->conn->prepare("SELECT * from service t,
                 category_service c,
                 user u  
            WHERE
                 t.id_service = ? 
            
                AND u.id_user = t.id_provider
        
                AND c.id_category_service = t.id_category_service
            
        ");
        $stmt->bind_param("i", $service_id);
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
     * @param String $id_user id of the user
     */

    public function getAllUserServices($titre_service = ""){
        $requett="";
        if ( ! empty($titre_service) )
        {
            $requett="AND s.titre LIKE '%$titre_service%' ";
        }

        $stmt = $this->conn->prepare("SELECT s.* , c.name, u.pseudo, c.image as imagecategory fROM  category_service c, service s, user u   WHERE 
                c.id_category_service=s.id_category_service AND s.id_provider=u.id_user AND
            1>0 {$requett}");

       

        $stmt->execute();
  
        $services = $stmt->get_result();
        $stmt->close();
        return $services;
    }
   
    
 

 public function getAllServicesCategory($id_category_service) {
        $stmt = $this->conn->prepare("SELECT * FROM service s WHERE s.id_category_service = ?");
        $stmt->bind_param("i", $id_category_service);
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
    public function updateService($id_user, $id_service, $description, $active) {
        $stmt = $this->conn->prepare("UPDATE 
            service t, 
            user u 
                set t.active = ?, 
                    t.description = ? 
            WHERE t.id_service = ? 
                AND t.id_provider = u.id_user 
                AND u.id_user = ?
        ");
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
        $stmt = $this->conn->prepare("UPDATE 
            service t 
                set t.active = 0 
            WHERE t.id_service = ? 
            AND t.id_provider = ?");
        $stmt->bind_param("ii", $id_service, $id_provider);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

 
}

?>