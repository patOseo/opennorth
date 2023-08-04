<?php

function add_class_to_current_menu_link($atts, $item, $args) {
    if (in_array('current-menu-item', $item->classes)) {
        $atts['class'] = 'nav-link bg-primary text-white rounded';
    }
    return $atts;
}
add_filter('nav_menu_link_attributes', 'add_class_to_current_menu_link', 10, 3);
