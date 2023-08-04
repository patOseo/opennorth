<?php

/**
 * Registers custom ACF blocks.
 */
add_action( 'init', 'register_acf_blocks' );
function register_acf_blocks() {
	register_block_type( __DIR__ . '/../blocks/courses' );
    register_block_type( __DIR__ . '/../blocks/values' );
    register_block_type( __DIR__ . '/../blocks/team' );
    register_block_type( __DIR__ . '/../blocks/resources' );
    register_block_type( __DIR__ . '/../blocks/networks' );
    register_block_type( __DIR__ . '/../blocks/expertise-tabs' );
    register_block_type( __DIR__ . '/../blocks/expertise-panel' );
    register_block_type( __DIR__ . '/../blocks/icon' );
}
