<?php
add_filter( 'body_class', 'opennorth_custom_body_class' );
function opennorth_custom_body_class( $classes ) {
	if ( is_single( ) ) {
        $classes[] = 'bg-white';
    }
	return $classes;
}