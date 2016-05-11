<?php

class ConversationModel  extends DbHandler
{   
    /**
     * Fetching all user messages
     * @param String $user_id id of the user
     */
    public function getAllUserConversations($id_user) {
        $sqlFilter = "";
        $query = "SELECT 
                conversation.*,   
                -- sender.id_user as sender_id_user,
                -- reciver.id_user as reciver_id_user,
                sender.pseudo as sender_pseudo,
                reciver.pseudo as reciver_pseudo
                -- ,sender.first_name as sender_first_name,
                -- sender.last_name as sender_last_name,
                -- sender.phone as sender_phone,
                -- sender.email as sender_email,
                -- reciver.first_name as reciverfirst_name,
                -- reciver.last_name as reciver_last_name,
                -- reciver.phone as reciver_phone,
                -- reciver.email as reciver_email
            FROM conversation,
                 user sender, 
                 user reciver  
            WHERE
                 (sender.id_user = ? OR reciver.id_user = ?)
                AND sender.id_user = conversation.id_sender
                AND ( reciver.id_user = conversation.id_reciver)
                {$sqlFilter}
            ORDER BY send_date DESC
            LIMIT 0, 100
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $id_user, $id_user);
        $stmt->execute();
        $conversations = $stmt->get_result();
        $stmt->close();
        return $conversations;
    }
	
    public function getIdConversation($id_sender, $id_reciver) {
        $id_conversation = 0;
        $stmt = $this->conn->prepare("SELECT   
                conversation.id_conversation
            FROM 
                conversation
            WHERE
                    (conversation.id_sender = ? AND conversation.id_reciver = ?)
                OR
                    (conversation.id_reciver = ? AND conversation.id_sender = ?)
            LIMIT 0, 1;
            ;
        ");
        $stmt->bind_param("iiii", $id_sender, $id_reciver, $id_sender, $id_reciver);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if ($result != NULL) {
            $id_conversation = $result["id_conversation"];
        }
        return $id_conversation;
    }

    /**
     * Creating new message
     * @param String $user_id user id to whom message belongs to
     * @param String $message message text
     */
    public function createConversation($id_sender, $id_reciver) {        
        $stmt = $this->conn->prepare("INSERT INTO `conversation`
            (
                `id_sender`,
                `id_reciver`
            )
            VALUES(?, ?)");
        $stmt->bind_param("ii", $id_sender, $id_reciver);
        $result = $stmt->execute();
        //print_r($stmt->error); die;
        $stmt->close();
 
        if ($result) {
            // conversation row created
            // now assign the conversation to user
            $new_conversation_id = $this->conn->insert_id;
            return $new_conversation_id;
            
        } else {
            // conversation failed to create
            return NULL;
        }
    }

    
 
}

?>