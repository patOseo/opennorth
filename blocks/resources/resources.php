<?php 
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 20,
    'paged' => $paged,
    'post_status' => 'publish',
);

$query = new WP_Query($args);

?>

<?php include_once('resource-filters.php'); ?>

<div class="resources mb-6" id="filteredResources" uk-scrollspy="target: .resource-row; cls: uk-animation-fade; delay: 100;">
<?php
ob_start();
include(get_stylesheet_directory() . '/loop-templates/list-resources.php');
$loop_output = ob_get_clean();

echo $loop_output;
wp_reset_postdata();
?>
</div>