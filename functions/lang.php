<?php

function lang_en() {
	if(ICL_LANGUAGE_CODE=='en') {
		return true;
	} else {
		return false;
	}
}

function lang_fr() {
	if(ICL_LANGUAGE_CODE=='fr') {
		return true;
	} else {
		return false;
	}
}

function transl_avail($language) {
	// Check if WPML plugin is active
    if (function_exists('icl_object_id')) {

        // Get the language code of the specified language
        $language_code = $language;

        // Get the ID of the current page or post
        $current_post_id = get_the_ID();

        // Check if a translation exists for the current page in the specified language
        $translated_post_id = icl_object_id($current_post_id, 'post', true, $language_code);

        if ($translated_post_id !== $current_post_id) {
            // Translation exists for the current page in the specified language
            // You can perform actions specific to the translated version here
            return true;
        } else {
            // Translation doesn't exist for the current page in the specified language
            return false;
        }

    } else {
        // WPML is not active
        echo 'WPML plugin is not installed or active.';
    }
}

// Remove accents from a string using strtr
function removeAccents($str) {
    $normalizedString = Normalizer::normalize($str, Normalizer::FORM_KD);
    $nonAccentedString = preg_replace('/\p{Mn}/u', '', $normalizedString);
    return iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $nonAccentedString);
}

function custom_post_language_attributes($output) {
	if (get_field('language') == 'fr') {
		$output .= ' data-custom-attribute="english"';
	}
    return $output;
}
add_filter('language_attributes', 'custom_post_language_attributes');