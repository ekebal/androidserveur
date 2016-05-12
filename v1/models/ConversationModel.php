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
                sender.pseudo as sender_pseudo,
                reciver.pseudo as reciver_pseudo,
                `last_messages_by_conversation`.`text` AS `text`,
                `last_messages_by_conversation`.`readed` AS `readed`,
                `last_messages_by_conversation`.`read_date` AS `read_date`,
                `last_messages_by_conversation`.`send_date` AS `send_date`,
                total_messages_by_conversation.total_messages,
                total_readed_messages_by_conversation.total_readed
                
            FROM conversation,
                 user sender, 
                 user reciver,
                 last_messages_by_conversation,
                 total_messages_by_conversation,
                 total_readed_messages_by_conversation
            WHERE
                 (sender.id_user = ? OR reciver.id_user = ?)
                AND sender.id_user = conversation.id_sender
                AND ( reciver.id_user = conversation.id_reciver)
                AND conversation.id_conversation = last_messages_by_conversation.id_conversation
                AND conversation.id_conversation = total_messages_by_conversation.id_conversation
                AND conversation.id_conversation = total_readed_messages_by_conversation.id_conversation
                {$sqlFilter}
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