<?php

function add_class_to_current_menu_link($atts, $item, $args) {
    $atts['class'] = 'nav-link mx-xl-2 ps-2 ps-xl-3 py-1 rounded';
    if (in_array('current-menu-item', $item->classes)) {
        $atts['class'] = 'nav-link mx-xl-2 ps-2 ps-xl-3 py-1 bg-primary text-white rounded';
    }
    return $atts;
}
add_filter('nav_menu_link_attributes', 'add_class_to_current_menu_link', 10, 3);
