<?php 
function opennorth_ajax_filter_courses() {
    if(isset($_POST['page'])) {
        $page = $_POST['page'];
    }

    // Grab the filter values from $_POST
    if(isset($_POST['area']) && !in_array('all', $_POST['area'])) {
        $course_area = $_POST['area'];
    }

    // Grab the search value from $_POST
    if(isset($_POST['search'])) {
        $searchTerm = $_POST['search'];
        $sanitizeSearch = sanitize_text_field($searchTerm);
    }

    if(isset($_POST['page'])) {
        $paged = $_POST['page'];
    } else {
        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
    }

    // Load values into the query args
    $args = array(
        'post_type' => 'course',
        'post_status' => 'publish',
        'posts_per_page' => 9,
        'meta_key' => 'course_id',
        'orderby' => 'meta_value',
        'order' => 'ASC',
        'paged' => $paged
    );

    if(isset($course_area)) {
        $args['tax_query'] = array();
    }

    // If $course_area has a value and the value is not 'all', add it to the query args
    if($course_area && $course_area != 'all') {
        $args['tax_query'][] = array(
                'taxonomy' => 'area',
                'field'    => 'slug',
                'terms'    => $course_area,
                'paged'          => $paged
        );
    }

    if(isset($sanitizeSearch)) {
        $args['s'] = $sanitizeSearch;
    }

    $query = new WP_Query($args);

    ob_start();
    include(get_stylesheet_directory() . '/loop-templates/list-courses.php');
    $loop_output = ob_get_clean();
    
    echo $loop_output;

    wp_reset_postdata();

    die(); 
}

add_action('wp_ajax_filter_courses', 'opennorth_ajax_filter_courses');
add_action('wp_ajax_nopriv_filter_courses', 'opennorth_ajax_filter_courses');
