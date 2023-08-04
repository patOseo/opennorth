<?php

function opennorth_remove_admin_bar() {
    if (is_page_template('page-templates/dashboard.php')) {
        show_admin_bar(false);
    }
}

add_action('template_redirect', 'opennorth_remove_admin_bar');