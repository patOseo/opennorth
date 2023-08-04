<?php 
// ACF Fields
?>

<?php

// Create $args and retrieve course posts
$args = array(
    'post_type' => 'course',
    'posts_per_page' => 9,
    'meta_key' => 'course_id',
    'orderby' => 'meta_value',
    'order' => 'ASC',
    'paged' => get_query_var( 'paged' )
);

$query = new WP_Query($args);

include_once('course-filters.php'); ?>

<div class="courses-list mb-5" id="filteredCourses" uk-scrollspy="target: .course-single; cls: uk-animation-slide-bottom-medium">
        <?php ob_start();
        include(get_stylesheet_directory() . '/loop-templates/list-courses.php');
        $loop_output = ob_get_clean();

        echo $loop_output;
        wp_reset_postdata();
        ?>
</div>
