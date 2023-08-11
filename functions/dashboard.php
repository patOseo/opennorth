<?php

// Remove admin bar on the custom Dashboard page
function opennorth_remove_admin_bar() {
    if (is_page_template('page-templates/dashboard.php')) {
        show_admin_bar(false);
    }
}

add_action('template_redirect', 'opennorth_remove_admin_bar');


// Disable the language filter for the dashboard pages
function opennorth_bypass_lang_filtering_for_dashboard( $languages ) {
    if ( is_page_template('page-templates/dashboard.php') ) {
        return array(); // Return an empty array to disable language filtering
    }
    return $languages;
}
add_filter( 'wpml_active_languages', 'opennorth_bypass_lang_filtering_for_dashboard' );