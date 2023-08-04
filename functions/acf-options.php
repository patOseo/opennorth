<?php 

if( function_exists('acf_add_options_page') ) {
    
    acf_add_options_page(array(
        'page_title'    => 'Team & Board',
        'icon_url' => 'dashicons-businessperson',
        'position' => 35
    ));

    acf_add_options_page(array(
        'page_title'    => 'Networks',
        'icon_url' => 'dashicons-networking',
        'position' => 40
    ));

    acf_add_options_page(array(
        'page_title'    => 'Theme Options',
        'icon_url' => 'dashicons-admin-generic',
        'position' => 59
    ));

    acf_add_options_page(array(
        'page_title'    => 'Help',
        'icon_url' => 'dashicons-editor-help',
        'position' => 60
    ));
   
}


// This adds our theme colors from theme.json to the ACF Color Picker
function opennorth_acf_input_colors() { ?>
    <script type="text/javascript">
    (function($) {
      acf.add_filter('color_picker_args', function( $args, $field ){
        
        // this will create a settings variable with all settings
        const $settings = wp.data.select( "core/editor" ).getEditorSettings();
        // pull out the colors from that variable
        let $colors = $settings.colors.map(x => x.color);
        
        // assign those colors to palettes
        $args.palettes = $colors;
        return $args;
      });
    })(jQuery);
    </script>
<?php }
add_action('acf/input/admin_footer', 'opennorth_acf_input_colors');