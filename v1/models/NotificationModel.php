<?php

class NotificationModel  extends DbHandler
{
	/* ------------- notifications table method ------------------ */
 
    /**
     * Creating new notification
     * @param String $id_user user id to whom notification belongs to
     * @param String $notification notification text
     */

    public function createNotification($id_user, $titre, $activity, $activity_data, $message) {        
        $stmt = $this->conn->prepare("INSERT INTO notification
                (
                    id_user,
                    titre,
                    activity,
                    activity_data,
                    message,
                    notified,
                    created_at
                )
                VALUES
                    (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    0,
                    NOW()
                )
        ");
        $stmt->bind_param("issss", $id_user, $titre, $activity, $activity_data, $message);
        $result = $stmt->execute();
        $stmt->close();
 
        if ($result) {
            // notification row created
            // now assign the notification to user
            $new_notification_id = $this->conn->insert_id;
            return $new_notification_id;
            
        } else {
            print_r($stmt->error); die;
            // notification failed to create
            return NULL;
        }
    }
 
    /**
     * Fetching single notification
     * @param String $notification_id id of the notification
     */
    public function getNotification($notification_id) {
        $stmt = $this->conn->prepare("SELECT 
                notification.id_notification,
                notification.id_user,
                notification.titre,
                notification.activity,
                notification.activity_data,
                notification.message,
                notification.notified,
                notification.created_at,
                notification.notified_at
            FROM notification
            WHERE notification.id_notification = ?;
        ");
        $stmt->bind_param("i", $notification_id);
        if ($stmt->execute()) {
            $notification = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $notification;
        } else {
            return NULL;
        }
    }
 
    /**
     * Fetching all user notifications
     * @param String $id_user id of the user
     */
    public function getUserPendingNotifications($id_user) {
        $stmt = $this->conn->prepare("SELECT 
                notification.id_notification,
                notification.id_user,
                notification.titre,
                notification.activity,
                notification.activity_data,
                notification.message,
                notification.notified,
                notification.created_at,
                notification.notified_at
            FROM notification
            WHERE notification.id_user = ?
                AND notified = 0;
        ");
        $stmt->bind_param("i", $id_user);
        if ($stmt->execute()) {
            $notification = $stmt->get_result();
            $stmt->close();
            return $notification;
        } else {
            return NULL;
        }
    }
 
    /**
     * Deleting a notification
     * @param String $notification_id id of the notification to delete
     *   le  champs  active  dans la table  notification  
     */
    public function deleteNotification($str_id_notifications) {
        $stmt = $this->conn->prepare("UPDATE 
            notification t 
                set t.notified = 1 
            WHERE t.id_notification IN ({$str_id_notifications}) 
                ");
        //$stmt->bind_param("", $str_id_notifications);
        $stmt->execute();
        $num_affected_rows = $stmt->affected_rows;
        $stmt->close();
        return $num_affected_rows > 0;
    }

 
}

?>