<?php

// Add custom body class to single posts
function opennorth_custom_body_class( $classes ) {
	if ( is_single( ) ) {
        $classes[] = 'bg-white';
    }
	return $classes;
}
add_filter( 'body_class', 'opennorth_custom_body_class' );

// Add custom body class to pages with acf field 'blue_background' set to true
function opennorth_custom_body_class_blue( $classes ) {
    if ( get_field( 'blue_background' ) ) {
        $classes[] = 'bg-deepblue text-white fw-normal';
    }
    return $classes;
}
add_filter( 'body_class', 'opennorth_custom_body_class_blue' );