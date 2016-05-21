

<?php

class MessageModel  extends DbHandler
{
	/* ------------- `messages` table method ------------------ */
 
    /**
     * Fetching single message
     * @param String $message_id id of the message
     */
    public function getMessage($message_id) {
        $stmt = $this->conn->prepare("SELECT 
                message.*,
                sender.pseudo,
                sender.first_name,
                sender.last_name,
                sender.phone,
                sender.email,
                reciver.pseudo,
                reciver.first_name,
                reciver.last_name,
                reciver.phone,
                reciver.email
            FROM message,
                 user sender, 
                 user reciver  
            WHERE
                 message.id_message = ? 
                AND sender.id_user = message.id_sender
                AND reciver.id_user = message.id_reciver
            
        ");
        $stmt->bind_param("i", $message_id);
        if ($stmt->execute()) {
            $message = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $message;
        } else {

            return NULL;
        }

    }
 
    /**
     * Fetching all user messages
     * @param String $user_id id of the user
     */
    public function getAllUserMessages($id_user, $id_conversation = 0, $readed = null) {
        $sqlFilter = "";
        if( $id_conversation > 0 ){
            $sqlFilter .= " AND message.id_conversation = {$id_conversation} ";
        }
        if( $readed != null ){
            $sqlFilter .= " AND message.readed = {$readed} ";
        }
        $query = "SELECT    
                message.id_message,
                message.id_conversation,
                message.text,
                message.send_date,
                message.read_date,
                message.readed,
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
            FROM message,
                 conversation,
                 user sender, 
                 user reciver  
            WHERE
                 (sender.id_user = ? OR reciver.id_user = ?)
                AND conversation.id_conversation =  message.id_conversation
                AND sender.id_user = message.id_sender
                AND ( reciver.id_user = message.id_reciver)
                {$sqlFilter}
            ORDER BY send_date DESC
            LIMIT 0, 100
        ";
        $stmt = $this->conn->prepare($query);
        //var_dump($query);
        //var_dump($id_user);
        $stmt->bind_param("ii", $id_user, $id_user);
        $stmt->execute();
        $messages = $stmt->get_result();
        $stmt->close();
        return $messages;
    }

    /**
     * Fetching all user messages
     * @param String $user_id id of the user
     */
    public function getTotalUnreadMessages($id_user) {
        $stmt = $this->conn->prepare("SELECT    
                COUNT(*) as total_messages
            FROM message,
                 conversation
            WHERE
                 (conversation.id_sender = ? OR conversation.id_reciver = ?)
                AND conversation.id_conversation =  message.id_conversation
                AND message.readed = 0
        ");
        $stmt->bind_param("ii", $id_user, $id_user);
        $stmt->execute();
        $messages = $stmt->get_result();
        $stmt->close();
        return $messages;
    }

    /**
     * Fetching all user messages
     * @param String $user_id id of the user
     */
    public function getTotalUnreadMessagesByConversation($id_user) {
        $stmt = $this->conn->prepare("SELECT    
                COUNT(*) as total_messages,
                conversation.id_conversation
            FROM message,
                 conversation
            WHERE
                 (conversation.id_sender = ? OR conversation.id_reciver = ?)
                AND conversation.id_conversation =  message.id_conversation
                AND message.readed = 0
            GROUP BY conversation.id_conversation
        ");
        $stmt->bind_param("ii", $id_user, $id_user);
        $stmt->execute();
        $messages = $stmt->get_result();
        $stmt->close();
        return $messages;
    }

   
    /**
     * Creating new message
     * @param String $user_id user id to whom message belongs to
     * @param String $message message text
     */
    public function createMessage($text, $id_sender, $id_reciver) {        
        
        $db = new ConversationModel();

        // creating new message
        $id_conversation = $db->getIdConversation($id_sender, $id_reciver);
        if ( ! ( $id_conversation > 0)  ) { // Jimmy: if the conversation does not exist create a new one.
            $id_conversation = $db->createConversation($id_sender, $id_reciver);
        }
        
        $stmt = $this->conn->prepare("INSERT INTO `message`
            (
            `text`,
            `id_conversation`,
            `send_date`,
            `id_sender`,
            `id_reciver`,
            readed)
            VALUES(?, ?, NOW(), ?, ?, 0)");
        /*
        
        var_dump($text);
        var_dump($id_conversation);
        var_dump($id_sender);
        var_dump($id_reciver);
         */
        $stmt->bind_param("siii", $text, $id_conversation, $id_sender, $id_reciver);
        $result = $stmt->execute();
        //print_r($stmt->error); die;
        $stmt->close();
 
        if ($result) {
            // message row created
            // now assign the message to user
            $id_message = $this->conn->insert_id;
            return array(
                'id_message' => $id_message,
                'id_conversation' => $id_conversation,
            );
            
        } else {
            // message failed to create
            return NULL;
        }
    }
 
    /**
     * Updating message
     * @param String $message_id id of the message
     * @param String $message message text
     * @param String $status message status
     */
    public function updateMessage($text, $id_message) {
        $stmt = $this->conn->prepare("UPDATE `message`
                SET
                    `text` = ?,
                    `send_date` = NOW(),
                    `readed` = 0
                WHERE `id_message` = ?;
        ");
        //print_r($stmt->error); die;
        $stmt->bind_param("si", $text, $id_message);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

    /**
     * setReadedMessage message
     * @param String $message_id id of the message
     * @param String $message message text
     * @param String $status message status
     */
    public function setReadedMessage($readed, $id_message) {
        $stmt = $this->conn->prepare("UPDATE 
            message
                SET
                readed = ?
                ,read_date = NOW()
                WHERE id_message = ?
        ");
        $stmt->bind_param("ii", $readed, $id_message);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

     /**
     * setReadedMessage message
     * @param String $message_id id of the message
     * @param String $message message text
     * @param String $status message status
     */
    public function setReadedMessageList($setReadedMessageList) {
        $stmt = $this->conn->prepare("UPDATE message
                SET
                    readed = 1
                    ,read_date = NOW()
                WHERE id_message IN ($setReadedMessageList)
        ");
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }
 
    /**
     * Deleting a message
     * @param String $message_id id of the message to delete
     *   le  champs  active  dans la table  message  
     */
    public function deleteMessage($id_message) {
        $stmt = $this->conn->prepare("DELETE message message set message.active = 0 
            WHERE message.id_message ?");
        $stmt->bind_param("i", $id_message);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

 
}

?>