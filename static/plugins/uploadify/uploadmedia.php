<?php include_once dirname(__FILE__)."/../../include/general-includes.php";
$imgfun=new imagecomponent();
$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {

if($_FILES['Filedata']['size']>0)
            {
                $fileTypes = array('jpg','jpeg','gif','png'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
	
                $fimage=$imgfun->upload_image_and_thumbnail('Filedata',480,320,'../../userfiles','contents',true);
                $featureimage = $fimage["imagename"];
                $q = new Query();
                $q->insert_into("media",array('name'=>$featureimage))
                ->run();
                ?>
                <figure style="float: left;">
    <a href="javascript:;" data-name="<?=SITE_URL."/userfiles/contents/origional/".$featureimage?>" data-file="<?=$featureimage;?>" class="media-img">
        <img src="<?=SITE_URL."/userfiles/contents/icon/".$featureimage?>" class="thumbnail" />
    </a>
    </figure>
                <?
            }
            }
}
?>