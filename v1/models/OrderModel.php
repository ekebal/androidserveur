<?php

class OrderModel  extends DbHandler
{
	/* ------------- `orders` table method ------------------ */
 
    /**
     * Creating new order
     * @param String $id_user user id to whom order belongs to
     * @param String $order order text
     */

    public function createOrder($id_user, $id_service, $payment_code) {        
        $stmt = $this->conn->prepare("INSERT INTO order(
            id_user,
            id_service, 
            payment_code,
            code_valid,
            created_at
            )
              VALUES(?, ?, ?, 0, NOW() )");
        $stmt->bind_param("iis", $id_user, $id_service, $payment_code);
        $result = $stmt->execute();
        $stmt->close();
 
        if ($result) {
            // order row created
            // now assign the order to user
            $new_order_id = $this->conn->insert_id;
            return $new_order_id;
            
        } else {
            print_r($stmt->error); die;
            // order failed to create
            return NULL;
        }
    }
 
    /**
     * Fetching single order
     * @param String $order_id id of the order
     */
    public function getOrder($order_id) {
        $stmt = $this->conn->prepare("SELECT * from order t,
                 category_order c,
                 user u  
            WHERE
                 t.id_order = ? 
                AND u.id_user = t.id_provider
            
        ");
        $stmt->bind_param("i", $order_id);
        if ($stmt->execute()) {
            $order = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $order;
        } else {
            return NULL;
        }
    }
 
    /**
     * Fetching all user orders
     * @param String $id_user id of the user
     */
    public function getAllUserOrders() {
        $stmt = $this->conn->prepare("SELECT * FROM order ");
       // $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $orders = $stmt->get_result();
        $stmt->close();
        return $orders;
    }
 
    /**
     * Updating order
     * @param String $order_id id of the order
     * @param String $order order text
     * @param String $status order status
     */
    public function updateOrder($id_user, $id_order, $description, $active) {
        $stmt = $this->conn->prepare("UPDATE 
            order t, 
            user u 
                set t.active = ?, 
                    t.description = ? 
            WHERE t.id_order = ? 
                AND t.id_provider = u.id_user 
                AND u.id_user = ?
        ");
        $stmt->bind_param("isii", $active, $description, $id_order, $id_user);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }
 
    /**
     * Deleting a order
     * @param String $order_id id of the order to delete
     *   le  champs  active  dans la table  order  
     */
    public function deleteOrder($id_provider, $id_order) {
        $stmt = $this->conn->prepare("UPDATE 
            order t 
                set t.active = 0 
            WHERE t.id_order = ? 
            AND t.id_provider = ?");
        $stmt->bind_param("ii", $id_order, $id_provider);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

 
}

?>