<?php

class ConversationModel  extends DbHandler
{
	
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