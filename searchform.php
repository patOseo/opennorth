<?php
/**
 * The template for displaying search forms
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
$uid               = wp_unique_id( 's-' ); // The search form specific unique ID for the input.

$aria_label = '';
if ( isset( $args['aria_label'] ) && ! empty( $args['aria_label'] ) ) {
	$aria_label = 'aria-label="' . esc_attr( $args['aria_label'] ) . '"';
}

if(lang_en()) {
	$placeholder = 'Search...';
} elseif(lang_fr()) {
	$placeholder = 'Recherche...';
}
?>

<form role="search" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" <?php echo $aria_label; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above. ?>>
	<label class="screen-reader-text" for="<?php echo $uid; ?>"><?php echo esc_html_x( 'Search for:', 'label', 'understrap' ); ?></label>
	<div class="input-group justify-content-between">
		<div id="searchInput" class="col-9 me-xl-2"><input type="search" class="px-3 w-100 form-control border-primary bg-white rounded" id="<?php echo $uid; ?>" name="s" value="<?php the_search_query(); ?>" placeholder="<?php echo esc_attr_x( $placeholder, 'placeholder', 'understrap' ); ?>"></div>
		<div id="searchIcon" class="align-self-center position-relative"><span id="searchToggler" class="position-absolute top-0 start-0 w-100 h-100 d-none d-lg-block"></span><button class="bg-transparent border-0" type="submit" name="submit"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-search.svg" alt="Search" width="32" height="32"></button></div>
		<?php /* ?><input type="submit" class="submit search-submit btn btn-primary" name="submit" value="<?php echo esc_attr_x( 'Search', 'submit button', 'understrap' ); ?>"><?php */ ?>
	</div> 
</form>
<?php
