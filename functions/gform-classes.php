<?php

add_filter( 'gform_submit_button', 'opennorth_add_custom_css_classes', 10, 2 );
function opennorth_add_custom_css_classes( $button, $form ) {
    $dom = new DOMDocument();
    $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $classes = $input->getAttribute( 'class' );
    $classes .= " btn btn-primary btn-md rounded-1 ms-auto";
    $input->setAttribute( 'class', $classes );
    return $dom->saveHtml( $input );
}