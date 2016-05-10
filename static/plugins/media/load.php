<?php include_once dirname(__FILE__)."/../../include/general-includes.php";?>
<?php $q = new Query();
$q->select()
->from("media")
->run();
$data = $q->get_selected();
foreach($data as $val)
{
    ?>
    <figure style="float: left;">
    <a href="javascript:;" data-name="<?=SITE_URL."/userfiles/contents/origional/".$val["name"]?>" data-file="<?=$val["name"];?>" class="media-img">
        <img src="<?=SITE_URL."/userfiles/contents/icon/".$val["name"]?>" class="thumbnail" />
    </a>
    </figure>
    <?
} 
 ?>
 