<?php
function opennorth_change_post_labels( $labels ) {
    $new_labels = array(
        'name'               => 'Resources',
        'singular_name'      => 'Resource',
        'all_items'          => 'All Resources',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Resource',
        'edit_item'          => 'Edit Resource',
        'new_item'           => 'New Resource',
        'view_item'          => 'View Resource',
        'search_items'       => 'Search Resources',
        'not_found'          => 'No resources found',
        'not_found_in_trash' => 'No resources found in Trash',
        'parent_item_colon'  => 'Parent Resource:',
        'menu_name'          => 'Resources',
    );

    return $new_labels;
}

function opennorth_change_post_menu_icon( $args, $post_type ) {
    if ( $post_type === 'post' ) {
        $args['menu_icon'] = 'dashicons-portfolio';
    }
    return $args;
}

add_filter( 'post_type_labels_post', 'opennorth_change_post_labels' );
add_filter( 'register_post_type_args', 'opennorth_change_post_menu_icon', 10, 2 );
