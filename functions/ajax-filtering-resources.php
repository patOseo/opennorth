<?php 
function opennorth_ajax_filter_resources() {
    // Grab the filter values from $_POST
    if(isset($_POST['subject']) && !in_array('all', $_POST['subject'])) {
        $resource_cat = $_POST['subject'];
    }
    
    if(isset($_POST['rtype']) && !in_array('all', $_POST['rtype'])) {
        $resource_type = $_POST['rtype'];
    }

    // Grab the search value from $_POST
    if(isset($_POST['search'])) {
        $searchTerm = $_POST['search'];
        $sanitizeSearch = sanitize_text_field($searchTerm);
    }

    // Grab the sort value from $_POST
    if(isset($_POST['sort'])) {
        $sort = $_POST['sort'];
        $sortOrder = sanitize_text_field($sort);
    }

    // Load values into the query args
    $args = array(
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => 20,
    );

    if(isset($resource_cat) && isset($resource_type)) {
        $args['tax_query'] = array( 'relation' => 'AND' );
    }

    // If $resource_type has a value and the value is not 'all', add it to the query args
    if($resource_type && $resource_type != 'all') {
        $args['tax_query'][] = array(
                'taxonomy' => 'resource_type',
                'field'    => 'slug',
                'terms'    => $resource_type,
        );
    }

    // If $resource_cat has a value and the value is not 'all', add it to the query args
    if($resource_cat && $resource_cat != 'all') {
        $args['tax_query'][] = array(
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $resource_cat,
        );
    }

    if(isset($sanitizeSearch)) {
        $args['s'] = $sanitizeSearch;
    }

    if(isset($sortOrder)) {
        $args['order'] = $sortOrder;
        $args['orderby'] = 'date';
    }

    $query = new WP_Query($args);

    ob_start();
    include(get_stylesheet_directory() . '/loop-templates/list-resources.php');
    $loop_output = ob_get_clean();
    
    echo $loop_output;

    wp_reset_postdata();

    die();
}

add_action('wp_ajax_filter_resources', 'opennorth_ajax_filter_resources');
add_action('wp_ajax_nopriv_filter_resources', 'opennorth_ajax_filter_resources');
