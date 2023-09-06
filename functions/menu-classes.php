<?php

function add_class_to_current_menu_link($atts, $item, $args) {
    if ($args->theme_location === 'primary') {
        if(ICL_LANGUAGE_CODE=='en') {
            $margin = 'mx-xl-2';
        } elseif(ICL_LANGUAGE_CODE=='fr') {
            $margin = 'mx-xl-1';
        }
        $atts['class'] = 'nav-link mb-2 mb-xl-0 ' . $margin . ' px-2 px-xl-3 py-2 py-xl-1 rounded';
        if (in_array('current-menu-item', $item->classes)) {
            $atts['class'] = 'nav-link mb-2 mb-xl-0 ' . $margin . ' px-2 px-xl-3 py-2 py-xl-1 bg-primary text-white rounded';
        }
    } else {
        $atts['class'] = 'nav-link mb-0 py-1';
    }
    return $atts;
}
add_filter('nav_menu_link_attributes', 'add_class_to_current_menu_link', 10, 3);
